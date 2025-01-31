export const setToken = (value) => localStorage.setItem("access_token", value);

export const setItem = (key, value) => localStorage.setItem(key, value);

export const getItem = (key = "access_token") => localStorage.getItem(key);

export const removeToken = () => localStorage.clear();