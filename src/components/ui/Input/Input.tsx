import { FC } from "react";

import { TextField, TextFieldProps } from "@mui/material";

export const Input: FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  disabled,
  placeholder,
  ...rest
}) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      {...rest}
    />
  );
};
