// Imports
import { ReactNode } from "react";

// Types
type HeadingType = "h1" | "h2" | "h3";

type HeadingPropsType = {
  type: HeadingType;
  children: ReactNode;
};

type DynamicStylingType = string;

/**
 * @name DynamicHeading
 * @component
 *
 * @param {object} props HTML tag name & `props.children`
 * @returns {JSX.Element} DynamicHeading
 */
function DynamicHeading({ type, children }: HeadingPropsType): JSX.Element {
  // HTML tag
  const HeadingTag = type;

  // Styling
  let dynamicStyling: DynamicStylingType = "";
  switch (type) {
    case "h1":
      dynamicStyling = "text-4xl";
      break;
    case "h2":
      dynamicStyling = "text-3xl";
      break;
    default:
      dynamicStyling = "text-xl";
      break;
  }

  return (
    <HeadingTag className={`font-extrabold text-center mb-4 ${dynamicStyling}`}>
      {children}
    </HeadingTag>
  );
}

export type { HeadingType, HeadingPropsType, DynamicStylingType };
export default DynamicHeading;
