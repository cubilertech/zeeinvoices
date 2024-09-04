import {
  Box,
  LinearProgress,
  linearProgressClasses,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { VerticalProgressBar } from "../VerticalProgressBar";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 4,
  width: 100,
  borderRadius: 100,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
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
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!isOpen || isClicked) return;

    setProgress(1);

    const duration = 5000;
    const increment = 100 / (duration / 100);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return prev + increment;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, onComplete, isClicked]);

  const handleClick = () => {
    setIsClicked(true);
    setProgress(100);
    onToggle();
  };

  return (
    <Stack direction={"row"}>
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
        }}
      >
        <Stack
          direction={"row"}
          gap={1}
          sx={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          {title1 && (
            <Typography
              variant="display-xs-bold"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: "#745",
              }}
            >
              {title1}
            </Typography>
          )}
          <Typography
            variant="display-xs-bold"
            sx={{
              fontFamily: "Product Sans, sans-serif",
              background: isOpen
                ? "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)"
                : "#745",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
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
              color: "#745",
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
