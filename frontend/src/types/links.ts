export type CreateUserLinkReq = {
  userId: number;
  originalUrl: string;
};
export type GetUserLinkRes = {
  id: number;
  originalUrl: string;
};
