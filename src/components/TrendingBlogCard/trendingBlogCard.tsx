"use client";
import { Box, Rating, Stack, Typography } from "@mui/material";
import React, { FC } from "react";

import { palette } from "@/theme/palette";

interface TrendingBlogCard {
  onClick: () => void;
  title: string;
  postedOn: string;
  rating: number;
}
const TrendingBlogCard: FC<TrendingBlogCard> = ({
  onClick,
  title,
  postedOn,
  rating,
}) => {
  return (
    <>
      <Stack
        direction={"column"}
        gap={2}
        sx={{
          border: `1px solid ${palette.color.gray[5]}`,
          boxShadow: palette.boxShadows.shadowxs,
          borderRadius: "12px",
          width: { sm: "100%", xs: "100%" },
          height: { sm: "auto", xs: "auto" },
          backgroundColor: palette.base.white,
          p: "16px",
          cursor: "pointer",
        }}
      >
        <Typography
          variant="text-sm-regular"
          sx={{
            color: palette.color.gray[900],
          }}
        >
          {title}
        </Typography>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography
            variant="text-xs-regular"
            sx={{
              color: palette.color.gray[610],
            }}
          >
            Posted on: {postedOn}
          </Typography>
          <Rating
            name="half-rating-read"
            size="small"
            defaultValue={2.5}
            precision={rating}
            readOnly
          />
        </Stack>
      </Stack>
    </>
  );
};

export default TrendingBlogCard;
