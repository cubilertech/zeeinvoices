import { palette } from "@/theme/palette";
import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";
import Image from "next/image";
import { icons } from "@/utils/constants";
import { IconTypes } from "@/types/icons";

interface FeaturesCard {
  title?: string;
  desc?: string;
  icon: IconTypes;
}

const FeaturesCard: FC<FeaturesCard> = ({ title, desc, icon }) => {
  const iconPath = icons[icon];
  return (
    <Stack
      direction={"row"}
      gap={2}
      sx={{
        // width:"387px",
        py: "25px",
        px: "20px",
        boxShadow: palette.boxShadows[300],
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          width: "46px",
          height: "46px",
          backgroundColor: "#D9DBF9",
          borderRadius: 45,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          cursor: "pointer",
        }}
      >
        <Icon icon={icon} width={24} height={24} />
      </Box>
      <Stack direction={"column"} sx={{ width: "307px" }}>
        <Typography variant="text-xl-semibold">{title}</Typography>
        <Typography variant="text-md-regular">{desc}</Typography>
      </Stack>
    </Stack>
  );
};

export default FeaturesCard;
