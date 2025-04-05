import { FormStyled, FormTextStyled, FormTextWrapperStyled } from "../styled";

import { APPLICATION_NAME } from "../../../constants";
import { ButtonComponent } from "../../ui";

export const SuggestRegisterForm = () => {
  return (
    <FormStyled formStyle="secondary">
      <FormTextWrapperStyled>
        <FormTextStyled marginRight>Впервые на {APPLICATION_NAME}?</FormTextStyled>
        <ButtonComponent color="primary" size="medium" variant="text" href="/register">
          Создайте аккаунт
        </ButtonComponent>
      </FormTextWrapperStyled>
    </FormStyled>
  );
};
