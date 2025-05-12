import { ServerResponse } from "http";
import { handleErrorMessage } from "./errorHandling.js";
import { User } from "./utils.js";

export function checkForUrlAndId(parts: string[], userId: string) {
  return parts[1] === "api" && parts[2] === "users" && userId;
}

export function checkUsersRequiredFields(
  user: User,
  res: ServerResponse
): boolean {
  if (!user.username || !user.age || !user.hobbies) {
    handleErrorMessage(400, res, "Must include username, age and hobbies");
    return false;
  }
  if (typeof user.age !== "number" || isNaN(user.age)) {
    handleErrorMessage(400, res, "Age must be a number");
    return false;
  }
  if (!Array.isArray(user.hobbies)) {
    handleErrorMessage(400, res, "Hobbies must be an array");
    return false;
  }
  if (!user.username || typeof user.username !== "string") {
    handleErrorMessage(400, res, "Username must be a string");
    return false;
  }
  return true;
}
