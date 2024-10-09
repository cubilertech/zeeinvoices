"use client";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { setResetInvoice } from "@/redux/features/invoiceSlice";
import { palette } from "@/theme/palette";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import "@/Styles/sectionStyle.css";

const HeroSection = () => {
  const route = useRouter();
  const dispatch = useDispatch();

  const handleCrtInvButton = (data: any) => {
    dispatch(setResetInvoiceSetting());
    dispatch(setResetInvoice());
    route.push("/create-new-invoice");
  };
  return (
    <Stack
      direction={"column"}
      sx={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: palette.base.white,
      }}
    >
      <Container
        className="mainContainer"
        sx={{
          px: { md: "0%", lg: "0%", xs: "0%" },
          pt: { sm: 15, xs: 8 },
          pb: { sm: 10, xs: 5 },
        }}
      >
        <Stack
          direction={{ md: "row", xs: "column" }}
          justifyContent={"space-between"}
          gap={8}
          sx={{ px: { md: "0px", xs: "0px" } }}
        >
          {/* left hero section */}
          <Stack
            direction={"column"}
            sx={{
              width: { md: "630px", xs: "100%" },
              pl: { md: "0%", lg: "0%", xs: "0%" },
              mt: "4%",
              gap: { sm: 5, xs: 3 },
            }}
          >
            <Stack direction={"column"} gap={{ sm: 2.5, xs: 2 }}>
              <Stack direction={"column"} gap={0.5}>
                <Typography
                  variant="display-3xl-bold"
                  sx={{
                    width: { md: "596px", xs: "100%" },
                    fontSize: { md: "74px", xs: "36px" },
                    lineHeight: { md: "74px", xs: "44px" },
                    fontWeight: { md: 700 },
                    color: palette.color.gray[510],
                    fontFamily: "Product Sans, sans-serif",
                    textAlign: { sm: "left", xs: "center" },
                  }}
                >
                  AI powered{" "}
                  <Box
                    component="span"
                    sx={{
                      fontFamily: "Product Sans, sans-serif",
                      fontSize: { md: "74px", xs: "36px" },
                      lineHeight: { md: "74px", xs: "44px" },
                      fontWeight: { md: 700 },
                      color: palette.color.gray[900],
                    }}
                  >
                    custom invoices{" "}
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      fontFamily: "Product Sans, sans-serif",
                      fontSize: { md: "54px", xs: "28px" },
                      lineHeight: { md: "74px", xs: "44px" },
                      fontWeight: { md: 700 },
                      background:
                        "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: "inline-block",
                    }}
                  >
                    Free for all
                  </Box>
                </Typography>
              </Stack>
              <Typography
                variant="display-xs1-regular"
                sx={{
                  maxWidth: { md: "600px", xs: "100%" },
                  color: palette.color.gray[610],
                  fontFamily: "Product Sans, sans-serif",
                  fontSize: { sm: "24px !important", xs: "18px !important" },
                  lineHeight: { sm: "32px !important", xs: "21px !important" },
                  fontWeight: 400,
                  textAlign: { sm: "left", xs: "center" },
                }}
              >
                Simplify your invoicing process and focus on what really
                matters—Let’s grow your business.
              </Typography>
            </Stack>
            <Button
              variant="contained"
              size="large"
              sx={{
                width: { sm: "164px", xs: "100%" },
                // height: "40px",
                py: "10px !important",
                px: "20px !important",
                borderRadius: "4px !important",
                fontFamily: "Product Sans, sans-serif !important",
                fontSize: { sm: "18px !important", xs: "16px !important" },
                lineHeight: { sm: "30px !important", xs: "24px !important" },
                fontWeight: "700 !important",
                background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",

                transition: "all 0.2s ease", // Add transition for smooth animation
                "&:hover": {
                  transform: "scale(1.03)", // Scale the component up by 10% on hover
                },
              }}
              onClick={handleCrtInvButton}
            >
              Create Invoice
            </Button>
          </Stack>
          {/* right hero section */}
          <Stack direction={"row"} sx={{ position: "relative" }}>
            <Box sx={{ zIndex: 1 }}>
              <Image
                src="/Images/hero-image-2.svg"
                width={586}
                height={481}
                alt="Zeeinvoices: create invoices within minutes"
              />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};
export default HeroSection;
