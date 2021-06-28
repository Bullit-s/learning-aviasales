import React, { memo } from "react";
import { Ticket } from "../../../api/dto/Ticket";
import { TicketItem } from "./TicketItem";
import styled from "styled-components";
import { FileSearchOutlined } from "@ant-design/icons";

interface Props {
  tickets: Array<Ticket>;
}

export const TicketList = memo(({ tickets }: Props) => {
  console.log(tickets);
  return (
    <>
      {tickets.length ? (
        tickets.map((ticket) => (
          <TicketItem key={ticket.price + ticket.carrier} ticket={ticket} />
        ))
      ) : (
        <EmptyData>
          <div>
            <FileSearchOutlined style={{ fontSize: "32px" }} />
          </div>
          <EmptyText>По данном запросу билеты не найдены</EmptyText>
        </EmptyData>
      )}
    </>
  );
});

const EmptyData = styled.div`
  color: var(--color-red1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 150px;
`;

const EmptyText = styled.h2`
  color: var(--color-red1);

  margin-top: 20px;
`;
