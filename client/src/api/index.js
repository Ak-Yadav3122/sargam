import axios from "axios";

export const client = axios.create({
  // baseURL: "https://sargam-seven.vercel.app/api/",
  baseURL: "http://localhost:5173/api/",
});
