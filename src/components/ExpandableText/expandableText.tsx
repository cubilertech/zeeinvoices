import { palette } from "@/theme/palette";
import {
  Box,
  IconButton,
  LinearProgress,
  linearProgressClasses,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { VerticalProgressBar } from "../VerticalProgressBar";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 4, // Set the height to the desired length for the vertical bar
  width: 100, // Adjust the width accordingly
  borderRadius: 100,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
    ...theme.applyStyles("dark", {
      backgroundColor: "#D9D9D9",
    }),
  },
}));

interface ExpandableTextProps {
  title1?: string;
  title2?: string;
  desc?: string;
  isOpen: boolean;
  onToggle: () => void;
  onComplete: () => void;
}

const ExpandableText: FC<ExpandableTextProps> = ({
  title1,
  title2,
  desc,
  isOpen,
  onToggle,
  onComplete,
}) => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    if (!isOpen) return; // If not open, do nothing

    setProgress(1); // Reset progress when a new item is selected

    const duration = 5000; // 5 seconds
    const increment = 100 / (duration / 100); // Update every 100ms

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete(); // Trigger onComplete when progress reaches 100%
          return 100;
        }
        return prev + increment;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  return (
    <Stack direction={"row"}>
      {/* <Box
        sx={{
          transform: "rotate(90deg)", // Rotate the progress bar to make it vertical
          display: "inline-block",
          height: "100%",
        }}
      >
        <BorderLinearProgress variant="determinate" value={50} />
      </Box> */}
      {isOpen ? (
        <VerticalProgressBar value={progress} />
      ) : (
        <VerticalProgressBar value={0} />
      )}

      <Stack
        direction={"column"}
        sx={{
          py: "5px",
          px: "15px",
          // mb: "3%",
          // borderLeftWidth: "4px",
          // borderLeftStyle: "solid",
          // borderImageSource: isOpen
          //   ? "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)"
          //   : "#D9D9D9",
          // borderImageSlice: 1,
        }}
      >
        <Stack
          direction={"row"}
          gap={1}
          sx={{ cursor: "pointer" }}
          onClick={onToggle}
        >
          {title1 !== "" ? (
            <Typography
              variant="display-xs-bold"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.color.gray[745],
              }}
              onClick={onToggle}
            >
              {title1}
            </Typography>
          ) : (
            <></>
          )}

          <Typography
            variant="display-xs-bold"
            sx={{
              fontFamily: "Product Sans, sans-serif",
              color: palette.color.gray[745],
              background: isOpen
                ? "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)"
                : palette.color.gray[745],
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
            onClick={onToggle}
          >
            {title2}
          </Typography>
        </Stack>
        <div
          style={{
            maxHeight: isOpen ? "100px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          <Typography
            variant="text-xl1-1-regular"
            sx={{
              fontFamily: "Product Sans, sans-serif",
              color: palette.color.gray[745],
            }}
          >
            {desc}
          </Typography>
        </div>
      </Stack>
    </Stack>
  );
};

export default ExpandableText;
