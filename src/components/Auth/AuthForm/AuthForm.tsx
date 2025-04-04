import React, { useState } from "react";

import { FormStyled, FormTitleStyled } from "../styled";
import { APPLICATION_NAME } from "../../../constants";
import { ButtonComponent, Input } from "../../ui";
import { SuggestLoginForm, SuggestRegisterForm } from "../index";

import type { FormTypes } from "../../../types";

const renderSuggestForm = (formType: FormTypes["formType"]) =>
  formType === "login" ? <SuggestRegisterForm /> : <SuggestLoginForm />;

export const AuthForm: React.FC<FormTypes> = ({ formType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted");

    // formType === "login"
    //   ? await dispatch(loginUser({ email, password }))
    //   : await dispatch(registerUser({ email, password }));
  };

  return (
    <div style={{ marginTop: "100px" }}>
      {renderTitle(formType)}
      <FormStyled formStyle="primary" style={{ marginBottom: "28px" }} onSubmit={handleSubmit}>
        <Input
          label="Email"
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
          placeholder="john.doe@gmail.com"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
          placeholder="Must be at least 3 characters"
          fullWidth
          sx={{ marginTop: "46px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {renderButton(formType)}
      </FormStyled>
      {renderSuggestForm(formType)}

      {/*{isLoading && <div>Loading...</div>}*/}
      {/*{error && <div style={{ color: "red" }}>{error}</div>}*/}
    </div>
  );
};

// Function declaration here to call them above
function renderTitle(formType: FormTypes["formType"]) {
  return (
    <FormTitleStyled>
      {formType === "login"
        ? `Log in to ${APPLICATION_NAME}`
        : `Create an account in ${APPLICATION_NAME}`}
    </FormTitleStyled>
  );
}

function renderButton(formType: FormTypes["formType"]) {
  return (
    <ButtonComponent
      color="primary"
      size="medium"
      variant="contained"
      style={{ width: "100%", marginTop: "28px" }}
      type="submit">
      {formType === "login" ? "Log in" : "Create an account"}
    </ButtonComponent>
  );
}
