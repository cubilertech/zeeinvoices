"use client";
import { OfferCard } from "@/components/offerCards";
import { palette } from "@/theme/palette";
import { IconTypes } from "@/types/icons";
import { weOfferData } from "@/utils/data";
import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";

const WeOfferSection = () => {
  const isModile = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <Container maxWidth="lg" sx={{ py: { sm: 7, xs: 4 } }}>
        <Box textAlign={"center"}>
          <Typography
            variant={isModile ? "h5" : "display-lg-bold"}
            color={palette.color.gray[805]}
            mb={{ sm: 3, xs: 1 }}
            component={"p"}
          >
            What We{" "}
            <span style={{ color: palette.text.contactEmailColor }}>Offer</span>
          </Typography>
          <Typography
            component={"p"}
            variant={isModile ? "text-xs-regular" : "text-xl1-regular"}
            color={palette.color.gray[745]}
          >
            Less time invoicing, more time growing your business, Less time
            invoicing, more time growing your business.
          </Typography>
        </Box>

        <Grid container gap={2} p={2} mx="auto" mt={4}>
          {weOfferData.map((item,index) => (
            <Grid item sm={5.9} xs={12} key={index}>
              <OfferCard
                description={item.description}
                icon={item.icon as IconTypes}
                title={item.title}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default WeOfferSection;
