import { Theme } from "@mui/material/styles";
import { MuiButton } from "./MuiButton";
import { MuiTextField } from "./MuiTextField";
import { MuiSwitch } from "./MuiSwitch";

export const overrides = (theme: Theme) => ({
  ...MuiButton(),
  ...MuiTextField(),
  ...MuiSwitch(),
});
