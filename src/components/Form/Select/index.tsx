// Imports
import { Children } from "react";

// Types
import { DepartmentType } from "@customTypes/departmentType";
import { StateNameType } from "@customTypes/stateType";
interface CustomSelectProps {
  stylingSelectGroup?: string;
  id: string;
  labelContent: string;
  optionsList: Array<StateNameType | DepartmentType>;
}

/**
 * @name CustomSelect
 * @component
 * @description Custom HTML select element.
 *
 * @param {CustomSelectProps} props Parameters to customize the select HTML element
 * @returns {JSX.Element}
 */
function CustomSelect({
  stylingSelectGroup,
  id,
  labelContent,
  optionsList,
}: CustomSelectProps): JSX.Element {
  return (
    <div className={stylingSelectGroup}>
      <label htmlFor={id}>{labelContent}</label>
      <select name={id}>
        {Children.toArray(
          optionsList.map((option) => (
            <option value={option.toString().toLowerCase()}>
              {option.toString()}
            </option>
          ))
        )}
      </select>
    </div>
  );
}

export default CustomSelect;
