import { Box, Button } from "@mui/material";

import { ContainerStyled } from "../../../styled";

export const Main = () => {
  return (
    <ContainerStyled style={{ marginTop: 100 }}>
      <Box sx={{ marginTop: 10, display: "flex", justifyContent: "space-between", maxWidth: 320 }}>
        <Button variant="contained" href="/video-chat">
          Join meeting
        </Button>
        <Button variant="contained" sx={{ backgroundColor: "#e8792f" }}>
          Create meeting
        </Button>
      </Box>
    </ContainerStyled>
  );
};
