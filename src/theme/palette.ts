import { PaletteMode } from "@mui/material";

const brand = {
  900: "#2C1C5F",
  800: "#42307D",
  700: "#53389E",
  600: "#6941C6",
  500: "#7F56D9",
  400: "#9E77ED",
  300: "#B692F6",
  200: "#D6BBFB",
  100: "#E9D7EF",
  50: "#F4EBFF",
};

const error = {
  900: "#55160C",
  800: "#7A271A",
  700: "#912018",
  600: "#842318",
  500: "#D92D20",
  400: "#F04438",
  300: "#F97066",
  200: "#FDA29B",
  100: "#FECDCA",
  50: "#FEE4E2",
};

const warning = {
  900: "#4E1D09",
  800: "#7A2E0E",
  700: "#93370D",
  600: "#854708",
  500: "#DC6803",
  400: "#F79009",
  300: "#FDB022",
  200: "#FEC84B",
  100: "#FEDF89",
  50: "#FEF0C7",
};

const success = {
  900: "#053321",
  800: "#074D31",
  700: "#085D3A",
  600: "#067647",
  500: "#079455",
  400: "#17B26A",
  300: "#47CD89",
  200: "#75E0A7",
  100: "#ABEFC6",
  50: "#DCFAE6",
};

const gray = {
  750: "#6C7278",
  700: "#333333",
  650: "#3D4451",
  600: "rgb(91,93,107)",
  550: "rgb(90,93,105)",
  500: "rgb(112,112,129)",
  400: "rgb(95,112,125)",
  300: "rgb(115,130,133)",
  250: "#7a8089",
  200: "rgb(114,121,129)",
  175: "rgb(118,119,124)",
  150: "rgba(255, 255, 255, 0.37)",
  100: "#90919b",
  50: "#8f8f94",
  10: "#E0E0E0",
};

const opacity = {
  blue: "rgba(93, 146, 254, 0.3)",
  lightBlue: "rgba(102, 112, 133, 0.60)",
  gray: "rgba(196, 196, 196, 0.6)",
  darkGray: "rgba(230, 230, 230, 0.3)",
  lightGray: "rgba(151, 151, 161, 1)",
  darkerGray: "rgba(57, 57, 57, 0.6)",
};

const color = {
  lightWhite: "#fafafa",
  eggWhite: "#E6E6E6",
};

const gradiant = {
  darkBlue:
    "linear-gradient(142.96deg, rgba(93, 146, 254, 0.148) -3.54%, rgba(93, 146, 254, 0.168) 95.15%)",
  gray: "linear-gradient(142.96deg, rgba(255, 255, 255, 0.148) -3.54%, rgba(114, 114, 114, 0.168) 95.15%)",
  lightGray:
    "linear-gradient(138deg, rgba(57,57,57,0.6) -30%, rgba(97,97,97,0.6) 100%)",
  purpleBlue:
    "linear-gradient(54deg, rgba(108,33,177,1) 16%, rgba(26,138,169,1) 100%)",
  tooltip:
    "linear-gradient(142.96deg, rgba(68,74,89,255) -3.54%,  rgba(68,74,89,255) 7.55%, rgba(55,61,74,255) 95.15%)",
};

const base = {
  white: "#FFFFFF",
  black: "#000000",
  transparent: "#FFFFFF 0%",
};

const borderColor = {
  borderColor: "#D6DAE1",
};

const textGreyColor = {
  textGreyColor: "#697483",
};

const dashedBorderColor = {
  borderColor: "#C8C8C8",
};

const itemsHeadColor = {
  itemsHeadColor: "#333333",
};

const addItemsColor = {
  addItemsColor: "#E0E0E0",
};

const switchTrackColor = {
  switchTrackColor: "#34C759",
};



export const palette = {
  mode: "dark" as PaletteMode,
  primary: {
    main: "#3F4DE1",
    light: "#54A6FF",
  },
  brand: {
    main: "#7F56D9",
    // ...brand,
  },
  base: base,
  borderColor,
  textGreyColor,
  dashedBorderColor,
  itemsHeadColor,
  switchTrackColor,
  error: {
    main: "#F04438",
    // ...error,
  },
  warning: {
    main: "#F79009",
    // ...warning,
  },
  success: {
    main: "#17B26A",
    // ...success,
  },
  linearGradient: {
    // ...gradiant,
  },
  opacity: {
    // ...opacity,
  },
  color: {
    gray: {
      ...gray,
    },

    ...color,
  },
};
