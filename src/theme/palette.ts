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


const color = {
  lightWhite: "#fafafa",
  eggWhite: "#E6E6E6",
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
  primary: {
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
  },
  warning: {
    main: "#F79009",
  },
  success: {
    main: "#17B26A",
  },
  boxShadows: {
    shadowxs: "0px 1px 2px 0px #1018280D",
    100: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px",
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
