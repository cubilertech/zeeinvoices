"use client";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Color from "./color";

interface ColorPicker {
  id?: string | number;
  color: string;
}
const ColorPicker: FC<ColorPicker> = ({ id, color }) => {
  return (
    <Box borderRadius={1} sx={{ height: 60 }}>
      <Color onClick={() => {
        
      }} />
    </Box>
  );
};

export default ColorPicker;
