"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";

const JoinUsSection = () => {
  const isModile = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <Box
        sx={{
          width: "100%",
          background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
        }}
      >
        <Container
          maxWidth="md"
          sx={{ py: { sm: 12, xs: 8 }, textAlign: "center" }}
        >
          <Typography
            variant={isModile ? "h5" : "display-lg-bold"}
            component={"p"}
            sx={{ mb: 2, color: palette.base.white }}
          >
            Join Us Today
          </Typography>
          <Typography
            variant={isModile ? "text-xs-regular" : "text-xl-regular"}
            component={"p"}
            sx={{ mb: 3, color: palette.base.white }}
          >
            Experience the ease and efficiency of ZEE Invoices. Whether you’re
            just starting or looking to upgrade your invoicing system, we’re
            here to help you every step of the way. Sign up today and take the
            first step toward more efficient invoicing.
          </Typography>

          <Button
            sx={{
              height: "35px !important",
              py: "0px !important",
              px: "20px !important",
              borderRadius: "4px !important",
              fontFamily: "Product Sans, sans-serif !important",
              fontSize: "14px !important",
              fontWeight: "400 !important",
              background: "white",
              color: "#4F35DF",
              "&:hover": {
                backgroundColor: palette.color.gray[10],
                color: "#4F35DF",
              },
            }}
          >
            Join Us Now
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default JoinUsSection;
