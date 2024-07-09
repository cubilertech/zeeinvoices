import { Theme } from "@mui/material/styles";
import { palette } from "../palette";
import { Height } from "@mui/icons-material";

export const MuiTextField = () => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          "&.MuiTextField-sizeSmall": {
            height: "30px",
          },
          "&.MuiTextField-sizeMedium": {
            fontSize: "14px",
            fontWeight: 400,
            padding: "10px 20px",
          },
          "&.MuiTextField-sizeLarge": {
            height: "45px",
          },
          textTransform: "none" as const,
          zIndex: 4,
          border: "none",
          boxShadow: "none",
          borderRadius: "8px",
        },
        contained: {
          background: palette.primary.main,
          color: palette.base.white,
          "&:hover": {
            color: palette.base.white,
          },
        },
        outlined: {
          border: "1px solid",
          borderColor: palette.primary.main,
          color: palette.primary.main,
          
          "&:hover": {
            color: palette.primary.main,
          },
        },
        text: {
          padding: 0,
          margin: 0,
        },
      },
    },
  };
};
