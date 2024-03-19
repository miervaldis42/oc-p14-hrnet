// Imports
import { ReactNode } from "react";

// Types
type HeadingType = "h1" | "h2" | "h3";

type HeadingPropsType = {
  type: HeadingType;
  children: ReactNode;
};

type DynamicStylingType = string;

export type { HeadingType, HeadingPropsType, DynamicStylingType };
