import React, { Fragment } from "react";
import { Ticket } from "../../../api/dto/Ticket";
import styled from "styled-components";
import {
  getDurationTime,
  getTime,
  getTimeByDuration,
} from "../../../core/helpers/dateHelpers";
import { priceFormatter } from "../../../core/helpers/numberFormatters";
import { aviaCodes, Codes } from "../../../core/helpers/aviaCodes";

interface Props {
  ticket: Ticket;
}

export const TicketItem = ({ ticket }: Props) => {
  const { price, carrier, segments } = ticket;
  return (
    <TicketBlock>
      <Price>{priceFormatter(price)}&nbsp;Р</Price>
      <Logo src={`https://pics.avs.io/99/36/${carrier}.png`} />

      {segments.map(({ origin, destination, date, duration, stops }) => (
        <Fragment key={origin + destination}>
          <ContentItem>
            <ContentItemTitle>
              {aviaCodes(origin as Codes)} - {aviaCodes(destination as Codes)}
            </ContentItemTitle>
            <ContentItemValue>
              {`${getTime(date)} - ${getTimeByDuration(date, duration)}`}
            </ContentItemValue>
          </ContentItem>
          <ContentItem>
            <ContentItemTitle>В пути</ContentItemTitle>
            <ContentItemValue>{getDurationTime(duration)}</ContentItemValue>
          </ContentItem>
          <ContentItem>
            <ContentItemTitle>
              {stops.length ? `Пересадок: ${stops.length}` : ""}
            </ContentItemTitle>
            <ContentItemValue>
              {stops.map((stop, index) =>
                index === stops.length - 1
                  ? aviaCodes(stop as Codes)
                  : `${aviaCodes(stop as Codes)}, `
              )}
            </ContentItemValue>
          </ContentItem>
        </Fragment>
      ))}
    </TicketBlock>
  );
};

const TicketBlock = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 0.5fr 1fr;
  grid-gap: 20px;
  padding: 26px 20px;
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const Price = styled.div`
  color: var(--color-green1);
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
  grid-column-start: 1;
  grid-column-end: 3;
`;

const Logo = styled.img`
  width: 100px;
  height: 36px;
  object-fit: contain;
`;

// const Content = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr;
//   grid-gap: 20px;
//   margin-bottom: 20px;
// `;

const ContentItem = styled.div``;

const ContentItemTitle = styled.div`
  color: #a0b0b9;
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  text-transform: uppercase;
`;

const ContentItemValue = styled.div`
  color: #4a4a4a;
  font-size: 14px;
  line-height: 21px;
  font-weight: 600;
`;
