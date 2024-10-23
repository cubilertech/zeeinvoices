import { palette } from "@/theme/palette";
import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";
import { icons } from "@/utils/constants";
import { IconTypes } from "@/types/icons";

interface ContactInfoCard {
  title?: string;
  desc?: string;
  icon: IconTypes;
}

const ContactInfoCard: FC<ContactInfoCard> = ({ title, desc, icon }) => {
  const iconPath = icons[icon];
  return (
    <Stack
      direction={"column"}
      gap={2}
      sx={{
        p: "24px",
        borderRadius: "8px",
        backgroundColor: palette.base.contactInfoBgColor,
        border: `1px solid ${palette.border.contactInfoBorderColor}`,
      }}
    >
      <Stack direction={"row"} gap={1}>
        <Box
          sx={{
            mt: "1px",
            width: "24px",
            height: "24px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Icon icon={icon} width={24} height={24} />
        </Box>
        <Typography
          variant="display-sm2-medium"
          sx={{ color: palette.text.termsHeadingColor }}
        >
          {title}
        </Typography>
      </Stack>
      <Stack direction={"column"} gap={2} sx={{ width: "307px" }}>
        <Typography
          variant="text-xl1-regular"
          sx={{ color: palette.text.contactInfoDescColor }}
        >
          {desc}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ContactInfoCard;
