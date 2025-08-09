package main

import (
	"log"
	"net"
	"net/http"

	"http-ssh.rfc/receiver"
)

func getOutBoundIP() net.IP {
	conn, err := net.Dial("udp", "8.8.8.8:80")
	if err != nil {
		log.Fatalf("Could'nt find outbound ip")
	}
	defer conn.Close()
	localAddr := conn.LocalAddr().(*net.UDPAddr)
	return localAddr.IP
}

func main() {
	http.HandleFunc("/data", receiver.TerminalWS)
	log.Printf("Outbound IP:%s:%s", getOutBoundIP().String(), "8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
