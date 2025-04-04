import { createBrowserRouter } from "react-router-dom";

import { App } from "../App.tsx";
import { Main } from "../pages/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Main /> }]
  }
]);
