const net = require("net");

const buffer1 = Buffer.alloc(10);
const buffer2 = Buffer.from("Hello, world!");
const buffer3 = Buffer.from([1, 2, 3, 4, 5]);

/*
//* What is a buffer?
A buffer is a temporary storage area in memory that stores raw binary data. It is used to store data while it is being transferred from one place to another. 
Buffers are used in many areas of Node.js, such as reading/writing files, network communication, and cryptography.

//* What is bytes?
A byte is a unit of digital information that consists of 8 bits. 
A byte is like a larger number that can store values from 0 to 255. This is because with 8 bits, you can represent 2^8 = 256 different values (0-255).
It is the basic unit of storage in computer systems and is used to represent characters, numbers, and other data.

//* What does a byte represent?
A byte represents a single character or number in binary format.
For example, the byte 01000001 represents the character 'A' in ASCII encoding.

//* What is ASCII encoding?
ASCII (American Standard Code for Information Interchange) is a character encoding standard that uses 7 bits to represent characters.

//* Types of Bits:
1. Bit: A binary digit that can have a value of 0 or 1.

Status bits (also called flag bits) are special bits that tell us about the state or condition of something. 
Think of them like little warning lights on a car's dashboard. Here are the most important ones you'll find in processors:

Zero Flag (Z): This turns on (becomes 1) when an operation results in zero. For example, if you subtract 5 from 5, you get 0, and the Zero Flag would be set.

Sign Flag (S): This shows if a number is negative (1) or positive (0). It's like a plus/minus indicator.

Carry Flag (C): This is like when you're doing math on paper and have to "carry the one". It turns on when an operation results in a number too big to fit in the space we have.

Overflow Flag (V): This warns us when our arithmetic operation gave us a result that's too big or too small for our computer to handle correctly.

Parity Flag (P): This is a bit that tells us if the number of 1s in the result is even (0) or odd (1). It's used for error checking.

Stop Bits (S): These are used in serial communication to signal the end of a byte. They're like periods at the end of a sentence.

Modified Bit (M): This is used in some processors to indicate that the result of an operation is negative.

*/

// Let's say we have an 8-bit number system
let number = 200;
let result = number + 100; // This would be 300

// If our system can only hold numbers up to 255:
// - Carry Flag would be set to 1 (because we went over our limit)
// - Overflow Flag would be 1 (because our result isn't correct anymore)
// - Zero Flag would be 0 (because our result isn't zero)
// - Sign Flag depends on how the overflow is handled

//* What are bits and bytes used for?
/* 
Bits and bytes are used to represent data in computers.
- Bits are used to represent the smallest unit of data (0 or 1).
- Bytes are used to represent a group of 8 bits and are used to store characters, numbers, and other data.
- Bits and bytes are used in various computer operations such as arithmetic, logic operations, data storage, and communication.

//* How are bits and bytes used in computer memory?
Bits and bytes are used in computer memory to store and represent data.
- Bits are used to represent the smallest unit of data in memory (0 or 1).
- Bytes are used to represent a group of 8 bits and are used to store data such as characters, numbers, and other information.
- Computer memory is organized into bytes, with each byte having a unique address that can be used to access and store data.

//* How are bits and bytes used in computer communication?
Bits and bytes are used in computer communication to transmit and receive data.
- In digital communication, data is transmitted in the form of bits (0 or 1).
- Bytes are used to group bits together to represent characters, numbers, and other information.

//* How are bits and bytes used in computer processing?
Bits and bytes are used in computer processing to perform arithmetic, logic operations, and data manipulation.
- Arithmetic operations such as addition, subtraction, multiplication, and division are performed on binary numbers represented by bits and bytes.
- Logic operations such as AND, OR, NOT, and XOR are performed on binary data represented by bits and bytes.
- Data manipulation operations such as shifting, rotating, and masking are performed on binary data represented by bits and bytes.

*/

//* raw buffer data (binary representation) is displayed in hexadecimal format by default in Node.js console output (e.g., <Buffer 48 65 6c 6c 6f 2c 20 77 6f 72 6c 64 21>)
console.log(buffer2);

//* convert buffer data to a string using the toString() method
console.log(buffer2.toString());

//* logs the length of the buffer in bytes
console.log(buffer2.length);

//* Logs the array of numbers (decimal values for each byte/character) that make up the buffer data (e.g., [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33])
console.log([...buffer2]);

//* Socket object is your direct line to each client connected to the server
const server = net.createServer((socket) => {
  //* The server logs that a client has connected
  console.log("Client connected");

  //* The server listens for data events from the client
  socket.on("data", (data) => {
    const dataString = data.toString().trim();
    console.log(`Got: ${dataString}`);
  });
  socket.on("error", (err) => {
    console.error("⚠️ Error:", err.message);
  });
});

//* The server is listening on port 3000
server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
