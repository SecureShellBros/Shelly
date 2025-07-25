package receiver

import (
	"fmt"
	//"io/ioutil"
	//"log"
	"net/http"
	//"os/exec"
)
func enableCORS(w http.ResponseWriter) {
	// Allow requests from Vite (default port 5173)
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}
func Receive(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	msg := r.URL.Query().Get("msg")
	fmt.Fprintf(w, "Received msg: %s\n", msg)
	fmt.Printf("msg received: %s\n", msg)

	// for reference , the msg is in 'w' bois
}
