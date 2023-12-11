import { localStorage } from "./localStorage";

export const AUTH_USER_INFO = "authenticated_user_info";
export const AUTH_ACCESS_TOKEN = "authenticated_access_token";
export const AUTH_REFRESH_TOKEN = "authenticated_refresh_token";

export const getAuthUser = () => {
  try {
    return JSON.parse(localStorage.get(AUTH_USER_INFO));
  } catch (error) {
    return undefined;
  }
};

export const setAuthUser = (userInfo) =>
  localStorage.set(AUTH_USER_INFO, JSON.stringify(userInfo));

export const removeAuthUser = () => {
  localStorage.remove(AUTH_USER_INFO);
};

export const getAccessToken = () => {
  try {
    return localStorage.get(AUTH_ACCESS_TOKEN);
  } catch (error) {
    return undefined;
  }
};

export const setAccessToken = (accessToken) =>
  localStorage.set(AUTH_ACCESS_TOKEN, accessToken);

export const removeAccessToken = () => {
  localStorage.remove(AUTH_ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  try {
    return localStorage.get(AUTH_REFRESH_TOKEN);
  } catch (error) {
    return undefined;
  }
};

export const setRefreshToken = (refreshToken) =>
  localStorage.set(AUTH_REFRESH_TOKEN, refreshToken);

export const removeRefreshToken = () => {
  localStorage.remove(AUTH_REFRESH_TOKEN);
};

export const clearAuthStorage = () => {
  removeAuthUser();
  removeAccessToken();
  removeRefreshToken();
};
