import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASEURL;

export const instance = axios.create({
  baseURL: BASE_URL,
});
