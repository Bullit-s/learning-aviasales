import { useDispatch, useSelector } from "react-redux";
import { FilterValues, SortTicket, ticketsActions } from "../ticketsSlice";
import React, { useEffect, useState } from "react";
import { fetchSearchId, fetchTickets } from "../ticketsAsyncActions";
import { AppLayout } from "../../../components/AppLayout";
import { useForm } from "antd/es/form/Form";
import { TicketsFilter } from "../components/TicketsFilter";
import { ticketsSelector } from "../ticketsSelectors";
import { TicketsSort } from "../components/TicketsSort";
import { TicketList } from "../components/TicketList";
import { Spin } from "antd";
import styled from "styled-components";
import { TicketsSearch } from "../components/TicketsSearch";
import { useDebounceValue } from "../../../core/hooks/useDebounceValue";

export const filterOptions: Array<{
  label: string;
  value: keyof FilterValues;
}> = [
  {
    label: "Без пересадок",
    value: "withoutTransfers",
  },
  {
    label: "1 пересадка",
    value: "oneTransplant",
  },
  {
    label: "2 пересадки",
    value: "twoTransplants",
  },
  {
    label: "3 пересадки",
    value: "threeTransfers",
  },
];

export const TicketsPage = () => {
  const [filterForm] = useForm();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounceValue<string>(search, 750, "");

  const {
    searchId,
    data: ticketList,
    filter,
    sort: activeSort,
    loading,
  } = useSelector(ticketsSelector);
  const [allChecked, setAllChecked] = useState(true);

  const [checkedList, setCheckedList] = React.useState<
    Array<keyof FilterValues>
  >([]);

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    searchId && dispatch(fetchTickets(searchId));
  }, [dispatch, searchId]);

  useEffect(() => {
    const newFilter: FilterValues = {
      withoutTransfers: checkedList.includes("withoutTransfers"),
      oneTransplant: checkedList.includes("oneTransplant"),
      twoTransplants: checkedList.includes("twoTransplants"),
      threeTransfers: checkedList.includes("threeTransfers"),
    };
    dispatch(ticketsActions.setFilter(newFilter));
  }, [dispatch, checkedList]);

  const handleCheck = (checkedValues: Array<keyof FilterValues>) => {
    setCheckedList(checkedValues);
    const isAllChecked =
      checkedValues.length === 0
        ? true
        : filterOptions.every((item) => checkedValues.includes(item.value));
    setAllChecked(isAllChecked);
  };

  const handleCheckAll = () => {
    if (!allChecked) {
      setAllChecked(true);
      setCheckedList(filterOptions.map((item) => item.value));
    }
  };

  const handleSortTickets = (value: SortTicket) => {
    if (value === activeSort) {
      dispatch(ticketsActions.setSorting());
    } else {
      dispatch(ticketsActions.setSorting(value));
    }
  };

  useEffect(() => {
    if (debounceSearch === undefined) {
      return;
    }

    dispatch(ticketsActions.setSearch(debounceSearch));
  }, [debounceSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  return (
    <AppLayout
      sidebar={
        <TicketsFilter
          form={filterForm}
          allChecked={allChecked}
          checkedList={checkedList}
          onCheck={handleCheck}
          onCheckAll={handleCheckAll}
          initialValues={filter}
        />
      }
    >
      <TicketsSort sort={activeSort} onSort={handleSortTickets} />
      <TicketsSearch onChange={handleSearch} value={search} />
      {loading !== "idle" ? (
        <SpinWrapper>
          <Spin size="large" />
        </SpinWrapper>
      ) : (
        <TicketList tickets={ticketList} />
      )}
    </AppLayout>
  );
};

const SpinWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
`;
