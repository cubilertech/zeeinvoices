"use client";
import { Box, ButtonBase, Rating, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import ShareIcon from "@mui/icons-material/Share";

import { palette } from "@/theme/palette";

interface BlogCard {
  onTitleClick: () => void;
  imageSrc: string;
  category: string;
  readingTime: string;
  title: string;
  description: string;
  author: string;
  postedOn: string;
  rating: number;
  onShareClick: () => void;
}
const BlogCard: FC<BlogCard> = ({
  onTitleClick,
  imageSrc,
  category,
  readingTime,
  title,
  description,
  author,
  postedOn,
  rating,
  onShareClick,
}) => {
  return (
    <>
      <Box
        sx={{
          border: `1px solid ${palette.color.gray[5]}`,
          boxShadow: palette.boxShadows.shadowxs,
          borderRadius: "12px",
          alignSelf: "center",
          width: { sm: "100%", xs: "100%" },
          height: { sm: "auto", xs: "auto" },
          backgroundColor: palette.base.white,
        }}
      >
        <Box
          sx={{
            height: "156px",
            width: "100%",
            overflow: "hidden",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            // backgroundImage: `url(${imageSrc})`,
            background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contained",
          }}
        ></Box>

        <Stack // for content
          direction={{ sm: "column", xs: "column" }}
          gap={2}
          sx={{
            p: "16px",
            width: "100%",
            minHeight: "70px",
          }}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box
              sx={{
                width: "180px",
                py: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20px",
                border: `1px solid ${palette.color.gray[5]}`,
                boxShadow: palette.boxShadows.shadowxs,
              }}
            >
              <Typography variant="text-sm-regular">{category}</Typography>
            </Box>
            <Typography
              variant="text-sm-regular"
              sx={{
                color: palette.color.gray[610],
              }}
            >
              {readingTime}
            </Typography>
          </Stack>
          <Typography
            variant="display-sm-semibold"
            sx={{
              color: palette.color.gray[900],
              overflow: "hidden",
              wordBreak: "break-word",
              cursor: "pointer",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="text-md-regular"
            sx={{
              color: palette.color.gray[610],
              overflow: "hidden",
              wordBreak: "break-word",
            }}
          >
            {description}
          </Typography>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ width: "100%" }}
          >
            <Stack direction={"row"} gap={5} sx={{}}>
              <Typography
                variant="text-sm-regular"
                sx={{
                  color: palette.color.gray[900],
                }}
              >
                Author: {author}
              </Typography>
              <Typography
                variant="text-sm-regular"
                sx={{
                  color: palette.color.gray[900],
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

            <ButtonBase
              sx={{
                width: "120px",
                py: "4px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                fontSize: "14px",
                backgroundColor: palette.color.gray[20],
              }}
            >
              <ShareIcon sx={{ width: "15px", color: palette.primary.main }} />
              Share
            </ButtonBase>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default BlogCard;
