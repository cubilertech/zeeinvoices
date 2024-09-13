"use client";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Icon } from "../Icon";
import { FC } from "react";
import { IconTypes } from "@/types/icons";
import { palette } from "@/theme/palette";

interface Props {
  icon: IconTypes; // Corrected prop name from ixon to icon
  title: string;
  description: string;
}

const OfferCard: FC<Props> = ({ icon, title, description }) => {
  const isModile = useMediaQuery("(max-width: 600px)");
  return (
    <Box
      sx={{
        width: "100%",
        p: "25.42px 40px",
        display: "flex",
        gap: 3,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: { sm: "337px", xs: "237px" },
        border: "1.06px solid #0000001A",
        borderRadius: "30px",
      }}
    >
      <Icon
        icon={icon}
        width={isModile ? 42 : 62}
        height={isModile ? 42 : 62}
      />{" "}
      {/* Pass the icon prop */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant={isModile ? "text-sm-bold" : "text-lg-bold"}
          component={"p"}
          mb={1}
        >
          {title}
        </Typography>
        <Typography
          variant={isModile ? "text-xs-regular" : "text-md-regular"}
          component={"p"}
          color={palette.text.expandableTextGreyColor}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default OfferCard;
