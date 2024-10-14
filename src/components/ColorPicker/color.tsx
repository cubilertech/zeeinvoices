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
            border: "1px solid black",
            borderRadius: "3px",
            height: "36px",
            width: "36px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: "-2px",
            top: "-2px",
          }}
        >
          {" "}
        </Box>
      )}
    </Box>
  );
};

export default Color;
