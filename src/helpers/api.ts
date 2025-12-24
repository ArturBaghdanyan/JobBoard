import axios from "axios";
import type { Form } from "../types/auth";

export const loginUser = (data: Form) => {
  return axios.post("/login", data);
};

export const registerUser = (data: Form) => {
  return axios.post("/register", data);
};
