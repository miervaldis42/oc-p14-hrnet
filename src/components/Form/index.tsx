"use client";

// Redux
import { useDispatch } from "react-redux";
import { add } from "@store/employeesSlice";
import { activateAlert } from "@store/eventsSlice";

// Routing
import { useRouter } from "next/navigation";

// Components
import Input from "./Input";
import Select from "./Select";
import Button from "../Button";

// Constants
import { STATENAMES, STATES } from "@constants/stateList";
import DEPARTMENTS from "@constants/departmentList";

// Types
import { EmployeeType } from "@customTypes/employeeType";
import { DepartmentType } from "@customTypes/departmentType";
import { StateType } from "@/types/stateType";

/**
 * @name NewEmployeeForm
 * @component
 * @description Form to create a new employee which will be displayed in the table in 'Employee List' page.
 *
 * @returns {JSX.Element}
 */
function NewEmployeeForm(): JSX.Element {
  // Store
  const dispatch = useDispatch();
  const addNewEmployee = (newEmployee: EmployeeType) => {
    dispatch(add(newEmployee));
  };
  const displayAnEvent = () => {
    dispatch(activateAlert());
  };

  /*
   * Form Actions
   */
  // Submit Handler
  const submitHandler = (formData: any) => {
    const newEmployee: EmployeeType = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      birthdate: formData.get("birthdate"),
      startDate: formData.get("startDate"),
      address: {
        street: formData.get("street"),
        city: formData.get("city"),
        state: STATES.find(
          (state) =>
            state.name.toLowerCase() === formData.get("states").toLowerCase()
        )! as StateType,
        code: formData.get("code"),
      },
      department: formData.get("departments") as DepartmentType,
    };

    addNewEmployee(newEmployee);
    displayAnEvent();
  };

  return (
    <form action={submitHandler} className="flex flex-col">
      {/* Employee Full Name */}
      <fieldset className="flex justify-between border-solid border-2 border-primary py-3 px-8 mt-6">
        <legend className="text-lg font-bold px-2">General Information</legend>
        <Input
          id={"firstname"}
          hasLabel
          labelContent={"First Name"}
          isRequired
          type={"text"}
          placeholder={"Sherlock"}
          autoCompleteText={"give-name"}
          stylingInputGroup="flex flex-col"
          stylingInput="w-60 border border-solid border-slate-300 rounded-md placeholder:italic placeholder:p-1 p-2 mt-2 mb-4"
        />

        <Input
          id={"lastname"}
          hasLabel
          labelContent={"Last Name"}
          isRequired
          type={"text"}
          placeholder={"Holmes"}
          autoCompleteText={"family-name"}
          stylingInputGroup="flex flex-col"
          stylingInput="w-60 border border-solid border-slate-300 rounded-md placeholder:italic placeholder:p-1 p-2 mt-2 mb-4"
        />

        <Input
          id={"birthdate"}
          hasLabel
          labelContent={"Date of Birth"}
          isRequired
          type={"date"}
          autoCompleteText={"bday"}
          stylingInputGroup="flex flex-col"
          stylingInput="w-60 border border-solid border-slate-300 rounded-md placeholder:italic placeholder:p-1 p-2 mt-2 mb-4"
        />
      </fieldset>

      {/* Address */}
      <fieldset className="flex justify-between border-solid border-2 border-primary py-3 px-8 mt-10">
        <legend className="text-lg font-bold px-2">
          Address For Official Documents
        </legend>

        <Input
          id={"street"}
          hasLabel
          labelContent={"Street"}
          type={"text"}
          placeholder={"221B Baker Street"}
          autoCompleteText={"street-address"}
          stylingInputGroup="flex flex-col"
          stylingInput="w-60 border border-solid border-slate-300 rounded-md placeholder:italic placeholder:p-1 p-2 mt-2 mb-4"
        />

        <Input
          id={"city"}
          hasLabel
          labelContent={"City"}
          type={"text"}
          placeholder={"London"}
          autoCompleteText={"address-level2"}
          stylingInputGroup="flex flex-col"
          stylingInput="w-60 border border-solid border-slate-300 rounded-md placeholder:italic placeholder:p-1 p-2 mt-2 mb-4"
        />

        <Select
          id={"states"}
          labelContent={"State"}
          optionsList={STATENAMES}
          stylingSelectGroup="mb-4"
        />

        <Input
          id={"code"}
          hasLabel
          labelContent={"Zip Code"}
          type={"text"}
          placeholder={"NW1 6XE"}
          autoCompleteText={"postal-code"}
          stylingInputGroup="flex flex-col"
          stylingInput="w-60 border border-solid border-slate-300 rounded-md placeholder:italic placeholder:p-1 p-2 mt-2 mb-4"
        />
      </fieldset>

      <fieldset className="flex gap-20 border-solid border-2 border-primary py-3 px-8 mt-10">
        <legend className="text-lg font-bold px-2">Employee Information</legend>

        <Select
          id={"departments"}
          labelContent={"Department"}
          isRequired
          optionsList={DEPARTMENTS}
        />

        <Input
          id={"startDate"}
          hasLabel
          labelContent={"Start Date"}
          isRequired
          type={"date"}
          stylingInputGroup="flex flex-col"
          stylingInput="w-60 border border-solid border-slate-300 rounded-md placeholder:italic placeholder:p-1 p-2 mt-2 mb-4"
        />
      </fieldset>

      <Button type={"submit"} extraStyling={"self-center mt-8"}>
        Create Employee
      </Button>
    </form>
  );
}

export default NewEmployeeForm;
