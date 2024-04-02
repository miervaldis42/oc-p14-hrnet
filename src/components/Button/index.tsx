// Imports
import { MouseEventHandler, ReactNode } from "react";

// Types
interface ButtonPropsType {
  type: "submit" | "button";
  clickHandler?: MouseEventHandler<HTMLButtonElement> | (() => void);
  disabled?: boolean;
  styling?: string;
  extraStyling?: string;
  children: ReactNode;
}

/**
 * @name CustomButton
 * @component
 * @description Button to fully customize.
 *
 * @param {ButtonPropsType} props Parameters to customize the components
 * @returns {JSX.Element}
 */
function CustomButton({
  type = "button",
  clickHandler,
  disabled,
  styling,
  extraStyling,
  children,
}: ButtonPropsType): JSX.Element {
  return (
    <button
      type={type}
      onClick={clickHandler}
      disabled={disabled}
      className={
        styling
          ? styling
          : `w-fit text-white bg-primary rounded-lg drop-shadow-md py-2 px-4 mt-4 hover:font-bold hover:bg-blue-800 hover:translate-y-px ${extraStyling}`
      }
    >
      {children}
    </button>
  );
}

export default CustomButton;
