import { Outlet } from "react-router-dom";

import { Global } from "@emotion/react";

import { GlobalStyle } from "../styled";

import { Header } from "./components";

export const App = () => {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Header />
      <Outlet />
    </>
  );
};
