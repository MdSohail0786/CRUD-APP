import axios from "axios";

export const bookBaseUrl = axios.create({
  baseURL: "http://localhost:9000/book",
});
