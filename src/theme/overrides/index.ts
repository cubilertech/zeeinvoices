import { Theme } from "@mui/material/styles";
import { MuiButton } from "./MuiButton";

export const overrides = (theme: Theme) => ({
  ...MuiButton(),
});
