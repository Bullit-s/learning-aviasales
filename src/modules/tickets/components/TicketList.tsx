import React from "react";
import { Ticket } from "../../../api/dto/Ticket";
import { TicketItem } from "./TicketItem";

interface Props {
  tickets: Array<Ticket>;
}

export const TicketList = ({ tickets }: Props) => {
  return (
    <>
      {tickets.length
        ? tickets.map((ticket) => (
            <TicketItem key={ticket.price + ticket.carrier} ticket={ticket} />
          ))
        : null}
    </>
  );
};
