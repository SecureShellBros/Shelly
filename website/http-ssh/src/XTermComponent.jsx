import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

var shellHead = 'sshbros';

const XTermComponent = () => {
    const terminalRef = useRef(null);
    const termRef = useRef(null);
    const fitAddonRef = useRef(null);

    useEffect(() => {
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
                
                if(domEvent.ctrlKey){
                    
                }
            })
            let command = '';
            term.onData(e => {
                if (e === '\r') {
                    term.write('\r\n');
                    if (command) {
                        term.write(`The almighty terminal indeed agrees that ${command} \r\n`);
                    }

                    fetch(`http://localhost:6969/data?msg=${encodeURIComponent(command)}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ command: command })
                    }).catch(error => {
                        console.error('Request failed:', error);
                    });
    
                    term.write(`\x1b[38;2;163;189;140m$${shellHead}$ \x1b[0m`);
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

            return () => {
                window.removeEventListener("resize", handleResize);
                term.dispose();
                termRef.current = null;
                fitAddonRef.current = null;
            };
        }
    }, []);

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