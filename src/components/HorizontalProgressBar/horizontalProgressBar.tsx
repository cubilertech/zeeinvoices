import { Box, Stack } from "@mui/material";
import React, { FC } from "react";

interface HorizontalProgressBarProps {
  value: number;
}
const HorizontalProgressBar: FC<HorizontalProgressBarProps> = ({ value }) => {
  const progressValue = Math.min(Math.max(value, 0), 100); // Ensure value is between 1 and 100

  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        height: "4px",
        backgroundColor: "#D9D9D9",
        borderRadius: "100px",
      }}
    >
      <Box
        sx={{
          width: `${progressValue}%`,
          height: `4px`,
          background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
          borderRadius: "100px",
          transition: "all 0.3s ease",
        }}
      />
    </Stack>
  );
};

export default HorizontalProgressBar;
