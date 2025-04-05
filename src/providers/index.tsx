import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@emotion/react";

import { router } from "../router";
import { defaultTheme } from "../themes";

export const Providers = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
