import { ButtonComponent } from "../ui";
import { ContainerStyled } from "../../../styled";
import { Box } from "@mui/material";

export const Header = () => {
  return (
    <ContainerStyled style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
      <ButtonComponent variant="text" color="primary" size="medium" href="/">
        Home
      </ButtonComponent>
      <Box>
        <ButtonComponent variant="text" color="primary" size="medium" href="/login">
          Log in
        </ButtonComponent>
        <ButtonComponent variant="outlined" color="primary" size="medium" href="/register">
          Register
        </ButtonComponent>
      </Box>
    </ContainerStyled>
  );
};
