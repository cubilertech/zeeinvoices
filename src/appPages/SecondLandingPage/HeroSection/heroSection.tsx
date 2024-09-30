"use client";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { setResetInvoice } from "@/redux/features/invoiceSlice";
import { palette } from "@/theme/palette";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

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
        pb: { sm: 9, xs: 4 },
        pt: { sm: 15, xs: 8 },
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: palette.base.white,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { md: "0%", lg: "0%", xs: "0%" } }}>
        <Stack
          direction={{ md: "row", xs: "column" }}
          justifyContent={"space-between"}
          gap={9}
          sx={{ mx: { md: "0px", xs: "20px" } }}
        >
          {/* left hero section */}
          <Stack
            direction={"column"}
            sx={{
              pl: { md: "0%", lg: "0%", xs: "0%" },
              mt: "4%",
              gap: { sm: 5, xs: 3 },
            }}
          >
            <Stack direction={"column"} gap={0.5}>
              <Typography
                variant="display-3xl-bold"
                sx={{
                  width: { md: "596px", xs: "335px" },
                  fontSize: { md: "74px", xs: "32px" },
                  lineHeight: { md: "75px", xs: "39px" },
                  fontWeight: { md: 700 },
                  color: palette.color.gray[755],
                  fontFamily: "Product Sans, sans-serif",
                }}
              >
                AI powered{" "}
                <Box
                  component="span"
                  sx={{
                    fontFamily: "Product Sans, sans-serif",
                    fontSize: { md: "74px", xs: "32px" },
                    lineHeight: { md: "75px", xs: "39px" },
                    fontWeight: { md: 700 },
                    color: palette.color.gray[830],
                  }}
                >
                  custom invoices{" "}
                </Box>
                <Box
                  component="span"
                  sx={{
                    fontFamily: "Product Sans, sans-serif",
                    fontSize: { md: "54px", xs: "32px" },
                    lineHeight: { md: "75px", xs: "39px" },
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
                maxWidth: { md: "600px", xs: "335px" },
                color: palette.color.gray[745],
                fontFamily: "Product Sans, sans-serif",
                fontSize: { sm: "24px !important", xs: "18px !important" },
                lineHeight: { sm: "29px !important", xs: "21px !important" },
              }}
            >
              Simplify your invoicing process and focus on what really
              matters—Let’s grow your business.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                width: "128px",
                height: "40px",
                py: "20px !important",
                px: "0px !important",
                borderRadius: "4px !important",
                fontFamily: "Product Sans, sans-serif !important",
                fontSize: "14px !important",
                fontWeight: "400 !important",
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
            {/* <Box sx={{ position: "absolute", zIndex: 1, left: 30, top: "-5%" }}>
            <Image
              src="/Images/rectangle-laptop-bg.svg"
              width={500}
              height={500}
              alt="rectangle iaptop bg"
            />
          </Box> */}
            <Box sx={{ zIndex: 1 }}>
              <Image
                src="/Images/hero-image-2.svg"
                width={590}
                height={487}
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
