import { combineReducers } from "@reduxjs/toolkit";
import { ticketsReducer } from "../modules/tickets/ticketsSlice";

const rootReducer = combineReducers({
  tickets: ticketsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
