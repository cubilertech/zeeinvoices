import { Theme } from "@mui/material/styles";
import { palette } from "../palette";
import { Margin, Padding } from "@mui/icons-material";

export const MuiButton = () => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-sizeSmall": {
            height: "30px",
          },
          "&.MuiButton-sizeMedium": {
            fontSize: "14px",
            fontWeight: 400,
            padding: "8px 20px 8px 20px",
          },
          "&.MuiButton-sizeLarge": {
            height: "45px",
          },
          //   "&.Mui-disabled": {
          //     opacity: 0.8,
          //   },
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
          padding:0,
          margin:0,
        },
      },
    },
  };
};
