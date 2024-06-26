// Imports
import { Children } from "react";

// Components
import CustomIcon from "@components/Icon";

// Types
import { DepartmentType } from "@customTypes/departmentType";
import { StateNameType } from "@customTypes/stateType";
interface CustomSelectProps {
  stylingSelectGroup?: string;
  id: string;
  labelContent: string;
  isRequired?: boolean;
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
  id,
  labelContent,
  isRequired = false,
  optionsList,
  stylingSelectGroup,
}: CustomSelectProps): JSX.Element {
  return (
    <div className={`flex flex-col ${stylingSelectGroup}`}>
      <label htmlFor={id} className="flex items-center">
        {labelContent}
        {isRequired && (
          <CustomIcon name={"star"} styling={"text-[50%] text-red-500 ml-1"} />
        )}
      </label>

      <select
        id={id}
        name={id}
        required={isRequired}
        className="border border-solid border-slate-300 p-2 mt-2"
      >
        {Children.toArray(
          optionsList.map((option) => (
            <option value={option.toString()}>{option.toString()}</option>
          ))
        )}
      </select>
    </div>
  );
}

export default CustomSelect;
