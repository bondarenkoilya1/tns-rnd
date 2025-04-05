import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl } from "@mui/material";

import { DiscussionFormFields, discussionSchema } from "../../../types";

export const DiscussionForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<DiscussionFormFields>({
    resolver: zodResolver(discussionSchema)
  });

  return <FormControl></FormControl>;
};
