package main

import (
	"log"
	"net/http"

	"http-ssh.rfc/receiver"
)

func main() {
	http.HandleFunc("/data", receiver.TerminalWS)
	log.Println("server => port 8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
