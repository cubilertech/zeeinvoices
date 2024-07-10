import { Theme } from "@mui/material/styles";
import { palette } from "../palette";
import { Height } from "@mui/icons-material";
import { colors } from "@mui/material";

export const MuiTextField = () => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          "&.MuiTextField-sizeSmall": {
            height: "24px",
            border: `1px solid ${palette.borderColor.borderColor}`,
            borderRadius: 1,
          },

          "& .MuiInputBase-input": {
            // Notice the space before .MuiInputBase-input
            height: "32px",
            // background: "red",
            padding: "0px 10px",
            width: "100%",
            borderRadius: 1,
            color: palette.base.black,
            "&::placeholder": {
              color: palette.color.gray[500], // Change this to your desired placeholder color
            },
            "&:-webkit-autofill": {
              // change input field color on auto fill
              WebkitBoxShadow: `0 0 0 100px ${palette.base.white} inset`,
              WebkitTextFillColor: palette.base.black,
            },
          },
          // height: "32px",
          borderRadius: 1,
          background: palette.base.white,
          // border: `1px solid ${palette.borderColor.borderColor}`,
          // padding: " 10px 0px",
          // textTransform: "none" as const,
          // zIndex: 4,
          // border: "none",
          // boxShadow: "none",
          // borderRadius: "8px",
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #307ECC inset",
            WebkitTextFillColor: "ffffff",
          },
        },
        contained: {
          // background: palette.primary.main,
          // color: palette.base.white,
          // "&:hover": {
          //   color: palette.base.white,
          // },
        },
        outlined: {
          border: `1px solid ${palette.borderColor.borderColor}`,
          color: palette.color.gray[700],

          // "&:hover": {
          //   color: palette.primary.main,
          // },
        },
        text: {
          padding: 0,
          margin: 0,
        },
      },
    },
  };
};
