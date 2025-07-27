package receiver

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"

	"github.com/aymanbagabas/go-pty"
)

func enableCORS(w http.ResponseWriter) {
	// Allow requests from Vite (default port 5173)
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func Receive(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)

	msg := r.URL.Query().Get("cmd")
	fmt.Fprintf(w, "Received cmd: %s\n", msg)
	msg = strings.TrimSpace(msg)

	pty, err := pty.New()

	if err != nil {
		log.Fatalf("Failed to open PTY: %s", err)
	}
	defer pty.Close()
	CommandArgs := strings.Split(msg, " ")
	c := pty.Command(CommandArgs[0])
	if len(CommandArgs) > 1 {
		c = pty.Command(CommandArgs[0], CommandArgs[1])
	}
	if err := c.Start(); err != nil {
		log.Fatalf("Failed to start: %s", err)
	}
	go io.Copy(w, pty)
	if err := c.Wait(); err != nil {
		panic(err)
	}

	//	if err != nil {
	//		log.Printf("command failed because of error: %v", err)
	//		http.Error(w, "Command failed because of error: "+err.Error(), http.StatusInternalServerError)
	//		return
	//	}
	//	_ = output
	//
	// i want to call send( ) here to splice and send
}
