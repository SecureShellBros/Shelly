package main

import (
	"log"
	"net/http"

	"http-ssh.rfc/receiver"
)

func main() {
	// WebSocket handler for terminal connection
	http.HandleFunc("/data", receiver.TerminalWS)

	log.Println("server => port 8080")

	// Start HTTP server
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("server error: %v", err)
	}

	// You mentioned outputPipe is global in receiver.go
	// So you can access it here or from other packages that import receiver
	// If sender.go imports receiver and uses receiver.OutputPipe — it's fine
}
