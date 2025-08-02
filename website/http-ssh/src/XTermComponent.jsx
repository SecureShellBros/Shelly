import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

var shellHead = 'sshbros';

const XTermComponent = () => {
    const terminalRef = useRef(null);
    const termRef = useRef(null);
    const ws = useRef(null);
    const fitAddonRef = useRef(null);
    let commandRunning = false;
    const outPattern = /\]+\$/;

    useEffect(() => {
        if (!ws.current) {
            ws.current = new WebSocket("ws://localhost:8080/data");

        }
        ws.current.onopen = () => {
            console.log("Connected to Server");
            if (ws.current.readyState == WebSocket.OPEN)
                ws.current.send("donttaptheglass");
        }

        if (terminalRef.current && !termRef.current) {
            const term = new Terminal({
                cursorBlink: true,
                fontSize: 20,
                fontFamily: 'monospace',
                theme: {
                    background: '#2e3440',
                    foreground: '#e5e9f0',
                    cursor: '#81a1c1',
                    shell: '#a2bd8b'
                },
            });

            const fitAddon = new FitAddon();
            term.loadAddon(fitAddon);
            fitAddonRef.current = fitAddon;

            termRef.current = term;
            term.open(terminalRef.current);
            fitAddon.fit();
            term.write(`\x1b[38;2;163;189;140m$${shellHead}$ \x1b[0m`);

            term.onKey((e) => {
                const { key, domEvent } = e;

                if (domEvent.ctrlKey) {

                }
            })
            let command = '';
            term.onData(e => {
                if (e === '\r') {
                    term.write('\r\n');
                    if (command) {
                        console.log("Sending command : ", command);
                        if (ws.current.readyState === WebSocket.OPEN) {
                            ws.current.send(command + '\r');
                        }
                        else
                            console.error("Couldnt send commands websockets isnt in ready state");
                    }
                    command = '';
                    commandRunning = true;
                } else if (e === '\x7F') {
                    if (command.length > 0) {
                        term.write('\b \b');
                        command = command.slice(0, -1);
                    }
                } else if (commandRunning) {
                    if (ws.current.readyState === WebSocket.OPEN) {
                        ws.current.send(e);
                    }
                    else console.error("Couldnt set keystrokes websocket isnt in ready state")
                }
                else {
                    command += e;
                    term.write(e);
                }
            });

            ws.current.onmessage = (event) => {
                console.log("Recieved Data : ", event.data)
                term.write(event.data);
                if (outPattern.test(event.data)) {
                    commandRunning = false;
                }
            }

            window.addEventListener("resize", function(event) {
                console.log(this.window.height)
                console.log(this.window.height)
            })


            // Fixed: Proper resize handler that actually resizes the terminal
            const handleResize = () => {
                if (fitAddonRef.current && termRef.current) {
                    // Small timeout to ensure container has resized
                    setTimeout(() => {
                        fitAddonRef.current.fit();
                    }, 10);
                }
            };

            window.addEventListener("resize", handleResize);

            ws.current.onclose = () => {
                console.error("Websocket connection has been closed")
            }



            return () => {
                window.removeEventListener("resize", handleResize);
                term.dispose();
                termRef.current = null;
                fitAddonRef.current = null;
            };
        }
    }, []);

    if (ws.current)
        ws.current.close();
    return (
        <div
            ref={terminalRef}
            style={{
                width: '95%',
                height: '100%',
                margin: '0 auto'
            }}
        />
    );
};

export default XTermComponent;
