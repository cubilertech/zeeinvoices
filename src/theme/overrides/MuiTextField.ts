import { borderRadius } from "@atlaskit/theme";
import { palette } from "../palette";

export const MuiTextField = () => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          "&.MuiTextField-sizeSmall": {
            height: "42px",
            border: `1px solid ${palette.base.borderColor}`,
            borderRadius: 1,
          },

          "&.MuiOutlinedInput-root": {
            border: `1px solid ${palette.color.gray[500]}`,
            borderRadius: 7,
          },

          "& .MuiInputBase-input": {
            // Notice the space before .MuiInputBase-input
            height: "32px",
            padding: "0px 10px",
            width: "100%",
            borderRadius: 7,
            border: `1px solid ${palette.base.borderColor}`,
            color: palette.base.black,
            "&:hover": {
              borderRadius: 7,
              border: `1px solid ${palette.color.gray[500]}`,
            },
            "&::placeholder": {
              color: palette.color.gray[500], // Change this to your desired placeholder color
            },
            "&:-webkit-autofill": {
              // change input field color on auto fill
              WebkitBoxShadow: `0 0 0 100px ${palette.base.white} inset`,
              WebkitTextFillColor: palette.base.black,
            },
          },
          borderRadius: 7,
          // background: palette.base.white,
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #307ECC inset",
            WebkitTextFillColor: "ffffff",
          },
        },
        contained: {},
        outlined: {
          border: `1px solid ${palette.color.gray[400]}`,
          color: palette.color.gray[700],
          borderRadius: 7,
        },
        text: {
          padding: 0,
          margin: 0,
        },
      },
    },
  };
};
