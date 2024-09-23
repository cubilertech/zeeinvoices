import { Box, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { VerticalProgressBar } from "../VerticalProgressBar";
import { palette } from "@/theme/palette";

interface Section {
  heading: string;
  subheadings: string[];
}

interface ExpandableTextWithSubheadingsProps {
  title1?: string;
  title2?: string;
  desc?: string;
  isOpen: boolean;
  isOneTitle?: boolean;
  sections?: Section[]; // Add sections prop
  onToggle: () => void;
  onComplete: () => void;
}

const ExpandableTextWithSubheadings: FC<ExpandableTextWithSubheadingsProps> = ({
  title1,
  title2,
  desc,
  isOpen,
  isOneTitle,
  sections, // Accept sections prop
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
          py: "5px",
          px: { md: "15px", xs: "7px" },
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
                color: palette.text.expandableTextGreyColor,
                fontSize: { md: "24px !important", xs: "14px !important" },
                lineHeight: { md: "34px !important", xs: "18px !important" },
                fontWeight: 700,
              }}
            >
              {title1}{" "}
              <Box
                component="span"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  fontSize: { md: "24px !important", xs: "14px !important" },
                  lineHeight: { md: "34px !important", xs: "18px !important" },
                  fontWeight: { md: 700 },
                  background: isOpen
                    ? "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)"
                    : palette.text.expandableTextGreyColor,
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
                fontSize: { md: "24px !important", xs: "14px !important" },
                lineHeight: { md: "34px !important", xs: "18px !important" },
              }}
            >
              {title2}
            </Typography>
          )}
        </Stack>

        <div
          style={{
            maxHeight: isOpen ? "1000px" : "0px", // Increase maxHeight for full content
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          <Typography
            variant="text-xl1-1-regular"
            sx={{
              fontFamily: "Product Sans, sans-serif",
              color: palette.text.expandableTextGreyColor,
              fontSize: { md: "20px", xs: "12px" },
              lineHeight: { md: "34px", xs: "18px" },
              fontWeight: { md: 400 },
            }}
          >
            {desc}
          </Typography>

          {/* Render sections and subheadings */}
          {sections?.map((section, sectionIndex) => (
            <Box key={sectionIndex} sx={{ mt: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.text.expandableTextGreyColor,
                  fontSize: { md: "18px", xs: "14px" },
                  lineHeight: { md: "24px", xs: "20px" },
                  fontWeight: 700,
                }}
              >
                {section.heading}
              </Typography>
              <Box sx={{ pl: 2 }}>
                {section.subheadings.map((subheading, subheadingIndex) => (
                  <Typography
                    key={subheadingIndex}
                    variant="body1"
                    sx={{
                      fontFamily: "Product Sans, sans-serif",
                      color: palette.text.expandableTextGreyColor,
                      fontSize: { md: "16px", xs: "12px" },
                      lineHeight: { md: "22px", xs: "18px" },
                      fontWeight: 400,
                    }}
                  >
                    {subheading}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
        </div>
      </Stack>
    </Stack>
  );
};

export default ExpandableTextWithSubheadings;
