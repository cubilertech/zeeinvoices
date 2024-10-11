"use client";
import { palette } from "@/theme/palette";
import {
  Stack,
  Typography,
  TextField as MuiTextField,
  SxProps,
} from "@mui/material";
import { ChangeEvent, FC } from "react";

interface TextField {
  label?: string;
  labelColor?: string;
  size?: "small" | "medium" | "large";
  borderRadius?: string;
  sx?: SxProps;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  helperText?: any;
  onBlur?: any;
  onKeyDown?: any;
  error?: any;
  disabled?: any;
  autoFocus?: boolean;
  isRequired?: boolean;
}
const TextField: FC<TextField> = ({
  label,
  labelColor,
  name,
  size = "medium",
  borderRadius = "8px",
  sx,
  onChange,
  value,
  helperText,
  onBlur,
  onKeyDown,
  error,
  disabled,
  autoFocus,
  isRequired = false,
  ...props
}) => {
  return (
    <Stack direction={"column"}>
      <Stack direction={"row"} gap={0.2}>
        <Typography
          variant="text-sm-medium"
          sx={{ marginBottom: "5px", color: `${labelColor}` }}
        >
          {label}
        </Typography>
        <Typography
          variant="text-sm-medium"
          sx={{ marginBottom: "5px", color: "red" }}
        >
          {isRequired && "*"}
        </Typography>
      </Stack>
      <MuiTextField
        autoFocus={autoFocus}
        size="small"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        error={error}
        disabled={disabled}
        helperText={helperText}
        sx={
          size === "large"
            ? {
                "& .MuiInputBase-input": {
                  height: "48px",
                  borderRadius: "8px",
                  "&::placeholder": {
                    color: palette.color.gray[740], // Change this to your desired placeholder color
                  },
                  
                },
                
                ...sx,
              }
            : size === "medium"
            ? {
                "& .MuiInputBase-input": {
                  height: "32px",
                  borderRadius: "2px",
                },
                ...sx,
              }
            : size === "small"
            ? {
                ...sx,
              }
            : {
                ...sx,
              }
        }
        id="outlined-basic"
        placeholder={label}
        variant="outlined"
      />
    </Stack>
  );
};

export default TextField;
