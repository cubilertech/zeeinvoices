"use client";
import { palette } from "@/theme/palette";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";

const GradientBox = styled(Box)({
  position: "relative",
  width: "100%",
  paddingY: 9,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "conic-gradient(from 180.47deg at 117.4% 50%, #3F4DE1 -72.9deg, #DEDBFA 87.9deg, #3F4DE1 287.1deg, #DEDBFA 447.9deg)",
    opacity: 0.2,
    zIndex: 0,
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
});

const HelpBusinessSection = () => {
  return (
    <GradientBox>
      <Box
        sx={{
          width: "100%",
          py: 9,
          // background:
          //   "conic-gradient(from 180.47deg at 117.4% 50%, #3F4DE1 -72.9deg, #DEDBFA 87.9deg, #3F4DE1 287.1deg, #DEDBFA 447.9deg)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction={"row"}
          gap={8}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {/* left features section */}
          <Box sx={{}}>
            <Image
              src="/Images/help-business-image.svg"
              width={551}
              height={504}
              alt="rectangle iaptop bg"
            />
          </Box>
          {/* right features section */}
          <Stack direction={"column"} gap={3} sx={{ width: "540px" }}>
            <Typography variant="display-lg-bold">
              How Software Invoicing can help small business
            </Typography>
            <Typography
              variant="text-md-regular"
              sx={{ width: "400px", color: palette.color.gray[770] }}
            >
              Lorem ipsum is a placeholder text commonly used to demonstrate the
              visual form of a document or a typeface without relying on
              meaningful content.
            </Typography>
            <Typography
              variant="text-md-regular"
              sx={{ width: "400px", color: palette.color.gray[770] }}
            >
              Lorem ipsum is a placeholder text commonly used to demonstrate the
              visual form of a document or a typeface without relying on
              meaningful content.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ width: "241px", height: "64px", py: "20px", px: "30px" }}
            >
              Generate Invoice
            </Button>
          </Stack>
        </Stack>
      </Box>
    </GradientBox>
  );
};
export default HelpBusinessSection;
