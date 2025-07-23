### Key Components:
- Server Application (Go or Python or any language):
    - Runs on the target remote machine.
    - Listens for incoming HTTP requests containing commands.
    - Executes received commands using the operating system's shell.
    - Captures the command's standard output (stdout), standard error (stderr), and return code.
    - Packages the output and sends it back to the client via HTTP responses.
- Client User Interface (Web Page):
    - A web-based interface accessible via a browser.
    - Allows users to input shell commands.
    - Sends these commands to the server using HTTP requests
    - Receives and displays the command output (stdout, stderr, return code) from the server.
- Technological Approach:
    - Protocol: HTTP for all client-server communication.
    - Server-Side: Command execution and HTTP handling.
    - Client-Side: Standard web technologies (HTML, CSS, JavaScript) for the user interface.

This system provides a flexible and web-friendly alternative for remote command execution, leveraging the widespread accessibility and capabilities of HTTP.

## Daily Reports
--------------
### Week 1 status:
### Week 2 status:
### Week 3 status:

