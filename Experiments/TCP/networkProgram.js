const net = require("net"); //* The Node.js's built in module for networking. This gives us the TCP/IP tools we need.

//* net.createServer creates our TCP server. It takes a callback function that will be called every time a client connects to the server.
//* socket.write sends data to the client. In this case, we're sending a welcome message.
//* server.listen tells the server to start listening on port 3000. When a client connects to the server, the callback function passed to net.createServer will be called.

/**
 * Creates a TCP server instance that handles client connections.
 * @param {net.Socket} socket - The socket object representing the client connection.
 * @emits Server#connection When a new client connects to the server
 * @emits Socket#data When data is received from the client
 * @emits Socket#end When the client disconnects
 * @emits Socket#error When an error occurs with the socket connection
 * @listens Socket#data Listens for incoming messages from the client
 * @listens Socket#end Listens for client disconnection
 * @listens Socket#error Listens for socket errors
 * @sends {string} "Welcome to the server!\n" Initial welcome message sent to client
 * @sends {string} Server response echoing received message
 */
const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.write("Welcome to the server!\n");

  //* The socket object is an instance of net.Socket. It represents the connection between the server and the client.
  socket.on("data", (data) => {
    const message = data.toString();
    console.log("Received message:", message);
    socket.write(`Server received: ${message}`);
  });

  //* The "end" event is emitted when the client disconnects from the server.

  socket.on("end", () => {
    console.log("Client disconnected");
  });

  //* The "error" event is emitted when an error occurs. In this case, we're just logging the error to the console.

  socket.on("error", (err) => {
    console.error(err);
  });
});

//* There are several other events that can be emitted by the socket object, such as "close", "timeout", and "drain". You can find more information about these events in the Node.js documentation.

const client = new net.Socket();
client.connect(3000, "localhost", () => {
  console.log("Connected to server");
  client.write("Hello from client!");
});

client.on("data", (data) => {
  console.log("Received message:", data.toString());
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
