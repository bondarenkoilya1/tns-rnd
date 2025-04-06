import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

import { ErrorTextStyled } from "../Auth/AuthForm/styled";

import { useDiscussionsStore } from "../../store";
import { DiscussionFormFields, discussionSchema } from "../../types";
import { ButtonComponent, Input } from "../ui";

export const DiscussionForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<DiscussionFormFields>({
    resolver: zodResolver(discussionSchema)
  });

  const { setDiscussions } = useDiscussionsStore();

  const onSubmit: SubmitHandler<DiscussionFormFields> = (data) => {
    try {
      setDiscussions({
        ...data,
        id: uuidv4()
      });
    } catch (error: any) {
      setError("root", {
        message: error.message || "Ошибка при создании обсуждения. Попробуйте снова"
      });
    }
  };

  return (
    <div style={{ marginTop: "100px", paddingBottom: "100px" }}>
      <h2 style={{ fontSize: "26px", marginBottom: "20px" }}>Создание нового опроса</h2>
      <form style={{ width: "500px" }} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Название опроса"
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
          {...register("title")}
          placeholder="Утверждение нового формата удалённой работы для всех отделов"
          fullWidth
        />
        {errors.title && <ErrorTextStyled>{errors.title.message}</ErrorTextStyled>}

        <Input
          label="Описание"
          {...register("description")}
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
          multiline
          rows={4}
          placeholder="Предлагается ввести гибридный график: 3 дня в офисе, 2 — удалённо. Это позволит повысить продуктивность, снизить затраты на дорогу и сохранить командную вовлечённость."
          fullWidth
          sx={{ marginTop: "28px" }}
        />
        {errors.description && <ErrorTextStyled>{errors.description.message}</ErrorTextStyled>}

        <FormControl sx={{ marginTop: "28px" }}>
          <FormLabel>Тип голосования</FormLabel>
          <RadioGroup row defaultValue="online">
            <FormControlLabel
              value="online"
              control={<Radio />}
              label="Онлайн"
              {...register("votingType")}
            />
            <FormControlLabel
              value="offline"
              control={<Radio />}
              label="Оффлайн"
              {...register("votingType")}
            />
          </RadioGroup>
          {errors.votingType && <ErrorTextStyled>{errors.votingType.message}</ErrorTextStyled>}
        </FormControl>

        <Input
          label="Дата окончания"
          {...register("endTime")}
          type="date"
          fullWidth
          sx={{ marginTop: "28px" }}
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
        />
        {errors.endTime && <ErrorTextStyled>{errors.endTime.message}</ErrorTextStyled>}

        <ButtonComponent
          type="submit"
          color="primary"
          size="medium"
          variant="contained"
          disabled={isSubmitting}
          style={{ width: "100%", marginTop: "28px" }}>
          Создать опрос
        </ButtonComponent>

        {errors.root && <ErrorTextStyled>{errors.root.message}</ErrorTextStyled>}
      </form>
    </div>
  );
};
