import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: {
    "Api-KEY": "1d99e0a3-30c2-44dd-bd8f-8f12d7bb9937",
  },
});
