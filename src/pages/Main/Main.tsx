import { Box, Button } from "@mui/material";

import { ContainerStyled } from "../../../styled";

export const Main = () => {
  return (
    <ContainerStyled style={{ marginTop: "50px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: 700,
          backgroundColor: "#f7fafd",
          border: "1px solid #bec3cb",
          borderRadius: " 6px",
          padding: "30px 50px"
        }}>
        <Button variant="contained" href="/video-chat">
          Присоединиться к конференции
        </Button>
        <Button variant="contained" sx={{ backgroundColor: "#e8792f" }} href="/create-conference">
          Создать конференцию
        </Button>
      </Box>
    </ContainerStyled>
  );
};
