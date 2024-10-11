"use client";
import { palette } from "@/theme/palette";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface ProfileDetailsCard {
  label?: string;
  description?: string;
}
const ProfileDetailsCard: FC<ProfileDetailsCard> = ({
  label,
  description,
  ...props
}) => {
  return (
    <Stack
      direction={"column"}
      gap={1}
      sx={{
        width: "100%",
        px: { sm: "16px", xs: "16px" },
        py: { sm: "16px", xs: "16px" },
        backgroundColor: palette.color.gray[50],
        border: `1px solid ${palette.color.gray[105]}`,
        boxShadow: palette.boxShadows.shadowxs,
        borderRadius: "4px",
      }}
    >
      <Typography
        variant="text-xl-semibold"
        sx={{
          color: palette.color.gray[510],
          fontSize: {
            md: "14px !important",
            xs: "14px !important",
          },
          lineHeight: {
            md: "20px !important",
            xs: "20px !important",
          },
          fontWeight: 400,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="text-xl-semibold"
        sx={{
          color: palette.color.gray[705],
          fontSize: {
            md: "14px !important",
            xs: "14px !important",
          },
          lineHeight: {
            md: "20px !important",
            xs: "20px !important",
          },
          fontWeight: 600,
        }}
      >
        {description ? description : "---"}
      </Typography>
    </Stack>
  );
};

export default ProfileDetailsCard;
