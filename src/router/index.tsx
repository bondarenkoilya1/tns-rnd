import { createBrowserRouter } from "react-router-dom";

import { App } from "../App.tsx";
import { Main, Login, Register, Conference } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      { element: <Login />, path: "login" },
      { element: <Register />, path: "register" },
      { element: <Conference />, path: "video-chat" }
    ]
  }
]);
