import { Box, Button } from "@mui/material";

import { ContainerStyled } from "../../../styled";

export const Main = () => {
  return (
    <ContainerStyled style={{ marginTop: 100 }}>
      <Box sx={{ marginTop: 10, display: "flex", justifyContent: "space-between", maxWidth: 560 }}>
        <Button variant="contained" href="/video-chat">
          Присоединиться к конференции
        </Button>
        <Button variant="contained" sx={{ backgroundColor: "#e8792f" }}>
          Создать конференцию
        </Button>
      </Box>
    </ContainerStyled>
  );
};
