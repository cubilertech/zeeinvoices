import { Box, Stack } from "@mui/material";
import React, { FC } from "react";

interface VerticalProgressBarProps {
  value: number;
}
const VerticalProgressBar: FC<VerticalProgressBarProps> = ({ value }) => {
  const progressValue = Math.min(Math.max(value, 0), 100); // Ensure value is between 1 and 100


  return (
    <Stack
      direction={"column"}
      sx={{
        width: "4px",
        height: "100%",
        backgroundColor: "#D9D9D9",
        borderRadius: "100px",
      }}
    >
      <Box
        sx={{
          width: "4px",
          height: `${progressValue}%`,
          background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
          borderRadius: "100px",
        }}
      />
    </Stack>
  );
};

export default VerticalProgressBar;
