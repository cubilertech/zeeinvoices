"use client";
import { palette } from "@/theme/palette";
import { handleLogin } from "@/utils/common";
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { usePathname } from "next/navigation";

const JoinUsSection = () => {
  const pathname = usePathname();
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
            }}
          >
            Join Us Today
          </Typography>
          <Typography
            variant={isModile ? "text-sm-regular" : "text-xl-regular"}
            component={"p"}
            sx={{
              mb: 3,
              color: palette.base.white,
              lineHeight: { sm: "30px", xs: "18px" },
              fontFamily: "Product Sans, sans-serif",
            }}
          >
            Experience the ease of <b>free invoicing</b> with ZeeInvoices.
            Whether you’re a small business owner, a freelancer, or part of a
            large enterprise, our tool is built to meet your invoicing needs.{" "}
            <b>Sign up today</b> to start creating custom, professional
            invoices.
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
              transition: "all 0.5s ease", // Add transition for smooth animation
              "&:hover": {
                transform: "scale(1.1)", // Scale the component up by 10% on hover
                backgroundColor: palette.color.gray[10],
                color: "#4F35DF",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              },
            }}
            onClick={() => {
              handleLogin(pathname);
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
