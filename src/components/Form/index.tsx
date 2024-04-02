"use client";

// Imports
import { ChangeEvent, useState } from "react";

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
import { StateNameType, StateType } from "@/types/stateType";

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
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const [userBirthDate, setUserBirthDate] = useState<Date | null>(null);
  const [userStreet, setUserStreet] = useState<string | null>(null);
  const [userCity, setUserCity] = useState<string | null>(null);
  const [userState, setUserState] = useState<StateType>({
    name: "Alabama",
    abbreviation: "AL",
  });
  const [userCode, setUserCode] = useState<string | null>(null);
  const [userDepartment, setUserDepartment] = useState<DepartmentType | null>(
    null
  );
  const [userStartDate, setUserStartDate] = useState<Date | null>(null);

  // onChange Handler
  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case "firstname":
        setUserFirstName(value);
        break;
      case "lastname":
        setUserLastName(value);
        break;
      case "birthdate":
        setUserBirthDate(new Date(value));
        break;
      case "street":
        setUserStreet(value);
        break;
      case "city":
        setUserCity(value);
        break;
      case "states":
        const selectedState = STATES.find(
          (state) => state.name.toLowerCase() === value.toLowerCase()
        );
        setUserState(selectedState!);
        break;
      case "code":
        setUserCode(value);
        break;
      case "departments":
        setUserDepartment(value as DepartmentType);
        break;
      case "startDate":
        setUserStartDate(new Date(value));
        break;
      default:
        break;
    }
  };

  // Submit Handler
  const submitHandler: any = (event: ChangeEvent) => {
    event.preventDefault();

    const newEmployee: EmployeeType = {
      firstname: userFirstName,
      lastname: userLastName,
      birthdate: userBirthDate,
      startDate: userStartDate,
      address: {
        street: userStreet,
        city: userCity,
        state: userState,
        code: userCode,
      },
      department: userDepartment,
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
        id={"firstname"}
        hasLabel
        labelContent={"First Name"}
        isRequired
        type={"text"}
        placeholder={"Sherlock"}
        autoCompleteText={"give-name"}
        onChangeHandler={changeHandler}
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
        onChangeHandler={changeHandler}
        stylingInput="w-60 border-solid border border-slate-600 placeholder:italic placeholder:p-1 ml-2 mb-4"
      />

      <Input
        id={"birthdate"}
        hasLabel
        labelContent={"Date of Birth"}
        isRequired
        type={"date"}
        autoCompleteText={"bday"}
        onChangeHandler={changeHandler}
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
          onChangeHandler={changeHandler}
          stylingInput="w-60 border-solid border border-slate-600 placeholder:italic placeholder:p-1 ml-2 mb-4"
        />

        <Input
          id={"city"}
          hasLabel
          labelContent={"City"}
          type={"text"}
          placeholder={"London"}
          autoCompleteText={"address-level2"}
          onChangeHandler={changeHandler}
          stylingInput="w-60 border-solid border border-slate-600 placeholder:italic placeholder:p-1 ml-2 mb-4"
        />

        <Select
          id={"states"}
          labelContent={"State"}
          optionsList={STATENAMES}
          onChangeHandler={changeHandler}
          stylingSelectGroup="mb-4"
        />

        <Input
          id={"code"}
          hasLabel
          labelContent={"Zip Code"}
          type={"text"}
          placeholder={"NW1 6XE"}
          autoCompleteText={"postal-code"}
          onChangeHandler={changeHandler}
          stylingInput="w-60 border-solid border border-slate-600 placeholder:italic placeholder:p-1 ml-2 mb-4"
        />
      </fieldset>

      <Select
        id={"departments"}
        labelContent={"Department"}
        isRequired
        optionsList={DEPARTMENTS}
        onChangeHandler={changeHandler}
        stylingSelectGroup="m-4"
      />

      <Input
        id={"startDate"}
        hasLabel
        labelContent={"Start Date"}
        isRequired
        type={"date"}
        onChangeHandler={changeHandler}
        stylingInput="w-60 border-solid border border-slate-600 placeholder:italic placeholder:p-1 ml-2 mb-4"
      />

      <Button type={"submit"} extraStyling={"self-center"}>
        Create Employee
      </Button>
    </form>
  );
}

export default NewEmployeeForm;
