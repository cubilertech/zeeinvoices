"use client";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { LinearProgressWithLabel } from "../LinearProgressWithLabel";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { palette } from "@/theme/palette";

interface PdfToast {
  lable?: string;
  type?: string;
  progress: number;
  isOpen: boolean;
  handleClose: () => void;
}
const PdfToast: FC<PdfToast> = ({
  lable,
  type = "single",
  progress,
  isOpen,
  handleClose,
}) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "312px" },
        p: "12px",
        backgroundColor: palette.base.white,
        position: "fixed",
        top: "86px",
        right: "16px",
        zIndex: 1000,
        boxShadow: 1,
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        transition: "transform 0.3s ease, opacity 0.3s ease",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        opacity: isOpen ? 1 : 0,
      }}
    >
      <Stack
        direction={"row"}
        gap={1.5}
        sx={{ width: "100%", alignItems: "center" }}
      >
        <PictureAsPdfIcon sx={{ width: "32px", color: "red" }} />
        <Stack direction={"column"} sx={{ width: "100%" }} gap={1}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ width: "100%" }}
          >
            <Stack>
              <Typography
                variant="text-sm-medium"
                sx={{ color: palette.color.gray[900] }}
              >
                {lable}
              </Typography>
              {progress == 100 && (
                <Typography
                  variant="text-sm-regular"
                  sx={{ color: palette.color.gray[610] }}
                >
                  Downloaded
                </Typography>
              )}
            </Stack>

            <IconButton
              sx={{ height: "20px !important", width: "20px !important" }}
              onClick={handleClose}
            >
              <ClearRoundedIcon sx={{ height: "15px", width: "15px" }} />
            </IconButton>
          </Stack>
          {type === "multi" && (
            <LinearProgressWithLabel
              value={progress}
              sx={{ height: "8px", borderRadius: "8px" }}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default PdfToast;
