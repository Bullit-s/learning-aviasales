import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSearchId } from "../../api/getSearchId";
import { getTickets, TicketsResponse } from "../../api/getTickets";

export const fetchSearchId = createAsyncThunk(
  "tickets/fetchSearchId",
  async (_, { rejectWithValue }) => {
    try {
      return await getSearchId();
    } catch (err) {
      if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue("Invalid operation fetchSearchId");
      }
    }
  }
);

export const fetchTickets = createAsyncThunk<TicketsResponse, string>(
  "tickets/fetchTickets",
  async (searchId, { rejectWithValue }) => {
    try {
      return await getTickets(searchId);
    } catch (err) {
      if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue("Invalid operation fetchTickets");
      }
    }
  }
);
