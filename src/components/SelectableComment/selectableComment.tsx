import { palette } from "@/theme/palette";
import {
  Avatar,
  Box,
  IconButton,
  LinearProgress,
  linearProgressClasses,
  Rating,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { VerticalProgressBar } from "../VerticalProgressBar";
import { HorizontalProgressBar } from "../HorizontalProgressBar";

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

interface SelectableCommentProps {
  openIndex: number;
  title1?: string;
  title2?: string;
  desc?: string;
  imgSrc?: string;
  isOpen: boolean;
  commentTextData?: any;
  onToggle: () => void;
  onComplete: () => void;
}

const SelectableComment: FC<SelectableCommentProps> = ({
  openIndex,
  title1,
  title2,
  desc,
  imgSrc,
  isOpen,
  commentTextData,
  onToggle,
  onComplete,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
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
    <Stack direction={"column"}>
      <Stack direction={"column"}>
        <Stack
          direction={"column-reverse"}
          gap={0.5}
          sx={{
            opacity: isOpen ? 1 : 0.6,
            width: "100%",
            cursor: "pointer",
          }}
          onClick={onToggle}
        >
          {isOpen ? <HorizontalProgressBar value={progress} /> : ""}

          <Stack
            direction={"row"}
            gap={2}
            sx={{
              width: "100%",
              py: "10px",
              pl: "10px",
              pr: "52px",
              borderRadius: "8px",
              border: `1px solid #0000001A`,
            }}
            onClick={handleClick}
          >
            <Avatar
              sx={{ width: 61, height: 61 }}
              alt="Cindy Baker"
              src={imgSrc}
            />
            <Stack direction={"column"}>
              <Stack direction={"row"} gap={1}>
                <Typography
                  variant="display-xs1-bold"
                  sx={{
                    fontFamily: "Product Sans, sans-serif",
                    color: palette.color.gray[745],
                  }}
                >
                  {title1}
                </Typography>
                <Typography
                  variant="display-xs1-bold"
                  sx={{
                    fontFamily: "Product Sans, sans-serif",
                    color: palette.color.gray[745],
                    background:
                      "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }}
                >
                  {title2}
                </Typography>
              </Stack>
              <Typography
                variant="text-xl-regular"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.color.gray[745],
                }}
              >
                {desc}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {isMobile && isOpen && (
        <Stack
          direction={"column"}
          gap={1}
          sx={{
            opacity: isOpen ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <Typography
            variant="display-md1-medium"
            sx={{
              textAlign: "center",
              fontFamily: "Product Sans, sans-serif",
              color: palette.base.black,
              fontSize: { md: "28px", xs: "14px" },
              lineHeight: { md: "32px", xs: "32px" },
              fontWeight: { md: 400 },
            }}
          >
            {commentTextData[openIndex].title1}
          </Typography>
          <Rating
            name="half-rating-read"
            defaultValue={commentTextData[openIndex].rating}
            precision={0.5}
            size="small"
            readOnly
            sx={{
              width: "100%",
              color: "#FCC214",
              display: "flex",
              justifyContent: "center",
            }}
          />
          <Typography
            variant="text-xl-regular"
            sx={{
              width: { md: "560px", xs: "335px" },
              textAlign: "center",
              fontFamily: "Product Sans, sans-serif",
              color: palette.color.gray[745],
              fontSize: { md: "20px", xs: "12px" },
              lineHeight: { md: "24px", xs: "18px" },
              fontWeight: { md: 400 },
            }}
          >
            {commentTextData[openIndex].desc1}
          </Typography>
          <Typography
            variant="text-xl-regular"
            sx={{
              width: { md: "560px", xs: "335px" },
              textAlign: "center",
              fontFamily: "Product Sans, sans-serif",
              color: palette.color.gray[745],
              fontSize: { md: "20px", xs: "12px" },
              lineHeight: { md: "24px", xs: "18px" },
              fontWeight: { md: 400 },
            }}
          >
            {commentTextData[openIndex].desc2}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default SelectableComment;
