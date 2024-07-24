"use client";
import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { palette } from "@/theme/palette";

interface ShowDetails {
  title?: string;
  companyName: string;
  name?: string;
  address: string;
  state: string;
  email: string;
  phone: string;
}
const ShowDetails: FC<ShowDetails> = ({ title, companyName, name, address, state, email, phone }) => {
  return (
    <Box
      borderRadius={1}
      sx={{
        width: 347,
        height: 176,
        marginTop: 2,
        py: 1,
        px: 3,
        borderRadius: 2,
        cursor: "pointer",
        border: `1px solid #EEEEEE`,
      }}
    >
      <Typography variant="text-sm-medium" color={palette.color.gray[760]}>
        {title}
      </Typography>
      <Stack spacing={1} sx={{ marginTop: 1 }}>
        <Typography variant="text-xs-bold">Company Name</Typography>
        <Stack direction={"column"}>
          <Typography variant="text-xs-regular" color={palette.color.gray[720]}>
            Name
          </Typography>
          <Typography variant="text-xs-regular" color={palette.color.gray[720]}>
            240 FF, Dha Phase 4, Lahore, 54792
          </Typography>
          <Typography variant="text-xs-regular" color={palette.color.gray[720]}>
            Pakistan
          </Typography>
        </Stack>
        <Stack direction={"column"}>
          <Typography variant="text-xs-regular" color={palette.color.gray[720]}>
            ather.raza28@gmail.com
          </Typography>
          <Typography variant="text-xs-regular" color={palette.color.gray[720]}>
            03215399275
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ShowDetails;
