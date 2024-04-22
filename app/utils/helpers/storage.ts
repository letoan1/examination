import Cookies from "js-cookie";

export const getCookie = (name: string) => {
  return Cookies.get(name) || "";
};

export const deleteCookie = (name: string) => {
  Cookies.remove(name);
};

export const setCookie = (name: string, value: string, options?: any) => {
  Cookies.set(name, value, options);
};
