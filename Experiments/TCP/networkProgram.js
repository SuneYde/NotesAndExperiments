const net = require("net");

const server = net.createServer((socket) => {
  console.log("Client connected");
  socket.on("data", (data) => {
    console.log("Data received: " + data);

    socket.write("Data received: " + data);
  });
  socket.on("end", () => {
    console.log("Client disconnected");
  });

  server.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});
