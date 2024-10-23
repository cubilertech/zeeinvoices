"use client";
import { Grid } from "@mui/material";
import { FC } from "react";
import Color from "./color";

interface ColorPicker {
  colors: Array<{ id: string | number; color: string; isSelected: boolean }>;
  onSelectColor: (id: string | number) => void;
  InvSetting?: any;
}
const ColorPicker: FC<ColorPicker> = ({
  colors,
  onSelectColor,
  InvSetting,
}) => {
  return (
    <Grid container spacing={1}>
      {colors?.map((color) => (
        <Grid item xs={1.5} key={color.id} sx={{ position: "relative" }}>
          <Color
            color={color.color}
            isSelected={InvSetting.color}
            onClick={() => onSelectColor(color.id)}
          />

        </Grid>
      ))}
    </Grid>
  );
};

export default ColorPicker;
