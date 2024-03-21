// Imports
import { StateType } from "./stateType";

// Types
export type DepartmentType =
  | "Sales"
  | "Marketing"
  | "Engineering"
  | "Human Resources"
  | "Legal";

export interface EmployeeType {
  firstname: string | null;
  lastname: string | null;
  birthdate: Date | null;
  startDate: Date | null;
  address: {
    street: string | null;
    city: string | null;
    state: StateType | null;
    code: string | null;
  };
  department: DepartmentType | null;
}

export type EmployeesType = Array<EmployeeType>;
