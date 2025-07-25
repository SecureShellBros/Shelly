package main

import (
	//"fmt"
	//"io/ioutil"
	"log"
	"net/http"
	//"os/exec"

	"http-ssh.rfc/receiver"
	"http-ssh.rfc/sender"
)




func main() {
	http.HandleFunc("/data", receiver.Receive)
	log.Println("server => port 6969")
	err := http.ListenAndServe(":6969", nil)
	if err != nil {
		log.Fatalf("server error: %v", err)
	}

	// i defined a global variable in receiver.go and should be usable here too.
	// outputPipe gets output. this output pipe can be used in sender.go cause i imported receiver module there.

	// sender.Send()
}
