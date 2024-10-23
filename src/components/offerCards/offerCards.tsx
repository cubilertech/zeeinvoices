

import { Box, Typography, useMediaQuery } from "@mui/material";
import { Icon } from "../Icon";
import { FC, useState } from "react";
import { IconTypes } from "@/types/icons";
import { palette } from "@/theme/palette";

interface Props {
  icon: IconTypes;
  whiteIcon: IconTypes;
  title: string;
  description: string;
  isLastColor?: boolean;
  anyBoxHovered: boolean; 
  onHoverChange: (isHovering: boolean) => void; 
}

const OfferCard: FC<Props> = ({
  icon,
  whiteIcon,
  title,
  description,
  isLastColor,
  anyBoxHovered,
  onHoverChange,
}) => {
  const [isHover, setIsHover] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleMouseEnter = () => {
    setIsHover(true);
    onHoverChange(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    onHoverChange(false);
  };

  const lastBoxBackgroundColor = isHover
    ? palette.text.contactEmailColor 
    : anyBoxHovered
    ? palette.base.white 
    : palette.text.contactEmailColor; 

  const lastBoxTextColor =
    isHover || !anyBoxHovered
      ? palette.base.white 
      : palette.color.gray[900]; 

  const lastBoxTextDescColor =
    isHover || !anyBoxHovered
      ? palette.base.white 
      : palette.color.gray[610]; 

  const lastBoxIcon =
    isHover || !anyBoxHovered
      ? whiteIcon 
      : icon;

  return (
    <Box
      sx={{
        width: "100%",
        p: "32px",
        display: "flex",
        gap: 3,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: { sm: "278px", xs: "198px" },
        border: "1.06px solid #0000001A",
        borderRadius: "16px",
        color: isLastColor ? lastBoxTextColor : palette.color.gray[900],
        backgroundColor: isLastColor
          ? lastBoxBackgroundColor
          : palette.base.white,
        transition: "all 0.5s ease",
        transform: isLastColor && isHover ? "scale(1.1)" : "none", 
        "&:hover": {
          color: isLastColor ? palette.base.white : palette.base.white,
          backgroundColor: isLastColor
            ? palette.primary.main 
            : palette.primary.main, 
          transform: isLastColor ? "scale(1.03)" : "scale(1.03)", 
          "& .buttom-right-card": {
            backgroundColor: isLastColor
              ? `${palette.text.contactEmailColor} !important`
              : `${palette.base.white} !important`,
          },
        },
        "&:hover .desc": {
          color: isLastColor ? palette.base.white : palette.base.white,
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon
        icon={isHover ? whiteIcon : isLastColor ? lastBoxIcon : icon} 
        width={isMobile ? 42 : 52}
        height={isMobile ? 42 : 52}
      />
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant={isMobile ? "text-md-bold" : "text-lg-bold"}
          component={"p"}
          mb={1}
          sx={{
            fontFamily: "Product Sans,sans-serif",
          }}
        >
          {title}
        </Typography>
        <Typography
          className="desc"
          variant={isMobile ? "text-xs-regular" : "text-md-regular"}
          component={"p"}
          sx={{ fontFamily: "Product Sans,sans-serif" }}
          color={isLastColor ? lastBoxTextDescColor : palette.color.gray[610]}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default OfferCard;
