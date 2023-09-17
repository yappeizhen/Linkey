import axios from "axios";
import { BASE_URL } from "../constants/api";
import { CreateUserLinkReq, GetUserLinkRes } from "../types/links";

export const getLink = async (linkId: number) => {
  const response = await axios.post(`${BASE_URL}/links/${linkId}`, {
    withCredentials: true,
  });
  return response.data;
};

export const createLink = async ({
  userId,
  originalUrl,
}: CreateUserLinkReq): Promise<GetUserLinkRes> => {
  const response = await axios.post(
    `${BASE_URL}/users/${userId}/links`,
    originalUrl,
    { withCredentials: true }
  );
  return response.data;
};

export const getUserLinks = async (id: number): Promise<GetUserLinkRes[]> => {
  const response = await axios.get(`${BASE_URL}/users/${id}/links`);
  return response.data;
};
