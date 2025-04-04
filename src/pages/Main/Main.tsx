import { Box, Button } from "@mui/material";
import { ContainerStyled } from "../../../styled";

export const Main = () => {
  return (
    <ContainerStyled style={{ marginTop: 100 }}>
      <Button variant="text" sx={{ fontSize: 18, color: "#fff" }}>
        Log in
      </Button>

      <Box sx={{ marginTop: 10, display: "flex", justifyContent: "space-between", maxWidth: 320 }}>
        <Button variant="contained">Join meeting</Button>
        <Button variant="contained" sx={{ backgroundColor: "#e8792f" }}>
          Create meeting
        </Button>
      </Box>
    </ContainerStyled>
  );
};
