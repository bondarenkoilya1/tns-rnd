import { Box } from "@mui/material";

import { ContainerStyled } from "../../../styled";
import { ButtonComponent } from "../../components";

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
        <ButtonComponent variant="contained" size="medium" href="/video-chat" color="primary">
          Присоединиться к конференции
        </ButtonComponent>
        <ButtonComponent
          variant="contained"
          href="/create-conference"
          color="warning"
          size="medium">
          Создать конференцию
        </ButtonComponent>
      </Box>
    </ContainerStyled>
  );
};
