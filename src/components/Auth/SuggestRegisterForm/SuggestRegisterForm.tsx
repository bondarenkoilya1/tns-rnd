import { FormStyled, FormTextStyled, FormTextWrapperStyled } from "../styled";

import { APPLICATION_NAME } from "../../../constants";
import { ButtonComponent } from "../../ui";

export const SuggestRegisterForm = () => {
  return (
    <FormStyled formStyle="secondary">
      <FormTextWrapperStyled>
        <FormTextStyled marginRight>New to {APPLICATION_NAME}?</FormTextStyled>
        <ButtonComponent color="primary" size="medium" variant="text" href="/register">
          Create an account
        </ButtonComponent>
      </FormTextWrapperStyled>
      <ButtonComponent
        color="primary"
        size="medium"
        variant="outlined"
        style={{ width: "100%", marginTop: "6px" }}>
        Log In as demo user
      </ButtonComponent>
    </FormStyled>
  );
};
