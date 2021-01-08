import React from "react";
import styled, { css } from "styled-components";
import { SortTicket } from "../ticketsSlice";

interface Props {
  onSort: (sort: SortTicket) => void;
  sort?: SortTicket;
}

export const TicketsSort = ({ onSort, sort }: Props) => {
  return (
    <SortingWrapper>
      <Sorting>
        <SortButton active={sort === "cheap"} onClick={() => onSort("cheap")}>
          Самый дешевый
        </SortButton>
        <SortButton active={sort === "fast"} onClick={() => onSort("fast")}>
          Самый быстрый
        </SortButton>
      </Sorting>
    </SortingWrapper>
  );
};

const SortingWrapper = styled.div`
  overflow: hidden;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #dfe5ec;
`;

const Sorting = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #ffffff;
`;

const SortButton = styled.div<{ active?: boolean }>`
  cursor: pointer;
  font-size: 12px;
  line-height: 20px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  padding: 15px;
  user-select: none;

  ${({ active }) => {
    if (active) {
      return css`
        color: #ffffff;
        background: var(--color-green1);
      `;
    }
  }}

  :first-child {
    border-right: 1px solid #dfe5ec;
  }
`;
