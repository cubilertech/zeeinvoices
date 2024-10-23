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
        boxShadow: "rgba(99, 99, 99, 0.3) 0px 2px 8px 0px",
      }}
    >
      {isSelected === color && (
        <Box
          sx={{
            border: "2px solid black",
            borderRadius: "4px",
            height: "38px",
            width: "38px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: "-3px",
            top: "-3px",
          }}
        >
          {" "}
        </Box>
      )}
    </Box>
  );
};

export default Color;
