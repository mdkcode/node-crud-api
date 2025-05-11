import http from "http";
import { parse } from "url";
import { User } from "./data.js";
import { handleErrorMessage, onError } from "./errorHandling.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

let users: User[] = [
  {
    id: uuidv4(),
    username: "Jane Doe",
    age: 18,
    hobbies: ["drawing", "eating"],
  },
];

dotenv.config();
const server = http.createServer((req, res) => {
  const { method, url } = req;
  const parsedUrl = parse(url, true);
  const pathname = parsedUrl.pathname;
  const parts = pathname.split("/");
  const userId = parts[3];
  if (onError(users, userId, res)) {
    return;
  }
  if (method === "GET") {
    if (url === "/api/users") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    } else if (parts[1] === "api" && parts[2] === "users" && userId) {
      const certainUser = users.find(({ id }) => id === userId);
      if (certainUser) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(certainUser));
      }
    }
  } else if (method === "POST" && pathname === "/api/users") {
    {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const newUser = { ...JSON.parse(body), id: uuidv4() };
          if (!newUser.username || !newUser.age || !newUser.hobbies) {
            handleErrorMessage(
              400,
              res,
              "Must include username, age and hobbies"
            );
            return;
          }
          if (typeof newUser.age !== "number" || isNaN(newUser.age)) {
            handleErrorMessage(400, res, "Age must be a number");

            return;
          }
          if (!Array.isArray(newUser.hobbies)) {
            handleErrorMessage(400, res, "Hobbies must be an array");
            return;
          }
          if (!newUser.username || typeof newUser.username !== "string") {
            handleErrorMessage(400, res, "Username must be a string");
            return;
          }
          users.push(newUser);
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(newUser));
        } catch (error) {
          handleErrorMessage(500, res, error.message);
        }
      });
    }
  } else if (
    method === "PUT" &&
    parts[1] === "api" &&
    parts[2] === "users" &&
    userId
  ) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const updatedUser = JSON.parse(body);
        const userIndex = users.findIndex((user) => user.id === userId);
        if (!updatedUser.username || !updatedUser.age || !updatedUser.hobbies) {
          handleErrorMessage(
            400,
            res,
            "Must include username, age and hobbies"
          );
          return;
        }
        if (typeof updatedUser.age !== "number" || isNaN(updatedUser.age)) {
          handleErrorMessage(400, res, "Age must be a number.");
          return;
        }
        if (!Array.isArray(updatedUser.hobbies)) {
          handleErrorMessage(400, res, "Hobbies must be an array.");
          return;
        }
        if (!updatedUser.username || typeof updatedUser.username !== "string") {
          handleErrorMessage(400, res, "Username must be a string.");
          return;
        }
        users[userIndex] = { ...updatedUser, id: userId };
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users[userIndex]));
      } catch (error) {
        handleErrorMessage(500, res, error.message);
      }
    });
  } else if (
    method === "DELETE" &&
    parts[1] === "api" &&
    parts[2] === "users" &&
    userId
  ) {
    users = users.filter((user) => user.id !== userId);
    res.writeHead(204, { "Content-Type": "application/json" });
    res.end();
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
