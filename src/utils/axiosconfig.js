import { getAccessToken } from "./authStorage";

const token = getAccessToken();

export const config = {
  headers: {
    Authorization: `Bearer ${token !== null ? token : ""}`,
    Accept: "application/json",
  },
};
