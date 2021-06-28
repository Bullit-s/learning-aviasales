import { RootState } from "../../redux/rootReducer";
import { FilterValues, SortTicket } from "./ticketsSlice";
import { Ticket } from "../../api/dto/Ticket";
import { aviaCodes, Codes } from "../../core/helpers/aviaCodes";

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
        item.segments[0]?.stops.length === 1 &&
        item.segments[1]?.stops.length === 1
      ) {
        return true;
      }
      if (
        twoTransplants &&
        item.segments[0]?.stops.length === 2 &&
        item.segments[1]?.stops.length === 2
      ) {
        return true;
      }

      return !!(
        threeTransfers &&
        item.segments[0]?.stops.length === 3 &&
        item.segments[1]?.stops.length === 3
      );
    });
  } else {
    return tickets;
  }
};

const searchTickets = (search: string, tickets: Array<Ticket>) => {
  if (!search) {
    return tickets;
  }

  return tickets.filter((ticket) => {
    if (
      ticket.segments.some(
        (item) =>
          aviaCodes(item.origin as Codes)
            .toLocaleLowerCase()
            .indexOf(search.toLocaleLowerCase()) !== -1
      )
    ) {
      return true;
    }

    if (
      ticket.segments.some(
        (item) =>
          aviaCodes(item.destination as Codes)
            .toLocaleLowerCase()
            .indexOf(search.toLocaleLowerCase()) !== -1
      )
    ) {
      return true;
    }

    return ticket.segments.some((item) =>
      item.stops.some(
        (stop) =>
          aviaCodes(stop as Codes)
            .toLocaleLowerCase()
            .indexOf(search.toLocaleLowerCase()) !== -1
      )
    );
  });
};

export const ticketsSelector = ({ tickets }: RootState) => {
  let tempData = [...tickets.data];

  if (tickets.sort && tempData.length) {
    tempData = sortTickets(tickets.sort, tempData);
  }

  tempData = filterTickets(tickets.filter, tempData);

  tempData = searchTickets(tickets.search, tempData);

  return { ...tickets, data: tempData };
};
