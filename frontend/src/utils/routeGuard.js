import * as jose from "jose";
import { getItem as getToken } from "./session";

export const isLoggedIn = () => {
  try {
    const token = getToken();
    if (!token) return false;
    const { exp } = jose.decodeJwt(token);
    const currentTime = Math.floor(new Date().getTime() / 1000);
    return exp > currentTime;
  } catch (e) {
    console.log(e.toString());
    return false;
  }
};

export const isValidRole = (sysRoles = []) => {
  if (sysRoles.length === 0) return true;
  const token = getToken();
  if (!token) return false;
  const { data: user } = jose.decodeJwt(token);
  return sysRoles.some((r) => user?.roles.includes(r));
};

export const getDecodedTokenInfo = () => {
  const token = getToken();
  if (!token) return false;
  return jose.decodeJwt(token);
};
