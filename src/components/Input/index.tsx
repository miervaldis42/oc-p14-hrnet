// Components
import CustomIcon from "../Icon";

// Types
import { ChangeEventHandler, MouseEventHandler } from "react";
import { IconNameTypes } from "@assets/iconLibrary";
type CustomInputPropsType = {
  idName: string;
  hasLabel?: boolean;
  labelContent?: string;
  type: "text" | "number";
  placeholder?: string;
  value: string | number;
  onChangeHandler?: ChangeEventHandler<HTMLInputElement>;
  onClickHandler?: MouseEventHandler<HTMLButtonElement>;
  stylingInputGroup?: string;
  stylingInput?: string;
  hasButton?: boolean;
  stylingButton?: string;
  iconName?: IconNameTypes;
  stylingIcon?: string;
};

/**
 * @name CustomInput
 * @component
 * @description Custom Input component.
 *
 * @param {CustomInputPropsType} props Elements to customize the input which will be displayed
 * @returns
 */
function CustomInput({
  idName,
  hasLabel = false,
  labelContent = idName,
  type,
  placeholder,
  value = "",
  onChangeHandler,
  onClickHandler,
  stylingInputGroup,
  stylingInput,
  hasButton = false,
  stylingButton,
  iconName = "magnifier",
  stylingIcon,
}: CustomInputPropsType) {
  return (
    <div className={stylingInputGroup}>
      <label htmlFor={idName} className={hasLabel ? "visible" : "hidden"}>
        {labelContent}
      </label>
      <input
        id={idName}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        className={stylingInput}
      />

      {hasButton && (
        <button onClick={onClickHandler} className={stylingButton}>
          <CustomIcon name={iconName} styling={stylingIcon} />
        </button>
      )}
    </div>
  );
}

export default CustomInput;
