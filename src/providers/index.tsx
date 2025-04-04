import { RouterProvider } from "react-router-dom";
import { router } from "../router";
import { ThemeProvider } from "@emotion/react";
import { defaultTheme } from "../themes";

export const Providers = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
