package main

import (
	"io"
	"log"
	"net"
	"net/http"
	"strings"

	"http-ssh.rfc/receiver"
	// "os"
)

func getIPs() (publicIP, localIP string) {
	resp, err := http.Get("https://api.ipify.org")
	if err != nil {
		log.Println("Could not get public IP from ipify:", err)
		resp, err = http.Get("https://ifconfig.me/ip")
		if err != nil {
			log.Fatalf("Fatal: Could not get public IP from any service: %v", err)
		}
	}
	defer resp.Body.Close()

	ipBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Fatal: Could not read response body: %v", err)
	}
	publicIP = strings.TrimSpace(string(ipBytes))

	conn, err := net.Dial("udp", "8.8.8.8:80")
	if err != nil {
		log.Println("Could not determine local IP:", err)
		localIP = ""
	} else {
		defer conn.Close()
		localAddr := conn.LocalAddr().(*net.UDPAddr)
		localIP = localAddr.IP.String()
	}

	return publicIP, localIP
}

func main() {
	http.HandleFunc("/data", receiver.TerminalWS)
	publicIP, localIP := getIPs()
	port := "8080"
	log.Printf("Public IP: %s:%s\n", publicIP, port)
	log.Printf("Local IP: %s:%s", localIP, port)

	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("Server error: %v", err)
	}
}
