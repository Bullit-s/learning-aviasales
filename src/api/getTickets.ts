import { baseFetch } from "./baseFetch";
import { env } from "../env";
import { Ticket } from "./dto/Ticket";

export interface TicketsResponse {
  tickets: Array<Ticket>;
  stop: boolean;
}

export const getTickets = async (searchId: string) => {
  return (await baseFetch(
    `${env.TICKETS_API_URL}?searchId=${searchId}`
  )) as TicketsResponse;
};
