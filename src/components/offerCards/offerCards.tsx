// "use client";
// import { Box, Typography, useMediaQuery } from "@mui/material";
// import { Icon } from "../Icon";
// import { FC, useState } from "react";
// import { IconTypes } from "@/types/icons";
// import { palette } from "@/theme/palette";

// interface Props {
//   icon: IconTypes; // Corrected prop name from ixon to icon
//   whiteIcon: IconTypes; // Corrected prop name from ixon to icon
//   title: string;
//   description: string;
//   isLastColor?: boolean;
// }

// const OfferCard: FC<Props> = ({
//   icon,
//   whiteIcon,
//   title,
//   description,
//   isLastColor,
// }) => {
//   const [isHover, setIsHover] = useState(false);

//   const isModile = useMediaQuery("(max-width: 600px)");
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         p: "25.42px 40px",
//         display: "flex",
//         gap: 3,
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: { sm: "337px", xs: "237px" },
//         border: "1.06px solid #0000001A",
//         borderRadius: "30px",
//         color: isLastColor ? palette.base.white : palette.base.black,
//         backgroundColor: isLastColor
//           ? palette.text.contactEmailColor
//           : palette.base.white,
//         transition: "all 0.7s ease", // Add transition for smooth animation
//         "&:hover": {
//           color: palette.base.white,
//           backgroundColor: palette.text.contactEmailColor,
//           transform: "scale(1.03)", // Scale the component up by 10% on hover
//           "& .buttom-right-card": {
//             backgroundColor: `${palette.base.white} !important`,
//           },
//         },
//         "&:hover .desc": {
//           color: palette.base.white, // Change the color of the other Typography on hover
//         },
//       }}
//       onMouseEnter={() => {
//         setIsHover(true);
//       }}
//       onMouseLeave={() => {
//         setIsHover(false);
//       }}
//     >
//       {isHover || isLastColor ? (
//         <Icon
//           icon={whiteIcon}
//           width={isModile ? 42 : 62}
//           height={isModile ? 42 : 62}
//         />
//       ) : (
//         <Icon
//           icon={icon}
//           width={isModile ? 42 : 62}
//           height={isModile ? 42 : 62}
//         />
//       )}{" "}
//       {/* Pass the icon prop */}
//       <Box sx={{ textAlign: "center" }}>
//         <Typography
//           variant={isModile ? "text-sm-bold" : "text-lg-bold"}
//           component={"p"}
//           mb={1}
//         >
//           {title}
//         </Typography>
//         <Typography
//           className="desc"
//           variant={isModile ? "text-xs-regular" : "text-md-regular"}
//           component={"p"}
//           color={
//             isLastColor
//               ? palette.base.white
//               : palette.text.expandableTextGreyColor
//           }
//         >
//           {description}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default OfferCard;

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
  anyBoxHovered: boolean; // Prop to track if any box is hovered
  onHoverChange: (isHovering: boolean) => void; // Callback to notify parent about hover
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
    onHoverChange(true); // Notify parent that a box is being hovered
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    onHoverChange(false); // Notify parent that no box is being hovered
  };

  const lastBoxBackgroundColor = isHover
    ? palette.text.contactEmailColor // Keep the last box purple when hovered
    : anyBoxHovered
    ? palette.base.white // Turn last box white when any other box is hovered
    : palette.text.contactEmailColor; // Keep the last box purple initially

  const lastBoxTextColor = isHover || !anyBoxHovered
    ? palette.base.white // Keep the text white when the last box is hovered or no other box is hovered
    : palette.base.black; // Turn text black when any other box is hovered

    const lastBoxTextDescColor = isHover || !anyBoxHovered
    ? palette.base.white // Keep the text white when the last box is hovered or no other box is hovered
    : palette.text.expandableTextGreyColor; // Turn text black when any other box is hovered

  const lastBoxIcon = isHover || !anyBoxHovered
    ? whiteIcon // Keep white icon when last box is hovered or no other box is hovered
    : icon; // Change icon to purple when any other box is hovered

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
        color: isLastColor ? lastBoxTextColor : palette.base.black,
        backgroundColor: isLastColor ? lastBoxBackgroundColor : palette.base.white,
        transition: "all 0.7s ease",
        transform: isLastColor && isHover ? "scale(1.1)" : "none", // Expand the last box on hover
        "&:hover": {
          color: isLastColor ? palette.base.white : palette.base.white,
          backgroundColor: isLastColor
            ? palette.text.contactEmailColor // Keep last box purple on hover
            : palette.text.contactEmailColor, // Change other boxes to purple on hover
          transform: isLastColor ? "scale(1.03)" : "scale(1.03)", // Disable scaling for other boxes
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
        icon={isHover ? whiteIcon : isLastColor ? lastBoxIcon : icon} // Icon should turn white on hover for all boxes
        width={isMobile ? 42 : 52}
        height={isMobile ? 42 : 52}
      />
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant={isMobile ? "text-md-bold" : "text-lg-bold"}
          component={"p"}
          mb={1}
          sx={{fontFamily: "Product Sans,sans-serif"}}
        >
          {title}
        </Typography>
        <Typography
          className="desc"
          variant={isMobile ? "text-xs-regular" : "text-md-regular"}
          component={"p"}
          sx={{fontFamily: "Product Sans,sans-serif"}}
          color={
            isLastColor
              ? lastBoxTextDescColor
              : palette.text.expandableTextGreyColor
          }
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default OfferCard;
