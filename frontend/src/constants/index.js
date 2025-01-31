export const BASE_URL = import.meta.env.VITE_API_URL; // axios

const API_URL = "/api/v1";

export const URLS = {
  LOGIN: API_URL + "/users/login",
  REGISTER: API_URL + "/users/register",
};