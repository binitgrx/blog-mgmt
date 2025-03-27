export const BASE_URL = import.meta.env.VITE_API_URL; // axios

const API_URL = "/api/v1";

export const URLS = {
  LOGIN: API_URL + "/users/login",
  REGISTER: API_URL + "/users/register",
  EMAIL_VERIFICATION: API_URL + "/users/verify-email",
  REGEN_EMAIL_VERIFICATION: API_URL + "/users/regen-email-verification",
  GENERATE_FORGET_PASSWORD: API_URL + "/users/generate-fp",
  VERIFY_FORGET_PASSWORD: API_URL + "/users/verify-fp",
  GET_PUBLISHED_BLOGS: API_URL + "/blogs/published",
  BLOGS: API_URL + "/blogs",
};