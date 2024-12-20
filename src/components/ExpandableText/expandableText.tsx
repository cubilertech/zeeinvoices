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
import { palette } from "@/theme/palette";

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
  isOneTitle?: boolean;
  onToggle: () => void;
  onComplete: () => void;
}

const ExpandableText: FC<ExpandableTextProps> = ({
  title1,
  title2,
  desc,
  isOpen,
  isOneTitle,
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
    <Stack direction={"row"} sx={{ height: "fit-content" }}>
      <Box>
        {isOpen ? (
          <VerticalProgressBar value={progress} />
        ) : (
          <VerticalProgressBar value={0} />
        )}
      </Box>
      <Stack
        direction={"column"}
        sx={{
          py: "0px",
          pl: { md: "15px", xs: "7px" },
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
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: isOpen
                  ? palette.color.gray[900]
                  : palette.color.gray[610],
                fontSize: { md: "24px !important", xs: "18px !important" },
                lineHeight: { md: "34px !important", xs: "26px !important" },
                fontWeight: 700,
              }}
            >
              {title1}{" "}
              <Box
                component="span"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  fontSize: { md: "24px !important", xs: "18px !important" },
                  lineHeight: { md: "34px !important", xs: "26px !important" },
                  fontWeight: { md: 700 },
                  background: isOpen
                    ? "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)"
                    : palette.color.gray[610],
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                {title2}
              </Box>
            </Typography>
          )}

          {isOneTitle && (
            <Typography
              variant="display-xs-bold"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                background: isOpen
                  ? "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)"
                  : palette.text.expandableTextGreyColor,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                fontSize: { md: "24px !important", xs: "18px !important" },
                lineHeight: { md: "34px !important", xs: "26px !important" },
              }}
            >
              {title2}
            </Typography>
          )}
        </Stack>
        <div
          style={{
            maxHeight: isOpen ? "fit-content" : "0px",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          <Typography
            variant="text-xl1-1-regular"
            sx={{
              fontFamily: "Product Sans, sans-serif",
              color: palette.color.gray[610],
              fontSize: { md: "20px", xs: "14px" },
              lineHeight: { md: "30px", xs: "20px" },
              fontWeight: { md: 400 },
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
