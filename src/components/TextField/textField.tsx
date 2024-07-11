"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  Stack,
  Typography,
  TextField as MuiTextField,
  SxProps,
} from "@mui/material";
import { FC } from "react";

interface TextField {
  lable?: string;
  size?: "small" | "medium" | "large";
  sx?: SxProps;
}
const TextField: FC<TextField> = ({ lable, size = "medium", sx }) => {
  return (
    <Stack direction={"column"}>
      <Typography variant="text-sm-medium" sx={{ marginBottom: "5px" }}>
        {lable}
      </Typography>
      <MuiTextField
        size="small"
        sx={
          size == "large"
            ? {
                "& .MuiInputBase-input": {
                  height: "48px",
                },
                ...sx,
              }
            : size == "medium"
            ? {
                "& .MuiInputBase-input": {
                  height: "32px",
                  borderRadius: "2px",
                },
                ...sx,
              }
            : size == "small"
            ? {
                ...sx,
              }
            : {
                ...sx,
              }
        }
        id="outlined-basic"
        placeholder={lable}
        variant="outlined"
      />
    </Stack>
  );
};

export default TextField;
