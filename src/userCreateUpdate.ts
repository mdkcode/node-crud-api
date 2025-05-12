import { IncomingMessage, ServerResponse } from "http";
import { handleErrorMessage } from "./errorHandling.js";
import { users } from "./utils.js";
import { v4 as uuidv4 } from "uuid";
import { checkUsersRequiredFields } from "./validation.js";

export async function handleUserCreationOrUpdate(
  req: IncomingMessage,
  res: ServerResponse,
  isUpdate: boolean,
  userId?: string
) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    try {
      const user = JSON.parse(body);
      if (!checkUsersRequiredFields(user, res)) {
        return;
      }
      if (isUpdate && !userId) {
        return handleErrorMessage(400, res, "User ID is required for update.");
      }
      const userIndex = userId
        ? users.findIndex((user) => user.id === userId)
        : -1;
      if (isUpdate && userIndex === -1) {
        return handleErrorMessage(404, res, "User not found for update.");
      }
      const newUser = { ...user, id: isUpdate ? userId : uuidv4() };
      if (isUpdate) {
        users[userIndex] = newUser;
        res.writeHead(200, { "Content-Type": "application/json" });
      } else {
        users.push(newUser);
        res.writeHead(201, { "Content-Type": "application/json" });
      }
      res.end(JSON.stringify(newUser));
    } catch (error) {
      handleErrorMessage(500, res, error.message);
    }
  });
}
