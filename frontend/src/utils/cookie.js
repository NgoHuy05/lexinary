import Cookies from "js-cookie";

export const removeAllCookies = () => {
  Object.keys(Cookies.get()).forEach((cookieName) => {
    Cookies.remove(cookieName, { path: "/" });
  });
};
