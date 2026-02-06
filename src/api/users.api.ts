import axios from "axios";
import type { User } from "../types/user";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message || "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);
export const getUsers = () => api.get("/users");
export const createUser = (data: Omit<User, "id">) => api.post("/users", data);
export const updateUser = (id: number, data: User) =>
  api.put(`/users/${id}`, data);
export const deleteUser = (id: number) => api.delete(`/users/${id}`);
