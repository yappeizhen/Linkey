import { BASE_URL } from "../constants/api";
import { SESSION_STORAGE_KEYS } from "../constants/storage";
import { CreateUserLinkReq, GetUserLinkRes } from "../types/links";

export const getLink = async (linkId: number) => {
  const response = await fetch(`${BASE_URL}/links/${linkId}`, {
    method: "GET",
  });
  return response.json();
};

export const createLink = async ({
  userId,
  originalUrl,
}: CreateUserLinkReq): Promise<GetUserLinkRes> => {
  const response = await fetch(`${BASE_URL}/users/${userId}/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem(
        SESSION_STORAGE_KEYS.linkeyToken
      )}`,
    },
    body: JSON.stringify({ originalUrl }),
  });
  return response.json();
};

export const getUserLinks = async (id: number): Promise<GetUserLinkRes[]> => {
  const response = await fetch(`${BASE_URL}/users/${id}/links`, {
    method: "GET",
  });
  return response.json();
};
