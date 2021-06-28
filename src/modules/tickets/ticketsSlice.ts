import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchId, fetchTickets } from "./ticketsAsyncActions";
import { Ticket } from "../../api/dto/Ticket";

export type SortTicket = "cheap" | "fast";

export type Loading = "pending" | "idle";

export interface FilterValues {
  withoutTransfers?: boolean;
  oneTransplant?: boolean;
  twoTransplants?: boolean;
  threeTransfers?: boolean;
}

interface TicketsState {
  data: Array<Ticket>;
  loading: Loading;
  filter: FilterValues;
  stop: boolean;
  sort?: SortTicket;
  searchId?: string;
  error?: string | null;
  search: string;
}

const initialState: TicketsState = {
  data: [],
  filter: {},
  // sort: "cheap",
  stop: false,
  loading: "idle",
  search: "",
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: initialState,
  reducers: {
    setFilter(state, action: { payload: FilterValues }) {
      state.filter = action.payload;
    },
    setSorting(state, action: { payload: SortTicket | undefined }) {
      state.sort = action.payload;
    },
    setSearch(state, action: { payload: string }) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      state.loading = "pending";
      state.data = [];
    });
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.loading = "idle";
      state.data = action.payload.tickets;
      state.stop = action.payload.stop;
    });
    builder.addCase(fetchTickets.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    });
    builder.addCase(fetchSearchId.pending, (state) => {
      state.loading = "pending";
      state.searchId = undefined;
    });
    builder.addCase(fetchSearchId.fulfilled, (state, action) => {
      state.loading = "idle";
      state.searchId = action.payload.searchId;
    });
    builder.addCase(fetchSearchId.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    });
  },
});

export const ticketsActions = ticketsSlice.actions;

export const ticketsReducer = ticketsSlice.reducer;
