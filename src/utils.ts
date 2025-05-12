import { ServerResponse } from "http";
import { v4 as uuidv4 } from "uuid";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export const users: User[] = [
  {
    id: uuidv4(),
    username: "Jane Doe",
    age: 18,
    hobbies: ["reading", "dancing"],
  },
];

export function sendJsonResponse(
  res: ServerResponse,
  statusCode: 200 | 204 | 201,
  data?: any
) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  if (statusCode === 204) res.end();
  else res.end(JSON.stringify(data));
}
