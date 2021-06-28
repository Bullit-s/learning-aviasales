import React, { memo } from "react";
import { Ticket } from "../../../api/dto/Ticket";
import { TicketItem } from "./TicketItem";
import {
  AutoSizer,
  List,
  WindowScroller,
  InfiniteLoader,
  CellMeasurerCache,
  ListRowRenderer,
  CellMeasurer,
} from "react-virtualized";
import styled from "styled-components";
import { FileSearchOutlined } from "@ant-design/icons";

const cache = new CellMeasurerCache();

interface Props {
  tickets: Array<Ticket>;
}

export const TicketList = memo(({ tickets }: Props) => {
  const rowCount = tickets.length + 1;

  const isRowLoaded = ({ index }: { index: number }) => {
    return index < tickets.length;
  };

  const rowRenderer: ListRowRenderer = (params) => {
    const item = isRowLoaded(params) ? (
      <TicketItem
        key={tickets[params.index].price + tickets[params.index].carrier}
        ticket={tickets[params.index]}
      />
    ) : null;
    return (
      <CellMeasurer
        cache={cache}
        parent={params.parent}
        columnIndex={0}
        rowIndex={params.index}
        key={params.index}
      >
        <div style={params.style}>{item}</div>
      </CellMeasurer>
    );
  };

  const virtualList = (
    <WindowScroller>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <InfiniteLoader
              loadMoreRows={() => new Promise(() => ({}))}
              isRowLoaded={isRowLoaded}
              rowCount={rowCount}
            >
              {({ onRowsRendered, registerChild }) => (
                <List
                  onRowRendered={onRowsRendered}
                  ref={registerChild}
                  scrollTop={scrollTop}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  width={width}
                  height={height}
                  rowHeight={cache.rowHeight}
                  deferredMeasurementCache={cache}
                  rowCount={rowCount}
                  rowRenderer={rowRenderer}
                  autoHeight
                />
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
  return (
    <>
      {tickets.length ? (
        virtualList
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
