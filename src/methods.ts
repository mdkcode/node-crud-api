import { sendJsonResponse, users } from "./utils.js";
import { handleUserCreationOrUpdate } from "./userCreateUpdate.js";

export const handleGet = (
  req,
  res,
  userId,
  hasCorrectPathname,
  urlContainsId
) => {
  if (hasCorrectPathname) {
    sendJsonResponse(res, 200, users);
  } else if (urlContainsId) {
    const certainUser = users.find(({ id }) => id === userId);
    if (certainUser) {
      sendJsonResponse(res, 200, certainUser);
    }
  }
};

export const handleDelete = (
  req,
  res,
  userId,
  hasCorrectPathname,
  urlContainsId
) => {
  if (urlContainsId) {
    const indexToDelete = users.findIndex((user) => user.id === userId);
    if (indexToDelete !== -1) {
      users.splice(indexToDelete, 1);
    }
    sendJsonResponse(res, 204);
  }
};

export const handlePost = (req, res) => {
  handleUserCreationOrUpdate(req, res, false);
};

export const handlePut = (req, res, userId) => {
  handleUserCreationOrUpdate(req, res, true, userId);
};
