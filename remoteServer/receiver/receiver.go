package receiver

import (
	"context"
	"log"
	"net/http"
	"os"
	"runtime"

	"github.com/aymanbagabas/go-pty"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

func TerminalWS(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("WebSocket upgrade error:", err)
		return
	}
	defer conn.Close()

	// this is the auth part.
	// basically we're on the assumption that the first msg will be from login.
	_, data, err := conn.ReadMessage()
	if err != nil {
		log.Println("password reading error:  ", err)
		return
	}

	password := string(data)
	if password != "donttaptheglass" {
		log.Println("incorrect password")
		conn.WriteMessage(websocket.TextMessage, []byte("incorrect password"))
		return
	}

	log.Println("right password")
	conn.WriteMessage(websocket.TextMessage, []byte("right password"))

	var shell string
	if runtime.GOOS == "windows" {
		shell = "cmd.exe"
	} else {
		shell = "bash"
	}
	pt, err := pty.New()
	if err != nil {
		log.Println("PTY creation failed:", err)
		return
	}
	defer pt.Close()
	cmd := pt.CommandContext(context.Background(), shell)
	cmd.Env = os.Environ()
	if err := cmd.Start(); err != nil {
		log.Println("PTY command start failed:", err)
		return
	}
	go func() {
		buf := make([]byte, 1024)
		for {
			n, err := pt.Read(buf)
			if err != nil {
				log.Println("PTY read error:", err)
				break
			}
			log.Printf("Sending to WebSocket: %q", string(buf[:n]))
			if err := conn.WriteMessage(websocket.TextMessage, buf[:n]); err != nil {
				log.Println("WebSocket write error:", err)
				break
			}
		}
	}()
	for {
		_, data, err := conn.ReadMessage()
		if err != nil {
			log.Println("WebSocket read error:", err)
			break
		}
		log.Printf("Received from WebSocket: %q", string(data))
		if _, err := pt.Write(data); err != nil {
			log.Println("PTY write error:", err)
			break
		}
	}
	_ = cmd.Process.Kill()
}
