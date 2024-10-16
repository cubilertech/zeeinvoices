"use client";
import { Icon } from "@/components/Icon";
import { palette } from "@/theme/palette";
import {
  Box,
  Button,
  Container,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/Styles/sectionStyle.css";

const EveryBusinessSection = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const route = useRouter();
  // const [isHover, setIsHover] = useState(false);
  const [is1Hover, set1IsHover] = useState(false);
  const [is2Hover, set2IsHover] = useState(false);
  const [isUpperHover, setIsUpperHover] = useState(false);
  const handleCrtInvButton = (data: any) => {
    route.push("/create-new-invoice");
  };
  return (
    <Container
      className="mainContainer"
      sx={{
        px: { md: "0%", lg: "0%", xs: "16px" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        direction={"column"}
        gap={{ sm: 7.5, xs: 4 }}
        sx={{
          width: "100%",
          pt: { sm: 10, xs: 5 },
          pb: { sm: 10, xs: 5 },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction={"column"}
          gap={{ xs: 1.5 }}
          sx={{ alignItems: "center" }}
        >
          <Stack direction={"row"} gap={2}>
            <Typography
              variant="display-lg-bold"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.color.gray[900],
                fontSize: { md: "48px", xs: "24px" },
                lineHeight: { md: "64px", xs: "29px" },
                fontWeight: { md: 700 },
              }}
            >
              Built For{" "}
              <Box
                component="span"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  fontSize: { md: "48px", xs: "24px" },
                  lineHeight: { md: "64px", xs: "29px" },
                  fontWeight: { md: 700 },
                  background:
                    "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                Every Business
              </Box>
            </Typography>
          </Stack>
          <Typography
            variant="text-xl-regular"
            sx={{
              width: { md: "846px", xs: "335px" },
              fontFamily: "Product Sans, sans-serif",
              color: palette.color.gray[610],
              fontSize: { md: "20px", xs: "12px" },
              lineHeight: { md: "30px", xs: "18px" },
              fontWeight: { md: 400 },
              textAlign: { xs: "center" },
            }}
          >
            ZeeInvoices simplifies invoicing for everyone, from freelancers to
            large businesses. Our free software automates invoice creation and
            streamlines the entire process.
          </Typography>
        </Stack>
        <Stack
          direction={{ sm: "row", xs: "column" }}
          gap={{ sm: 3, xs: 2 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: { sm: "100%" },
          }}
        >
          {/* upper section, now its left */}
          <Stack
            className="upper-card"
            direction={"column"}
            gap={{ md: 3, xs: 1.5 }}
            sx={{
              width: { sm: "50%", xs: "100%" },
              px: { sm: "24px", xs: "7%" },
              py: "24px",
              borderRadius: { sm: "30px", xs: "6.98px" },
              border: `1.06px solid #0000001A`,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: palette.base.white,
              transition: "all 0.5s ease", // Add transition for smooth animation
              "&:hover": {
                color: palette.base.white,
                backgroundColor: palette.text.contactEmailColor,
                transform: "scale(1.03)", // Scale the component up by 10% on hover
                "& .buttom-right-card": {
                  backgroundColor: `${palette.base.white} !important`,
                },
              },
              "&:hover .display-md1-regular": {
                color: palette.base.white, // Change the color of the specific Typography on hover
              },
              "&:hover .text-md-regular": {
                color: palette.base.white, // Change the color of the other Typography on hover
              },
            }}
            onMouseEnter={() => {
              set1IsHover(true);
              setIsUpperHover(true);
            }}
            onMouseLeave={() => {
              set1IsHover(false);
              setIsUpperHover(false);
            }}
          >
            {is1Hover ? (
              <Box>
                <Image
                  src="/Images/business-11-image.svg"
                  width={isMobile ? 57 : 180}
                  height={isMobile ? 57 : 180}
                  alt="rectangle iaptop bg"
                  placeholder="blur"
                  blurDataURL="/Images/business-011-image.png"
                />
              </Box>
            ) : (
              <Box>
                <Image
                  src="/Images/business-1-image.svg"
                  width={isMobile ? 57 : 180}
                  height={isMobile ? 57 : 180}
                  alt="rectangle iaptop bg"
                  placeholder="blur"
                  blurDataURL="/Images/business-01-image.png"
                />
              </Box>
            )}

            <Stack direction={"column"} gap={1.5}>
              <Typography
                variant="display-md1-regular"
                className="display-md1-regular"
                sx={{
                  textAlign: "center",
                  width: { md: "500px", xs: "100%" },
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.base.black,
                  fontSize: { md: "40px", xs: "16px" },
                  lineHeight: { md: "48px", xs: "24px" },
                  fontWeight: { md: 400 },
                }}
              >
                Freelancers
              </Typography>
              <Typography
                variant="text-md-regular"
                className="text-md-regular"
                sx={{
                  textAlign: "center",
                  width: { md: "100%", xs: "100%" },
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.color.gray[745],
                  fontSize: { md: "16px", xs: "16px" },
                  lineHeight: { md: "24px", xs: "24px" },
                  fontWeight: { xs: 400 },
                }}
              >
                Streamline your freelance work with automated transaction
                management and payment reminders, so you can focus on growing
                your business.
              </Typography>
            </Stack>
          </Stack>

          {/* bottom section, now its right */}
          <Stack direction={{ xs: "column" }} gap={{ sm: 3, xs: 2 }}>
            <Stack
              className="buttom-left-card"
              direction={"column"}
              gap={{ md: 2, xs: 1.5 }}
              sx={{
                width: { md: "100%", xs: "100%" },
                px: "24px",
                py: "24px",
                borderRadius: { sm: "30px", xs: "6.98px" },
                border: `1.06px solid #0000001A`,
                alignItems: "center",
                backgroundColor: palette.base.white,
                transition: "all 0.5s ease", // Add transition for smooth animation
                "&:hover": {
                  color: palette.base.white,
                  backgroundColor: palette.text.contactEmailColor,
                  transform: "scale(1.03)", // Scale the component up by 10% on hover
                },
                "&:hover .text-md-regular": {
                  color: palette.base.white, // Change the color of the specific Typography on hover
                },
                "&:hover .display-sm0-medium": {
                  color: palette.base.white, // Change the color of the other Typography on hover
                },
              }}
              onMouseEnter={() => {
                set2IsHover(true);
                setIsUpperHover(true);
              }}
              onMouseLeave={() => {
                set2IsHover(false);
                setIsUpperHover(false);
              }}
            >
              {is2Hover ? (
                <Icon icon="handShakeWhiteIcon" width={57} height={57} />
              ) : (
                <Icon icon="handShakePurpleIcon" width={57} height={57} />
              )}
              <Typography
                variant="display-sm0-medium"
                className="display-sm0-medium"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.base.black,
                  fontSize: { md: "26px", xs: "16px" },
                  lineHeight: { md: "32px", xs: "24px" },
                  fontWeight: { md: 400 },
                }}
              >
                Businesses
              </Typography>
              <Typography
                variant="text-md-regular"
                className="text-md-regular"
                sx={{
                  width: { md: "100%", xs: "263px" },
                  fontFamily: "Product Sans, sans-serif",
                  textAlign: "center",
                  color: palette.color.gray[745],
                  fontSize: { md: "16px", xs: "12px" },
                  lineHeight: { md: "24px", xs: "18px" },
                  fontWeight: { md: 400 },
                }}
              >
                Optimize your business with streamlined transaction management
                and automated payment reminders, helping you scale efficiently.
              </Typography>
            </Stack>
            {/* bottom right */}
            <Stack
              className="buttom-right-card"
              direction={"column"}
              gap={{ md: 2, xs: 1.5 }}
              sx={{
                width: { md: "100%", xs: "100%" },
                px: "24px",
                py: "24px",
                borderRadius: { sm: "30px", xs: "6.98px" },
                border: `1.06px solid #0000001A`,
                alignItems: "center",
                color: isUpperHover ? palette.base.black : palette.base.white,
                backgroundColor: isUpperHover
                  ? palette.base.white
                  : palette.text.contactEmailColor,
                transition: "all 0.5s ease", // Add transition for smooth animation
                "&:hover": {
                  color: palette.base.white,
                  backgroundColor: palette.text.contactEmailColor,
                  transform: "scale(1.03)", // Scale the component up by 10% on hover
                },
                // "&:hover .text-md-regular-right": {
                //   color: isUpperHover
                //     ? palette.color.gray[745]
                //     : palette.color.gray[745], // Change the color of the specific Typography on hover
                // },
                "&:hover .display-sm0-medium": {
                  color: palette.base.black, // Change the color of the other Typography on hover
                },
              }}
              // onMouseEnter={() => setIsHover(true)}
              // onMouseLeave={() => setIsHover(false)}
            >
              {isUpperHover ? (
                <Icon icon="ecommercePurpoleIcon" width={57} height={57} />
              ) : (
                <Icon icon="ecommerceWhiteIcon" width={57} height={57} />
              )}

              <Typography
                variant="display-sm0-medium"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  // color: palette.base.white,
                  // Add a class for targeting in the hover state
                  "&.display-sm0-medium": {},
                  fontSize: { md: "26px", xs: "16px" },
                  lineHeight: { md: "32px", xs: "24px" },
                  fontWeight: { md: 400 },
                }}
              >
                E-commerce
              </Typography>
              {isUpperHover ? (
                <Typography
                  variant="text-md-regular"
                  className="text-md-regular-right"
                  sx={{
                    width: { md: "100%", xs: "263px" },
                    fontFamily: "Product Sans, sans-serif",
                    textAlign: "center",
                    color: palette.color.gray[745],
                    "&.text-md-regular": {},
                    fontSize: { md: "16px", xs: "12px" },
                    lineHeight: { md: "24px", xs: "18px" },
                    fontWeight: { md: 400 },
                  }}
                >
                  Simplify your e-commerce transactions and automate payment
                  reminders, giving you more time to grow your online store.
                </Typography>
              ) : (
                <Typography
                  variant="text-md-regular"
                  className="text-md-regular-right"
                  sx={{
                    width: { md: "100%", xs: "263px" },
                    fontFamily: "Product Sans, sans-serif",
                    textAlign: "center",
                    // color: palette.base.white,
                    // Add a class for targeting in the hover state
                    "&.text-md-regular": {},
                    fontSize: { md: "16px", xs: "10px" },
                    lineHeight: { md: "24px", xs: "18px" },
                    fontWeight: { md: 400 },
                  }}
                >
                  Simplify your e-commerce transactions and automate payment
                  reminders, giving you more time to grow your online store.
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
export default EveryBusinessSection;
