// Imports
import { configureStore } from "@reduxjs/toolkit";

// Reducers
import { employeesReducer } from "./employeesSlice";
import { eventsReducer } from "./eventsSlice";

/**
 * Store
 * @description Global state of the app
 */
export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    events: eventsReducer,
  },
});

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
