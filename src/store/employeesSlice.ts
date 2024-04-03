// Imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { EmployeesType, EmployeeType } from "@customTypes/employeeType";

// Initial State
const initialState: EmployeesType = [];

/**
 * Employee Slice
 *
 */
const employeesListSlice = createSlice({
  name: "employeesListSlice",
  initialState,
  reducers: {
    resetState: () => initialState,
    add: (state, action: PayloadAction<EmployeeType>) => {
      state.push(action.payload);
    },
  },
});

export const { add } = employeesListSlice.actions;
export const employeesReducer = employeesListSlice.reducer;
