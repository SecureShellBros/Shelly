package main

import (
	//"fmt"
	//"io/ioutil"
	"log"
	"net/http"
	"os/exec"

	"http-ssh.rfc/receiver"
	"http-ssh.rfc/sender"
)

func main() {
	// getting a message from https here we gooo
	http.HandleFunc("/data", receiver.Receive)
	log.Println("server => port 6969")
	err := http.ListenAndServe(":6969", nil)
	if err != nil {
		log.Fatalf("server error: %v", err)
	}

	sender.Send()
}
