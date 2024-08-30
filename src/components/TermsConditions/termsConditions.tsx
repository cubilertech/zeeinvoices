"use client";
import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

import { palette } from "@/theme/palette";

interface InvoiceSectionProps {
  num?: string;
  title?: string;
  description?: string;
}
const InvoiceSection: FC<InvoiceSectionProps> = ({
  num,
  title,
  description,
}) => {
  return (
    <Stack direction={"column"} gap={1}>
      <Typography
        variant="display-sm1-medium"
        sx={{ color: palette.text.termsHeadingColor }}
      >
        {title}
      </Typography>
      <Typography
        variant="text-xl-regular"
        sx={{ color: palette.text.termsdescColor }}
      >
        {description}
      </Typography>
    </Stack>
  );
};

export default InvoiceSection;
