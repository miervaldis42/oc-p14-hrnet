// Imports
import { DepartmentType } from "./departmentType";
import { StateType } from "./stateType";

// Types
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
