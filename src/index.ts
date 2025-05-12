import http from "http";
import { parse } from "url";
import { HttpMethod, users } from "./utils.js";
import { onError } from "./errorHandling.js";
import dotenv from "dotenv";
import { checkForUrlAndId } from "./validation.js";
import { handleDelete, handleGet, handlePost, handlePut } from "./methods.js";

dotenv.config();
const methodHandlers: Record<
  HttpMethod,
  (req, res, userId, hasCorrectPathname, urlContainsId) => void
> = {
  [HttpMethod.GET]: handleGet,
  [HttpMethod.POST]: handlePost,
  [HttpMethod.PUT]: handlePut,
  [HttpMethod.DELETE]: handleDelete,
};

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const parsedUrl = parse(url, true);
  const pathname = parsedUrl.pathname;
  const parts = pathname.split("/");
  const userId = parts[3];
  /** Check for 400 and 404 errors right away */
  onError(users, userId, res);
  const urlContainsId = checkForUrlAndId(parts, userId);
  const hasCorrectPathname = pathname === "/api/users";
  const handler = methodHandlers[method as HttpMethod];
  if (handler) {
    handler(req, res, userId, hasCorrectPathname, urlContainsId);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
