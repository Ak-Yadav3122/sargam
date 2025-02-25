import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:6060/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
