import { BASE_URL } from "../constants/api";

export const whoami = async ({ token }: { token: string }) => {
  const response = await fetch(`${BASE_URL}/users/whoami`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const signup = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const res = await response.json();
  return res;
};

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return await response.json();
};

export const logout = async () => {
  document.cookie =
    "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
