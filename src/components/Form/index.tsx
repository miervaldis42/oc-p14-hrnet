"use client";

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
  // Routing
  const router = useRouter();

  // Store
  const dispatch = useDispatch();
  const addNewEmployee = (newEmployee: EmployeeType) => {
    dispatch(add(newEmployee));
  };

  /*
   * Form Actions
   */
  // Submit Handler
  const submitHandler = (formData: any) => {
    const newEmployee: EmployeeType = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      birthdate: new Date(formData.get("birthdate")),
      startDate: new Date(formData.get("startDate")),
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

    const employeeListPagePath = routes.employeeList.path;
    const pathToEmployeeListPage =
      typeof employeeListPagePath === "function"
        ? employeeListPagePath()
        : employeeListPagePath;
    router.push(pathToEmployeeListPage);
  };

  return (
    <form action={submitHandler} className="flex flex-col">
      {/* Employee Full Name */}
      <Input
        id={"firstname"}
        hasLabel
        labelContent={"First Name"}
        isRequired
        type={"text"}
        placeholder={"Sherlock"}
        autoCompleteText={"give-name"}
        stylingInput="w-60 border-solid border border-slate-600 placeholder:italic placeholder:p-1 ml-2 mb-4"
      />

      <Input
        id={"lastname"}
        hasLabel
        labelContent={"Last Name"}
        isRequired
        type={"text"}
        placeholder={"Holmes"}
        autoCompleteText={"family-name"}
        stylingInput="w-60 border-solid border border-slate-600 placeholder:italic placeholder:p-1 ml-2 mb-4"
      />

      <Input
        id={"birthdate"}
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
          id={"street"}
          hasLabel
          labelContent={"Street"}
          type={"text"}
          placeholder={"221B Baker Street"}
          autoCompleteText={"street-address"}
          stylingInput="w-60 border-solid border border-slate-600 placeholder:italic placeholder:p-1 ml-2 mb-4"
        />

        <Input
          id={"city"}
          hasLabel
          labelContent={"City"}
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
          id={"code"}
          hasLabel
          labelContent={"Zip Code"}
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
        id={"startDate"}
        hasLabel
        labelContent={"Start Date"}
        isRequired
        type={"date"}
        stylingInput="w-60 border-solid border border-slate-600 placeholder:italic placeholder:p-1 ml-2 mb-4"
      />

      <Button type={"submit"} extraStyling={"self-center"}>
        Create Employee
      </Button>
    </form>
  );
}

export default NewEmployeeForm;
