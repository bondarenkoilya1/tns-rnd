import { Box } from "@mui/material";

import { ContainerStyled } from "../../../styled";
import { HeaderStyled } from "./styled.ts";

import { ButtonComponent } from "../ui";

export const Header = () => {
  return (
    <HeaderStyled>
      <ContainerStyled style={{ display: "flex", justifyContent: "space-between" }}>
        <ButtonComponent
          style={{ color: "#fff" }}
          variant="text"
          color="primary"
          size="medium"
          href="/">
          Главная
        </ButtonComponent>{" "}
        <ButtonComponent
          style={{ color: "#fff" }}
          variant="text"
          color="primary"
          size="medium"
          href="/cabinet">
          Кабинет
        </ButtonComponent>
        <Box>
          <ButtonComponent
            style={{ color: "#fff", marginRight: "20px" }}
            variant="text"
            color="primary"
            size="medium"
            href="/login">
            Войти
          </ButtonComponent>
          <ButtonComponent
            style={{ color: "#fff" }}
            variant="outlined"
            color="primary"
            size="medium"
            href="/register">
            Создать аккаунт
          </ButtonComponent>
        </Box>
      </ContainerStyled>
    </HeaderStyled>
  );
};
