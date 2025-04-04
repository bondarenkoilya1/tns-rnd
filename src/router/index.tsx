import { createBrowserRouter } from "react-router-dom";

import { App } from "../App.tsx";
import { Main } from "../pages/Main";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      { element: <Login />, path: "login" },
      { element: <Register />, path: "register" }
    ]
  }
]);
