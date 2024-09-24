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
        width: 390,
        // height: 176,
        marginTop: 2,
        py: 1,
        px: 3,
        borderRadius: 2,
        border: `1px solid #EEEEEE`,
      }}
    >
      <Typography variant="text-sm-medium" color={palette.color.gray[760]}>
        {title}
      </Typography>
      <Stack spacing={1.5} sx={{ marginTop: 1 }}>
        <Typography variant="text-xs-bold">{companyName}</Typography>
        {/* <Box sx={{height:"1px"}}></Box> */}
        <Stack direction={"column"}>
          <Typography variant="text-xs-bold" color={palette.color.gray[720]}>
            {name}
          </Typography>
          <Typography variant="text-xs-regular" color={palette.color.gray[720]}>
            {address}
          </Typography>
          <Typography variant="text-xs-regular" color={palette.color.gray[720]}>
            {state}
          </Typography>
        </Stack>
        <Stack direction={"column"}>
          <Typography variant="text-xs-regular" color={palette.color.gray[720]}>
            {email}
          </Typography>
          <Typography variant="text-xs-regular" color={palette.color.gray[720]}>
            {phone}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ShowDetails;
