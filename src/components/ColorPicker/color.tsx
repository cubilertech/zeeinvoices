"use client";
import { Box } from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";

interface Color {
  color?: string;
  isSelected?: boolean;
  onClick?: () => void;
}
const Color: FC<Color> = ({ color, isSelected, onClick }) => {
  return (
    <Box
      onClick={onClick}
      borderRadius={1}
      sx={{
        cursor: "pointer",
        height: "32px",
        width: "32px",
        backgroundColor: color,
        borderRadius: "3px",
        position: "relative",
      }}
    >
      {isSelected === color && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Icon icon="tickIcon" width={20} height={20} />
        </Box>
      )}
    </Box>
  );
};

export default Color;
