import nookies from "nookies";

// Get item from cookies
export const getCookie = (key: string) => {
  const cookies = nookies.get();
  const cookieValue = cookies[key];
  return cookieValue;
};
