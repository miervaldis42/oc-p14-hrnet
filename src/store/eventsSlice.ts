// Imports
import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  employeeCreation: false,
};

/**
 * Employee Slice
 *
 */
const eventsSlice = createSlice({
  name: "eventsSlice",
  initialState,
  reducers: {
    resetState: () => initialState,
    activateAlert: (state) => {
      state.employeeCreation = true;
    },
    desactivateAlert: (state) => {
      state.employeeCreation = false;
    },
  },
});

export const { activateAlert, desactivateAlert } = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;
