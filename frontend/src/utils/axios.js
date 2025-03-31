import axios from "axios"; //ES6
import { BASE_URL } from "../constants";

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  timeoutErrorMessage: "API Timed Out!",
});
