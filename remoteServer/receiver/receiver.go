package receiver

import (
	"fmt"
	//"io/ioutil"
	//"log"
	"net/http"
	//"os/exec"
)

func Receive(w http.ResponseWriter, r *http.Request) {
	msg := r.URL.Query().Get("msg")
	fmt.Fprintf(w, "Received msg: %s\n", msg)
	fmt.Printf("msg received: %s\n", msg)

	// for reference , the msg is in 'w' bois
}
