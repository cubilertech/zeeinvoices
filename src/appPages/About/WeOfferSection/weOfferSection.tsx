"use client";
import { OfferCard } from "@/components/offerCards";
import { palette } from "@/theme/palette";
import { IconTypes } from "@/types/icons";
import { weOfferData } from "@/utils/data";
import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";

const WeOfferSection = () => {
  const isModile = useMediaQuery("(max-width: 600px)");

  const [isAnyBoxHovered, setIsAnyBoxHovered] = useState(false);

  const handleHoverChange = (isHovering: boolean) => {
    setIsAnyBoxHovered(isHovering);
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ py: { sm: 7, xs: 4 }, px: { md: "0.1%", lg: "0.1%", xs: "0%" } }}
      >
        <Box textAlign={"center"}>
          <Typography
            variant={isModile ? "display-sm2-bold" : "display-lg-bold"}
            color={palette.color.gray[805]}
            mb={{ sm: 3, xs: 1 }}
            component={"p"}
            sx={{fontFamily: "Product Sans,sans-serif"}}
          >
            What We{" "}
            <span style={{ color: palette.text.contactEmailColor }}>Offer</span>
          </Typography>
          <Typography
            component={"p"}
            variant={isModile ? "text-lg-regular" : "text-xl1-regular"}
            color={palette.color.gray[745]}
            sx={{fontFamily: "Product Sans,sans-serif"}}
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
                anyBoxHovered={isAnyBoxHovered} // Pass if any box is hovered
                onHoverChange={
                  index !== weOfferData.length - 1
                    ? handleHoverChange
                    : () => {}
                } // Only track hover for non-last boxes
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default WeOfferSection;
