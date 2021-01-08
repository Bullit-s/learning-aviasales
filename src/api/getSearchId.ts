import { baseFetch } from "./baseFetch";
import { env } from "../env";

interface Response {
  searchId: string;
}

export const getSearchId = async () => {
  return (await baseFetch(env.SEARCH_ID_API_URL)) as Response;
};
