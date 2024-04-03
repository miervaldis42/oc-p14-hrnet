// Imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { EmployeesType, EmployeeType } from "@customTypes/employeeType";

// Initial State
const initialState: EmployeesType = [
  {
    firstname: "Sherlock",
    lastname: "Holmes",
    birthdate: new Date(1854, 0, 6),
    startDate: new Date(2024, 0, 1),
    address: {
      street: "221B Baker Street",
      city: "London",
      state: {
        name: "Alabama",
        abbreviation: "AL",
      },
      code: "NW16XE",
    },
    department: "Engineering",
  },
];

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
