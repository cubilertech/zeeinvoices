"use client";
import { palette } from "@/theme/palette";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";

const HeroSection = () => {
  const isModile = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box
          sx={{
            display: "flex",
            gap: { sm: 14, xs: 6 },
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { sm: 3, xs: 1 },
              textAlign: "center",
            }}
          >
            <Typography
              variant={isModile ? "h4" : "display-3xl-bold"}
              sx={{ color: palette.base.black }}
            >
              About{" "}
              <span style={{ color: palette.text.contactEmailColor }}>Us</span>
            </Typography>

            <Typography
              variant={"display-xs1-regular"}
              textAlign={"center"}
              color={palette.color.gray[745]}
              sx={{
                fontSize: { sm: "24px !important", xs: "18px !important" },
                lineHeight: { sm: "29px !important", xs: "21px !important" },
              }}
            >
              Welcome to ZEE Invoices, where we simplify billing and invoicing,
              so you can focus on growing your business. Our platform
              streamlines the process, saving you time and effort.
            </Typography>
          </Box>
          <Box sx={{ width: "100%", m: "auto" }}>
            <Image
              width={1200}
              height={500}
              //   style={{width: "100%", height: '100%'}}
              src="/Images/about/heroSection-image.svg"
              alt="hero image"
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HeroSection;