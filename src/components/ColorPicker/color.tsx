"use client";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Icon } from "../Icon";

interface Color {
  color?: string;
  isSelected?: boolean;
  onClick?: () => void;
}
const Color: FC<Color> = ({ color, isSelected, onClick }) => {
  return (
    <Box onClick={onClick}
      borderRadius={1}
      sx={{ height: "32px", width: "32px", backgroundColor: { color } }}
    >
      {isSelected && <Icon icon="tickIcon" width={20} height={20} />}
    </Box>
  );
};

export default Color;
