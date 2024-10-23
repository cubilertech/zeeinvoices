"use client";
import { Box, Stack, Typography } from "@mui/material";
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
const ShowDetails: FC<ShowDetails> = ({
  title,
  companyName,
  name,
  address,
  state,
  email,
  phone,
}) => {
  return (
    <Box
      borderRadius={1}
      sx={{
        width: "100%",
        marginTop: 2,
        py: 1,
        px: 3,
        borderRadius: 2,
        border: `1px solid ${palette.color.gray[200]}`,
      }}
    >
      <Typography
        variant="text-sm-medium"
        sx={{
          color: palette.color.gray[510],
          fontSize: "12px",
          lineHeight: "15px",
          fontWeight: 400,
        }}
      >
        {title}
      </Typography>
      <Stack spacing={1.5} sx={{ marginTop: 1 }}>
        <Typography
          variant="text-xs-bold"
          sx={{
            color: palette.color.gray[900],
            fontSize: "14px",
            lineHeight: "17px",
            fontWeight: 600,
          }}
        >
          {companyName}
        </Typography>
        <Stack direction={"column"}>
          <Typography
            variant="text-xs-bold"
            sx={{
              color: palette.color.gray[610],
              fontSize: "12px",
              lineHeight: "15px",
              fontWeight: 500,
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="text-xs-regular"
            sx={{
              color: palette.color.gray[610],
              fontSize: "12px",
              lineHeight: "15px",
              fontWeight: 400,
            }}
          >
            {address}
          </Typography>
          <Typography
            variant="text-xs-regular"
            sx={{
              color: palette.color.gray[610],
              fontSize: "12px",
              lineHeight: "15px",
              fontWeight: 400,
            }}
          >
            {state}
          </Typography>
        </Stack>
        <Stack direction={"column"}>
          <Typography
            variant="text-xs-regular"
            sx={{
              color: palette.color.gray[610],
              fontSize: "12px",
              lineHeight: "15px",
              fontWeight: 400,
            }}
          >
            {email}
          </Typography>
          <Typography
            variant="text-xs-regular"
            sx={{
              color: palette.color.gray[610],
              fontSize: "12px",
              lineHeight: "15px",
              fontWeight: 400,
            }}
          >
            {phone}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ShowDetails;
