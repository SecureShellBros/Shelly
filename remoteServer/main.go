package main

import (
	"http-ssh.rfc/receiver"
	"http-ssh.rfc/sender"
)

func main() {
	receiver.Receive()
	sender.Send()
}
