import { UserDTO } from "../model/usersDTO";
import { getCall } from "./clientFactory/clientFactory";

export function getUserByUserId({ userId }: { userId: string }) {
  const response = getCall<UserDTO[]>(`https://jsonplaceholder.typicode.com/users/${userId}`);
  return response;
}