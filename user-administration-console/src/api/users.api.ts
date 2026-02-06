import axios from "axios";
import type { User } from "../types/user";

const API = "http://localhost:3001/users";

export const getUsers = () => axios.get<User[]>(API);
export const createUser = (data: Omit<User, "id">) => axios.post(API, data);
export const updateUser = (id: number, data: User) =>
  axios.put(`${API}/${id}`, data);
export const deleteUser = (id: number) => axios.delete(`${API}/${id}`);
