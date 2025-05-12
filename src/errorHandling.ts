import { IncomingMessage, ServerResponse } from "http";
import { User } from "./utils.js";

export function onError(
  users: User[],
  userId: string,
  res: ServerResponse<IncomingMessage>
) {
  const uuidIsValid = isValidUuid(userId);
  const certainUser = users.find(({ id }) => id === userId);
  if (userId) {
    if (!uuidIsValid) {
      return handleErrorMessage(400, res, "UserId is invalid");
    } else if (!certainUser) {
      return handleErrorMessage(404, res, "User not found");
    }
  }
  return;
}

export function handleErrorMessage(
  status: 400 | 401 | 403 | 404 | 500,
  res: ServerResponse<IncomingMessage>,
  message: string
) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message }));
}

function isValidUuid(str) {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(str);
}
