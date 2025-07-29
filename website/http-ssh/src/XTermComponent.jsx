import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

const XTermComponent = () => {
    const terminalRef = useRef(null);
    const termRef = useRef(null);
    async function sendCommand(command) {
        let out;
        let error;
        try {
            const response = await fetch(`/data?cmd=${command}`, {
                mode: 'cors'
            });
            out = await response.text();
        } catch (err) {
            error = err.toString();
        }

        return error ? `❌ Error: ${error}` : out;
    }


    useEffect(() => {
        if (terminalRef.current && !termRef.current) {
            const term = new Terminal({
                cursorBlink: true,
                fontSize: 14,
                fontFamily: 'monospace',
                theme: {
                    background: '#2e3440',
                    foreground: '#e5e9f0',
                    cursor: '#81a1c1',
                },
            });

            termRef.current = term;
            term.open(terminalRef.current);
            term.write('$sshbros$ ');

            let command = '';
            term.onData(e => {
                if (e === '\r') {
                    term.write('\r\n');
                    if (command) {
                        console.log("Sending command : ", command);
                        sendCommand(command).then((value) => { term.write(value); console.log(value) });
                    }
                    term.write('$sshbros$ ');
                    command = '';
                } else if (e === '\x7F') {
                    if (command.length > 0) {
                        term.write('\b \b');
                        command = command.slice(0, -1);
                    }
                } else {
                    command += e;
                    term.write(e);
                }
            });

            window.addEventListener("resize", function(event) {
                console.log(this.window.height)
                console.log(this.window.height)
            })



            return () => {
                term.dispose();
                termRef.current = null;
            };
        }
    }, []);

    return <div ref={terminalRef} style={{ width: '100%', height: '100%', position: 'none', top: '0px', left: '0px', bottom: '0px', right: '0px' }} />;
};

export default XTermComponent;
