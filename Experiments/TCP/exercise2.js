const net = require("net");
const clients = new Map();

const colors = [
  "\x1b[31m", // red
  "\x1b[32m", // green
  "\x1b[33m", // yellow
  "\x1b[34m", // blue
  "\x1b[35m", // magenta
  "\x1b[36m", // cyan
  "\x1b[37m", // white
];

const client = new net.Socket();
client.connect(3000, "localhost", () => {
  console.log("Connected to server");
});

client.on("data", (data) => {
  console.log(data.toString());
});

process.stdin.on("data", (data) => {
  client.write(data);
});

const server = net.createServer((socket) => {
  console.log(
    "New client connected from",
    socket.remoteAddress,
    ":",
    socket.remotePort
  );
  let username = "";
  const userColor = colors[Math.floor(Math.random() * colors.length)];

  socket.write("Enter your username: ");
  console.log("Prompted client for username");

  socket.on("data", (data) => {
    console.log("Data received from client");
    const message = data.toString().trim();
    console.log(`Received data: ${message}`);

    if (!username) {
      username = message;
      clients.set(socket, { username, color: userColor });
      broadcast(`${userColor}${username} has joined the chat\x1b[0m\n`);
      socket.write(`Welcome ${username}! You are now connected.\n`);
      return;
    }

    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${username}: ${message}`);
    broadcast(`${userColor}${username}\x1b[0m: ${message}\n`, socket);
  });

  socket.on("end", () => {
    console.log(
      "Client disconnected from",
      socket.remoteAddress,
      ":",
      socket.remotePort
    );
    if (username) {
      broadcast(`${userColor}${username} has left the chat\x1b[0m\n`);
      clients.delete(socket);
    }
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
    clients.delete(socket);
  });
});

function broadcast(message, sender) {
  for (const [client, _] of clients) {
    if (client !== sender) {
      client.write(message);
    }
  }
}

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

/*
Title: Simple TCP Chat Server with Colored Usernames
Description: A basic TCP-based chat server and client implementation that supports
multiple concurrent users with colored usernames and broadcast messaging.

ARCHITECTURE OVERVIEW:
--------------------
The application consists of two main components:
1. TCP Server: Handles multiple client connections and message broadcasting
2. TCP Client: Connects to server and handles user input/output

KEY COMPONENTS:
-------------
1. Connection Management:
  - Uses Map() to track active clients and their properties
  - Stores username and assigned color for each connection
  - Handles graceful disconnection and cleanup

2. Color System:
  - Implements ANSI color codes for visual distinction
  - Automatically assigns random colors to new users
  - Resets color after each message (\x1b[0m)

3. Message Broadcasting:
  - Broadcasts messages to all connected clients except sender
  - Formats messages with usernames, colors, and timestamps
  - Handles join/leave notifications

EVENT HANDLERS:
-------------
Server Side:
- 'data': Processes incoming messages and username setup
- 'end': Handles client disconnection
- 'error': Manages socket errors and cleanup

Client Side:
- 'data': Displays received messages
- stdin.on('data'): Captures and sends user input

USAGE:
-----
1. Start the server:
  - Run server code in terminal
  - Server listens on port 3000

2. Connect clients:
  - Run client code in separate terminals
  - Enter username when prompted
  - Start chatting!

DATA FLOW:
---------
1. New Connection:
  Client connects → Server prompts for username → Username stored

2. Message Flow:
  User types message → Client sends to server → 
  Server broadcasts → Other clients receive and display

3. Disconnection:
  Client closes → Server removes from clients Map → 
  Broadcast departure message

ERROR HANDLING:
-------------
- Socket errors: Removes client from active connections
- Server errors: Logs error details
- Client disconnection: Cleans up resources

LIMITATIONS:
----------
- No message persistence
- No private messaging
- No authentication
- Single chat room only
- No message encryption
- No reconnection handling

POTENTIAL IMPROVEMENTS:
--------------------
1. Add message history
2. Implement private messaging
3. Add multiple chat rooms
4. Add user authentication
5. Add message encryption
6. Add reconnection logic
7. Add message persistence (database)
8. Add user status (online/away/busy)

This implementation serves as a foundation for understanding:
- TCP client-server architecture
- Real-time message broadcasting
- Connection state management
- Basic networking concepts
*/
