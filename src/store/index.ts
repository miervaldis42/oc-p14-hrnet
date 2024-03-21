// Imports
import { configureStore } from "@reduxjs/toolkit";

// Reducers
import { employeesReducer } from "./employeesSlice";

/**
 * Store
 * @description Global state of the app
 */
export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
