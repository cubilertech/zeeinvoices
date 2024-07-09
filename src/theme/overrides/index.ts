import { Theme } from "@mui/material/styles";
import { MuiButton } from "./MuiButton";
import { MuiTextField } from "./MuiTextField";

export const overrides = (theme: Theme) => ({
  ...MuiButton(),
  ...MuiTextField(),
});
