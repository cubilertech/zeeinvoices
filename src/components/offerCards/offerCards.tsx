"use client";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Icon } from "../Icon";
import { FC, useState } from "react";
import { IconTypes } from "@/types/icons";
import { palette } from "@/theme/palette";

interface Props {
  icon: IconTypes; // Corrected prop name from ixon to icon
  whiteIcon: IconTypes; // Corrected prop name from ixon to icon
  title: string;
  description: string;
}

const OfferCard: FC<Props> = ({ icon, whiteIcon, title, description }) => {
  const [isHover, setIsHover] = useState(false);

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
        transition: "all 0.7s ease", // Add transition for smooth animation
        "&:hover": {
          color: palette.base.white,
          backgroundColor: palette.text.contactEmailColor,
          transform: "scale(1.03)", // Scale the component up by 10% on hover
          "& .buttom-right-card": {
            backgroundColor: `${palette.base.white} !important`,
          },
        },
        "&:hover .desc": {
          color: palette.base.white, // Change the color of the other Typography on hover
        },
      }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      {isHover ? (
        <Icon
          icon={whiteIcon}
          width={isModile ? 42 : 62}
          height={isModile ? 42 : 62}
        />
      ) : (
        <Icon
          icon={icon}
          width={isModile ? 42 : 62}
          height={isModile ? 42 : 62}
        />
      )}{" "}
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
          className="desc"
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
