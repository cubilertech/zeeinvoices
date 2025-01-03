"use client";
import { palette } from "@/theme/palette";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import "@/Styles/sectionStyle.css";

const HeroSection = () => {
  const isModile = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <Container
        className="mainContainer"
        sx={{ py: 5, px: { md: "0.1%", lg: "0.1%", xs: "0%" } }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { sm: 10, xs: 6 },
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
              variant={isModile ? "display-md-bold" : "display-3xl-bold"}
              sx={{
                color: palette.text.contactEmailColor,
                background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "Product Sans,sans-serif",
              }}
              component={'h1'}
            >
              About{" "}
              <span
                style={{
                  background: `${palette.color.gray[900]}`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Us
              </span>
            </Typography>

            <Typography
              variant={"display-xs1-regular"}
              textAlign={"center"}
              color={palette.color.gray[610]}
              sx={{
                fontSize: { sm: "20px !important", xs: "18px !important" },
                lineHeight: { sm: "28px !important", xs: "28px !important" },
                fontWeight: 400,
                fontFamily: "Product Sans,sans-serif",
              }}
            >
              Welcome to ZeeInvoices, at ZeeInvoices, we make invoicing simple,
              quick, and completely free. Our platform is designed to streamline
              the billing process for businesses of all sizes, from freelancers
              to large enterprises. With ZeeInvoices, you can create
              professional, custom invoices that align with your brand in just
              minutes.
            </Typography>
          </Box>
          <Box sx={{ width: "100%", m: "auto" }}>
            <Image
              priority
              width={1200}
              height={500}
              src="/Images/about/about-hero-image.webp"
              alt="ZeeInvoices comprehensive dashboard for overviewing the billing process"              
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HeroSection;
