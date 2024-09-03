"use client";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { setResetInvoice } from "@/redux/features/invoiceSlice";
import { palette } from "@/theme/palette";
import { Box, Button, Stack, Typography } from "@mui/material";
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
        py: 9,
        pt: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: palette.base.white,
      }}
    >
      <Stack
        direction={{ md: "row", xs: "column-reverse" }}
        justifyContent={"space-between"}
        gap={9}
      >
        {/* left hero section */}
        <Stack
          direction={"column"}
          gap={5}
          sx={{ pl: { md: "3%", lg: "7%" }, mt: "4%" }}
        >
          <Stack direction={"column"} gap={0.5}>
            <Typography
              variant="display-3xl-bold"
              sx={{
                width: "443px",
                color: palette.color.gray[755],
                fontFamily: "Product Sans, sans-serif",
              }}
            >
              AI powered
            </Typography>
            <Typography
              variant="display-3xl-bold"
              sx={{
                width: "596px",
                fontFamily: "Product Sans, sans-serif",
              }}
            >
              custom invoices
            </Typography>
            <Typography
              variant="display-xxxl-bold"
              sx={{
                width: "443px",
                fontFamily: "Product Sans, sans-serif",
                background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Free for all
            </Typography>
          </Stack>
          <Typography
            variant="display-xs1-regular"
            sx={{
              width: "531px",
              color: palette.color.gray[745],
              fontFamily: "Product Sans, sans-serif",
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
              src="/Images/hero-image.svg"
              width={650}
              height={650}
              alt="inv image"
            />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default HeroSection;
