"use client";
import { OfferCard } from "@/components/offerCards";
import { palette } from "@/theme/palette";
import { IconTypes } from "@/types/icons";
import { weOfferData } from "@/utils/data";
import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import "@/Styles/sectionStyle.css";

const WeOfferSection = () => {
  const isModile = useMediaQuery("(max-width: 600px)");

  const [isAnyBoxHovered, setIsAnyBoxHovered] = useState(false);

  const handleHoverChange = (isHovering: boolean) => {
    setIsAnyBoxHovered(isHovering);
  };

  return (
    <>
      <Container
        className="mainContainer"
        sx={{ py: { sm: 7, xs: 8 }, px: { md: "0.1%", lg: "0.1%", xs: "0%" } }}
      >
        <Box textAlign={"center"}>
          <Typography
            variant={isModile ? "display-sm2-bold" : "display-lg-bold"}
            color={palette.color.gray[900]}
            mb={{ sm: 3, xs: 1 }}
            component={"p"}
            sx={{
              fontFamily: "Product Sans,sans-serif",
              fontSize: { md: "48px", xs: "26px" },
              lineHeight: { md: "64px", xs: "32px" },
              fontWeight: { xs: 700 },
            }}
          >
            What We{" "}
            <span
              style={{
                background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Offer
            </span>
          </Typography>
          <Typography
            component={"p"}
            variant={isModile ? "text-lg-regular" : "text-xl1-regular"}
            color={palette.color.gray[610]}
            sx={{
              fontFamily: "Product Sans,sans-serif",
              fontSize: { md: "20px", xs: "18px" },
              lineHeight: { md: "30px", xs: "28px" },
              fontWeight: { xs: 400 },
            }}
          >
            Here’s how ZeeInvoices makes your invoicing process simple and
            efficient
          </Typography>
        </Box>

        <Grid container gap={2} pt={2} mx="auto" mt={4}>
          {weOfferData.map((item, index) => (
            <Grid item sm={5.9} xs={12} key={index}>
              <OfferCard
                description={item.description}
                icon={item.icon as IconTypes}
                whiteIcon={item.whiteIcon as IconTypes}
                title={item.title}
                isLastColor={index == weOfferData.length - 1 ? true : false}
                anyBoxHovered={isAnyBoxHovered} 
                onHoverChange={
                  index !== weOfferData.length - 1
                    ? handleHoverChange
                    : () => {}
                }
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default WeOfferSection;
