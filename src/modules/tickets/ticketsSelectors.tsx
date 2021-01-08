import { RootState } from "../../redux/rootReducer";
import { FilterValues, SortTicket } from "./ticketsSlice";
import { Ticket } from "../../api/dto/Ticket";

const sortTickets = (sort: SortTicket, tickets: Array<Ticket>) => {
  switch (sort) {
    case "cheap":
      return tickets.sort((a, b) => a.price - b.price);
    case "fast":
      return tickets.sort(
        (a, b) =>
          a.segments[0].duration +
          a.segments[1].duration -
          (b.segments[1].duration + b.segments[1].duration)
      );
    default:
      return tickets;
  }
};

const filterTickets = (filter: FilterValues, tickets: Array<Ticket>) => {
  const {
    withoutTransfers,
    oneTransplant,
    twoTransplants,
    threeTransfers,
  } = filter;
  if (withoutTransfers || oneTransplant || twoTransplants || threeTransfers) {
    return tickets.filter((item) => {
      if (
        withoutTransfers &&
        item.segments[0]?.stops.length === 0 &&
        item.segments[1]?.stops.length === 0
      ) {
        return true;
      }
      if (
        oneTransplant &&
        item.segments[0]?.stops.length < 2 &&
        item.segments[1]?.stops.length < 2
      ) {
        return true;
      }
      if (
        twoTransplants &&
        item.segments[0]?.stops.length < 3 &&
        item.segments[1]?.stops.length < 3
      ) {
        return true;
      }

      return !!(
        threeTransfers &&
        item.segments[0]?.stops.length < 4 &&
        item.segments[1]?.stops.length < 4
      );
    });
  } else {
    return tickets;
  }
};

export const ticketsSelector = ({ tickets }: RootState) => {
  let tempData = [...tickets.data];

  if (tempData.length) {
    tempData = sortTickets(tickets.sort, tempData);
  }

  tempData = filterTickets(tickets.filter, tempData);

  return { ...tickets, data: tempData };
};
