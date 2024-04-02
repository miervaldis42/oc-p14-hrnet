// Components
import CustomIcon from "@components/Icon";
import Button from "@components/Button";

// Types
import { ChangeEventHandler, MouseEventHandler } from "react";
import { IconNameTypes } from "@assets/iconLibrary";
type CustomInputPropsType = {
  idName: string;
  hasLabel?: boolean;
  labelContent?: string;
  isRequired?: boolean;
  type: "text" | "number" | "date";
  placeholder?: string;
  autoCompleteText?:
    | "give-name"
    | "family-name"
    | "bday"
    | "street-address"
    | "address-level2"
    | "postal-code";
  value?: string | number;
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
  isRequired = false,
  type,
  placeholder,
  value,
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
      <label
        htmlFor={idName}
        className={`${hasLabel ? "visible" : "hidden"} flex items-center`}
      >
        {labelContent}
        {isRequired && (
          <CustomIcon name={"star"} styling={"text-[50%] text-red-500 ml-1"} />
        )}
      </label>

      <input
        id={idName}
        type={type}
        required={isRequired}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        className={stylingInput}
      />

      {hasButton && !!onClickHandler && (
        <Button
          type={"button"}
          clickHandler={onClickHandler}
          styling={stylingButton}
        >
          <CustomIcon name={iconName} styling={stylingIcon} />
        </Button>
      )}
    </div>
  );
}

export default CustomInput;
