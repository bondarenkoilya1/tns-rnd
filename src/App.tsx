import { Outlet } from "react-router-dom";
import { Global } from "@emotion/react";
import { GlobalStyle } from "../styled";

export const App = () => {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Outlet />
    </>
  );
};
