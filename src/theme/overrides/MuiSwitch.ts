import { CSSObject, Theme } from "@mui/material/styles";
import { palette } from "../palette";

export const MuiSwitch = (): {
  MuiSwitch?: {
    styleOverrides?: {
      root?: CSSObject;
      switchBase?: CSSObject;
      thumb?: CSSObject;
      track?: CSSObject;
    };
  };
} => {
  return {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 40,
          height: 18,
          padding: 0,
        },
        switchBase: {
          padding: 0,
          margin: 1,
          transitionDuration: "300ms",
          "&.Mui-checked": {
            transform: "translateX(22px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              backgroundColor:
                palette.mode === "dark"
                  ? palette.base.switchTrackColor
                  : "#65C466",
              opacity: 1,
              border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
              opacity: 0.5,
            },
          },
          "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: `6px solid ${palette.base.white}`,
          },
          "&.Mui-disabled .MuiSwitch-thumb": {
            color: palette.base.white,
            opacity: 1, // Updated to a number, removing unnecessary string
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: palette.mode === "light" ? 0.7 : 0.3,
          },
        },
        thumb: {
          boxSizing: "border-box",
          width: 16,
          height: 16,
          "&.Mui-disabled": {
            color: palette.base.white,
            opacity: 1, // Updated to a number, removing unnecessary string
          },
        },
        track: {
          borderRadius: 13,
          width: 44,
          backgroundColor:
            palette.mode === "light"
              ? "#E9E9EA"
              : palette.base.borderColor,
          opacity: 1,
          transition: "background-color 500ms",
        },
      },
    },
  };
};
