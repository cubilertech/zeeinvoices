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

const badgeColors = {
  10: "#F0ECFD",
  11: "#5630BC",
  20: "#FEF4E6",
  21: "#C47206",
  30: "#E8F5F1",
  31: "#137A5F",
  "pending-bg": "#F0ECFD",
  pending: "#5630BC",
  "in-progress-bg": "#FEF4E6",
  "in-progress": "#C47206",
  completed: "#E8F5F1",
  "completed-bg": "#137A5F",
};

const gray = {
  900: "#121926",
  840: "#445164",
  830: "#18181B",
  820: "#101828",
  810: "#374151",
  805: "#333333",
  800: "#202020",
  770: "#6B7280",
  760: "#767676",
  755: "#8C8C8C",
  750: "#6C7278",
  745: "#52525B",
  740: "#697483",
  735: "#5D5D5D",
  731: "#5E5E5E",
  730: "#5E5E62",
  725: "#475467",
  720: "#444444",
  710: "#4F4F4F",
  705: "#364152",
  700: "#333333",
  650: "#3D4451",
  610: "#4B5565",
  600: "rgb(91,93,107)",
  550: "rgb(90,93,105)",
  510: "#697586",
  500: "rgb(112,112,129)",
  400: "rgb(95,112,125)",
  310: "#CDD5DF",
  300: "rgb(115,130,133)",
  250: "#7a8089",
  200: "#E3E8EF",
  175: "rgb(118,119,124)",
  150: "rgba(255, 255, 255, 0.37)",
  130: "#1B2533",
  120: "#D0D5DD",
  110: "#9CA3AF",
  105: "#EEF2F6",
  100: "#90919b",
  60: "#8F97A2",
  50: "#F8FAFC",
  30: "#F9F9F9",
  20: "#F5F6F7",
  10: "#E0E0E0",
  5: "#EAECF0",
  3: "#EDECEF",
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
  borderColor: "#D6DAE1",
  textGreyColor: "#697483",
  dashedBorderColor: "#C8C8C8",
  itemsHeadColor: "#333333",
  addItemsColor: "#E0E0E0",
  switchTrackColor: "#34C759",
  blueButtonColor: "#2C359D",
  contactInfoBgColor: "#3F4DE112",
};

const borderColor = {
  simpleBorderColor: "#D6DAE1",
  dashedBorderColor: "#C8C8C8",
  invoicesBorderColor: "#EAECF0",
  contactInfoBorderColor: "#3F4DE14D",
  contactUsBorderColor: "#E1E1E1",
  outlinedBtnBorderColor: "#D6D8DC",
  borderPrimary: "#D0D5DD",
};

const tableColor = {
  tableHeadColor: "#333333",
  addItemsColor: "#E0E0E0",
};

const textColor = {
  primary: "#697483",
  textGreyColor: "#697483",
  expandableTextGreyColor: "#52525B",
  termsHeadingColor: "#3F4DE1",
  termsdescColor: "#464646",
  contactInfoDescColor: "#1F1F1F",
  contactEmailColor: "#4F35DF",
  textSecondary: "#344054",
};

export const palette = {
  // mode: "dark" as PaletteMode,
  primary: {
    // main: "#3F4DE1",
    main: "#4F35DF",
    light: "#54A6FF",
  },
  brand: {
    main: "#7F56D9",
  },
  base: base,
  border: borderColor,
  text: textColor,
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
  boxShadows: {
    shadowxs: "0px 1px 2px 0px #1018280D",
    100: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px",
    // 200: "rgba(28, 28, 28, 0.1) 0px 0px 10px 0px",
    200: "0px 1px 3px 0px rgba(16, 24, 40, 0.1)",
    300: "rgba(205, 205, 205, 0.16) 0px 54.48px 64.09px 0px",
  },

  color: {
    gray: {
      ...gray,
    },
    badgeColors: {
      ...badgeColors,
    },

    ...color,
  },
};
