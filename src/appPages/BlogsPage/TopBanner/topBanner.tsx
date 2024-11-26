"use client";
import { palette } from "@/theme/palette";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import "@/Styles/sectionStyle.css";

const TopBanner = () => {
  const isModile = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <Box
        sx={{
          width: "100%",
          background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
          // backgroundColor: "#8F8BE4",
        }}
      >
        <Container
          className="mainContainer"
          sx={{
            py: { sm: 12, xs: 8 },
            textAlign: "center",
          }}
        >
          <Typography
            variant={isModile ? "display-sm2-bold" : "display-lg-bold"}
            component={"p"}
            sx={{
              mb: 2,
              color: palette.base.white,
              fontFamily: "Product Sans, sans-serif",
              fontSize: { md: "48px", xs: "26px" },
              lineHeight: { md: "64px", xs: "32px" },
              fontWeight: { xs: 700 },
            }}
          >
            Blogs
          </Typography>
          <Typography
            variant={isModile ? "text-sm-regular" : "text-xl-regular"}
            component={"p"}
            sx={{
              mb: 3,
              color: palette.base.white,
              fontFamily: "Product Sans, sans-serif",
              fontSize: { md: "20px", xs: "14px" },
              lineHeight: { md: "30px", xs: "20px" },
              fontWeight: { xs: 400 },
            }}
          >
            Welcome to ZeeInvoices! We make invoicing simple, quick, and
            completely free. Discover insightful and engaging blog articles
            across various topics, crafted by experts and curated for you.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default TopBanner;
