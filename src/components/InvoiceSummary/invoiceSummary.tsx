"use client";

import { palette } from "@/theme/palette";
import { Box, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

import { FC } from "react";

const InvoiceSummary: FC = () => {
  return (
    <Stack
      direction={"column"}
      sx={{
        borderRadius: 1,
        width: "240px",
        height: "176px",
        border: `1px solid ${palette.borderColor.borderColor}`,
      }}
    >
      {/* summary head */}
      <Box
        sx={{
          width: "239px",
          height: "30px",
          borderRadius: "3px 3px 0px 0px",
          backgroundColor: palette.itemsHeadColor.itemsHeadColor,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography sx={{ color: palette.base.white }}>
          Invoice Summary
        </Typography>
      </Box>

      {/* summary content */}

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ padding: "20px 10px 0px 10px" }}
      >
        <Typography sx={{ color: palette.textGreyColor.textGreyColor }}>Subtotal</Typography>
        <Typography sx={{ color: palette.base.black }}>USD 100.00</Typography>
      </Stack>
      <hr style={{ margin: "10px" }}></hr>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ padding: "5px 10px 0px 10px" }}
      >
        <Typography sx={{ color: palette.textGreyColor.textGreyColor }}>Tax</Typography>
        <Typography sx={{ color: palette.base.black }}>--</Typography>
      </Stack>
      <hr style={{ margin: "10px" }}></hr>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ padding: "5px 10px 0px 10px" }}
      >
        <Typography sx={{ color: palette.textGreyColor.textGreyColor }}>Total</Typography>
        <Typography sx={{ color: palette.base.black }}>USD 350.00</Typography>
      </Stack>
    </Stack>
  );
};

export default InvoiceSummary;
