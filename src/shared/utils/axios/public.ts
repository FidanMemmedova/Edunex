import axios, { AxiosInstance } from "axios";

const api: string = "https://edunex.omarov.me/api";

axios.defaults.baseURL = api;

export const publicAxios: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
