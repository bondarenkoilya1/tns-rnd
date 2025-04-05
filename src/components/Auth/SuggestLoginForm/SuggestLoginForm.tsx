import { FormStyled, FormTextStyled } from "../styled";

import { ButtonComponent } from "../../ui";

export const SuggestLoginForm = () => {
  return (
    <FormStyled formStyle="secondary">
      <FormTextStyled centered>Уже есть аккаунт?</FormTextStyled>
      <ButtonComponent
        color="primary"
        size="medium"
        variant="outlined"
        style={{ width: "100%", marginTop: "14px" }}
        href="/login">
        Войдите
      </ButtonComponent>
    </FormStyled>
  );
};
