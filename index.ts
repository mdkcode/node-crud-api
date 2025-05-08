import { v4 as uuidv4 } from "uuid";
import http from "http";

const users = [
  {
    id: uuidv4(),
    username: "Jane Doe",
    age: 18,
    hobbies: ["drawing", "eating"],
  },
];

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, Node.js Server!");
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
