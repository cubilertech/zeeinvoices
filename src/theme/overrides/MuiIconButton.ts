import { Theme } from "@mui/material/styles";
import { palette } from "../palette";

export const MuiIconButton = () => {
  return {

    MuiIconButton: {
      styleOverrides: {
        root: {
          "&.MuiIconButton-sizeSmall": {
            height: "30px",
            width: "30px",
          },
          "&.MuiIconButton-sizeMedium": {
            height: "40px",
            width: "40px",
          },
          "&.MuiIconButton-sizeLarge": {
            height: "50px",
            width: "50px",
          },
          borderRadius: "10%",
          "&:hover": {
            backgroundColor: palette.color.gray[10],
            // color: palette.base.white,
          },
        },
      },
    },
  };
};
