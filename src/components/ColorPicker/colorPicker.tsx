"use client";
import { Grid } from "@mui/material";
import { FC } from "react";
import Color from "./color";
import { useDispatch, useSelector } from "react-redux";
import {
  getColors,
  updateColorSelection,
} from "@/redux/features/invoiceSetting";
import { RootState } from "@/redux/store";
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
  const dispatch = useDispatch();
  const reduxColors = useSelector((state: RootState) => getColors(state));
  const entireState = useSelector((state: RootState) => state);
  const handleSelectColor = (id: number) => {
    dispatch(updateColorSelection(id));
  };
  return (
    <Grid container spacing={1}>
      {colors?.map((color) => (
        <Grid item xs={1.5} key={color.id}>
          <Color
            color={color.color}
            isSelected={InvSetting.color}
            // isSelected={color.isSelected}
            onClick={() => onSelectColor(color.id)}
            // onClick={() => handleSelectColor(color.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ColorPicker;
