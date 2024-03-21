"use client";

// Imports
import { ReactNode } from "react";

// Redux
import { Provider } from "react-redux";
import { store } from "@store/index";

function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
