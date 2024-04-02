"use client";

// Imports
import { ChangeEvent } from "react";

// Redux
import { useDispatch } from "react-redux";
import { add } from "@store/employeesSlice";

// Routing
import { useRouter } from "next/navigation";
import routes from "@router/routes";

// Components
import Input from "./Input";
import Select from "./Select";
import Button from "../Button";

// Constants
import { STATENAMES } from "@constants/stateList";
import DEPARTMENTS from "@constants/departmentList";

// Types
import { EmployeeType } from "@customTypes/employeeType";
import { DepartmentType } from "@customTypes/departmentType";

/**
 * @name NewEmployeeForm
 * @component
 * @description Form to create a new employee which will be displayed in the table in 'Employee List' page.
 *
 * @returns {JSX.Element}
 */
function NewEmployeeForm(): JSX.Element {
  // Routing
  const router = useRouter();

  // Store
  const dispatch = useDispatch();
  const addNewEmployee = (newEmployee: EmployeeType) => {
    dispatch(add(newEmployee));
  };

  // Form Actions
  const submitHandler: any = (event: ChangeEvent) => {
    event.preventDefault();

    const newEmployee: EmployeeType = {
      firstname: "Henri",
      lastname: "Thierry",
      birthdate: new Date(1999, 0, 1),
      startDate: new Date(2024, 0, 2),
      address: {
        street: "Stade de France",
        city: "Paris",
        state: {
          name: "California",
          abbreviation: "CA",
        },
        code: "75001",
      },
      department: "Human Resources",
    };
    addNewEmployee(newEmployee);

    const employeeListPagePath = routes.employeeList.path;
    const pathToEmployeeListPage =
      typeof employeeListPagePath === "function"
        ? employeeListPagePath()
        : employeeListPagePath;
    router.push(pathToEmployeeListPage);
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col">
      {/* Employee Full Name */}
      <Input
        idName={"firstnameInput"}
        hasLabel
        labelContent={"First Name"}
        isRequired
        type={"text"}
        placeholder={"Sherlock"}
        autoCompleteText={"give-name"}
        stylingInput="w-60 border-solid border border-slate-600 placeholder:italic placeholder:p-1 ml-2 mb-4"
      />

      <Input
        idName={"lastnameInput"}
        hasLabel
        labelContent={"Last Name"}
        isRequired
        type={"text"}
        placeholder={"Holmes"}
        autoCompleteText={"family-name"}
        stylingInput="w-60 border-solid border border-slate-600 placeholder:italic placeholder:p-1 ml-2 mb-4"
      />

      <Input
        idName={"birthdateInput"}
        hasLabel
        labelContent={"Date of Birth"}
        isRequired
        type={"date"}
        autoCompleteText={"bday"}
        stylingInput="w-60 border-solid border border-slate-600 placeholder:italic placeholder:p-1 ml-2 mb-4"
      />

      {/* Address */}
      <fieldset className="border-solid border-2 border-primary py-2 px-4">
        <legend className="px-2">Address</legend>

        <Input
          idName={"streetInput"}
          hasLabel
          labelContent={"Street"}
          type={"text"}
          placeholder={"221B Baker Street"}
          autoCompleteText={"street-address"}
          stylingInput="w-60 border-solid border border-slate-600 placeholder:italic placeholder:p-1 ml-2 mb-4"
        />

        <Input
          hasLabel
          labelContent={"City"}
          idName={"cityInput"}
          type={"text"}
          placeholder={"London"}
          autoCompleteText={"address-level2"}
          stylingInput="w-60 border-solid border border-slate-600 placeholder:italic placeholder:p-1 ml-2 mb-4"
        />

        <Select
          id={"states"}
          labelContent={"State"}
          optionsList={STATENAMES}
          stylingSelectGroup="mb-4"
        />

        <Input
          hasLabel
          labelContent={"Zip Code"}
          idName={"zipcodeInput"}
          type={"text"}
          placeholder={"NW1 6XE"}
          autoCompleteText={"postal-code"}
          stylingInput="w-60 border-solid border border-slate-600 placeholder:italic placeholder:p-1 ml-2 mb-4"
        />
      </fieldset>

      <Select
        id={"departments"}
        labelContent={"Department"}
        isRequired
        optionsList={DEPARTMENTS}
        stylingSelectGroup="m-4"
      />

      <Input
        idName={"startDateInput"}
        hasLabel
        labelContent={"Start Date"}
        isRequired
        type={"date"}
        stylingInput="w-60 border-solid border border-slate-600 placeholder:italic placeholder:p-1 my-4 ml-2"
      />

      <Button type={"submit"} extraStyling={"self-center"}>
        Create Employee
      </Button>
    </form>
  );
}

export default NewEmployeeForm;
