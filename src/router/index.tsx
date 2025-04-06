import { createBrowserRouter } from "react-router-dom";

import { App } from "../App.tsx";

import { CreateConference } from "../components/ui/CreateConference";
import { Cabinet, Conference, Login, Main, Register } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      { element: <Login />, path: "login" },
      { element: <Register />, path: "register" },
      { element: <Conference />, path: "video-chat" },
      { element: <Cabinet />, path: "cabinet" },
      { element: <CreateConference />, path: "create-conference" }
    ]
  }
]);
