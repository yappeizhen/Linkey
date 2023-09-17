export type CreateSnippetReq = {
  title: string;
  minsToExpiry: number;
  content: string;
};
export type GetSnippetRes = {
  id: number;
  title: string;
  views: string;
  minsToExpiry: number;
  content: string;
  dateCreated: Date;
};
export type GetPaginatedSnippets = {
  snippets: GetSnippetRes[];
  totalNum: number;
};
