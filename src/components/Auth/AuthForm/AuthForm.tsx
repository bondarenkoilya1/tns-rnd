import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormStyled, FormTitleStyled } from "../styled";
import { APPLICATION_NAME } from "../../../constants";
import { ButtonComponent, Input } from "../../ui";
import { SuggestLoginForm, SuggestRegisterForm } from "../index";

import type { FormTypes } from "../../../types";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "../../../store/useAuthStore.ts";
import { ErrorTextStyled } from "./styled.ts";

const renderSuggestForm = (formType: FormTypes["formType"]) =>
  formType === "login" ? <SuggestRegisterForm /> : <SuggestLoginForm />;

const schema = z.object({
  email: z.string().email({ message: "Ваша электронная почта должна быть указана" }),
  password: z.string().min(3, { message: "Пароль должен содержать как минимум 3 символа" }),
  username: z.string().min(1, { message: "Поле с вашим именем пользователя должно быть заполнено" })
});

type FormFields = z.infer<typeof schema>;

export const AuthForm: React.FC<FormTypes> = ({ formType }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    resolver: zodResolver(schema)
  });

  const { registerUser, setField } = useAuthStore();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      setField("email", data.email);
      setField("password", data.password);
      setField("username", data.username);

      if (formType === "register") {
        await registerUser();
      }
    } catch (error: any) {
      setError("root", { message: error.message });
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      {renderTitle(formType)}
      <FormStyled
        formStyle="primary"
        style={{ marginBottom: "28px" }}
        onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Электронная почта"
          {...register("email")}
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
          placeholder="john.doe@gmail.com"
          fullWidth
        />
        {errors.email && <ErrorTextStyled>{errors.email.message}</ErrorTextStyled>}
        <Input
          label="Пароль"
          {...register("password")}
          type="password"
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
          placeholder="Введите как минимум 3 символа"
          fullWidth
          sx={{ marginTop: "46px" }}
        />
        {errors.password && <ErrorTextStyled>{errors.password.message}</ErrorTextStyled>}

        {formType === "register" && (
          <>
            <Input
              label="Ваше имя"
              {...register("username")}
              slotProps={{
                inputLabel: {
                  shrink: true
                }
              }}
              placeholder="Александр Григорьевич"
              fullWidth
              sx={{ marginTop: "46px" }}
            />
            {errors.username && <ErrorTextStyled>{errors.username.message}</ErrorTextStyled>}
          </>
        )}

        {renderButton(formType, isSubmitting)}
        {errors.root && <ErrorTextStyled>{errors.root.message}</ErrorTextStyled>}
      </FormStyled>
      {renderSuggestForm(formType)}
    </div>
  );
};

function renderTitle(formType: FormTypes["formType"]) {
  return (
    <FormTitleStyled>
      {formType === "login"
        ? `Войдите на сайт ${APPLICATION_NAME}`
        : `Создайте аккаунт на сайте ${APPLICATION_NAME}`}
    </FormTitleStyled>
  );
}

function renderButton(formType: FormTypes["formType"], isSubmitting: boolean) {
  return (
    <ButtonComponent
      color="primary"
      size="medium"
      variant="contained"
      style={{ width: "100%", marginTop: "28px" }}
      type="submit"
      disabled={isSubmitting}>
      {formType === "login" ? "Войти" : "Создать аккаунт"}
    </ButtonComponent>
  );
}
