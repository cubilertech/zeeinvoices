"use client";
import {
  Box,
  Button,
  grid2Classes,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";
import { grey } from "@mui/material/colors";
import { palette } from "@/theme/palette";
import { icons } from "@/utils/constants";
import { InvoiceDatePicker } from "../InvoiceDatePicker";

interface DetailSelecter {
  title?: string;
  detailsOf: string;
  addDetailsOf: string;
}
const DetailSelecter: FC<DetailSelecter> = ({
  title,
  detailsOf,
  addDetailsOf,
}) => {
  return (
    <Box
      borderRadius={1}
      sx={{
        width: 316,
        height: 242,
        // border:`1px solid ${palette.borderColor.borderColor}`,
      }}
    >
      {title && (
        <Typography variant="body1" color={palette.color.gray[100]}>
          {title}
        </Typography>
      )}
      <Box
        borderRadius={1}
        sx={{
          width: 316,
          height: 242,
          marginTop: 1.5,
          padding: 2,
          borderRadius: 2,
          cursor: "pointer",
          border: `1px solid ${palette.borderColor.borderColor}`,
        }}
      >
        <Typography variant="body1" color={palette.color.gray[750]}>
          {detailsOf}
        </Typography>
        <Stack
          direction={"column"}
          spacing={1.5}
          sx={{
            height: "90%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Icon icon="addCircle" height={32} width={32}></Icon>
          <Typography variant="caption" color={palette.color.gray[750]}>
            {addDetailsOf}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default DetailSelecter;
