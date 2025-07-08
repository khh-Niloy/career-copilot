"use client";

import { store } from "@/redux/store/store";
import React from "react";
import { Provider } from "react-redux";

export default function ReduxWrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
