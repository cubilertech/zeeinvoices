"use client";
import { Icon } from "@/components/Icon";
import { palette } from "@/theme/palette";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EveryBusinessSection = () => {
  const route = useRouter();
  // const [isHover, setIsHover] = useState(false);
  const [is1Hover, set1IsHover] = useState(false);
  const [is2Hover, set2IsHover] = useState(false);
  const [isUpperHover, setIsUpperHover] = useState(false);
  const handleCrtInvButton = (data: any) => {
    route.push("/create-new-invoice");
  };
  return (
    <Stack
      direction={"column"}
      gap={3}
      sx={{
        width: "100%",
        pt: 3,
        pb: 7,
        backgroundColor: "#F7F8F9",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction={"row"} gap={2}>
        <Typography
          variant="display-lg-bold"
          sx={{
            fontFamily: "Product Sans, sans-serif",
            color: palette.color.gray[805],
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
              background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
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
          width: { md: "100%", xs: "335px" },
          fontFamily: "Product Sans, sans-serif",
          color: palette.color.gray[745],
          fontSize: { md: "20px", xs: "12px" },
          lineHeight: { md: "24px", xs: "18px" },
          fontWeight: { md: 400 },
          textAlign: { xs: "center" },
        }}
      >
        No matter your industry, ZeeInvoices is here to help.ZeeInvoices is here
        to help.ZeeInvoices is here to help.
      </Typography>
      <Stack
        direction={"column"}
        gap={3}
        sx={{ display: "flex", justifyContent: "center", mt: "3%" }}
      >
        {/* upper section */}
        <Stack
          className="upper-card"
          direction={"row"}
          gap={{ md: 13, xs: 0 }}
          sx={{
            width: { md: "1200px", xs: "335px" },
            px: { md: "10%", xs: "7%" },
            py: "9%",
            borderRadius: { sm: "30px", xs: "6.98px" },
            border: `1.06px solid #0000001A`,
            alignItems: "center",
            backgroundColor: palette.base.white,
            transition: "all 0.3s ease", // Add transition for smooth animation
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
                src="/Images/pro-business-white-image.svg"
                width={243}
                height={225}
                alt="rectangle iaptop bg"
              />
            </Box>
          ) : (
            <Box>
              <Image
                src="/Images/pro-business-purple-image.svg"
                width={243}
                height={225}
                alt="rectangle iaptop bg"
              />
            </Box>
          )}

          <Stack direction={"column"} gap={2} sx={{ pl: "12%" }}>
            <Typography
              variant="display-md1-regular"
              className="display-md1-regular"
              sx={{
                width: { md: "500px", xs: "176px" },
                fontFamily: "Product Sans, sans-serif",
                color: palette.base.black,
                fontSize: { md: "40px", xs: "14px" },
                lineHeight: { md: "32px", xs: "10px" },
                fontWeight: { md: 400 },
              }}
            >
              Professional Services
            </Typography>
            <Typography
              variant="text-md-regular"
              className="text-md-regular"
              sx={{
                width: { md: "500px", xs: "176px" },
                fontFamily: "Product Sans, sans-serif",
                color: palette.color.gray[745],
                fontSize: { md: "16px", xs: "12px" },
                lineHeight: { md: "20px", xs: "18px" },
                fontWeight: { md: 400 },
              }}
            >
              Our invoice company provides significant benefits for professional
              services. We offer a streamlined platform for creating
            </Typography>
          </Stack>
        </Stack>

        {/* bottom section */}
        <Stack direction={{ md: "row", xs: "column" }} gap={3}>
          <Stack
            className="buttom-left-card"
            direction={"column"}
            gap={{ md: 5, xs: 1.5 }}
            sx={{
              width: { md: "587px", xs: "335px" },
              px: "7%",
              py: "5%",
              borderRadius: { sm: "30px", xs: "6.98px" },
              border: `1.06px solid #0000001A`,
              alignItems: "center",
              backgroundColor: palette.base.white,
              transition: "all 0.3s ease", // Add transition for smooth animation
              "&:hover": {
                color: palette.base.white,
                backgroundColor: palette.text.contactEmailColor,
                transform: "scale(1.05)", // Scale the component up by 10% on hover
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
              <Icon icon="handCodingWhiteIcon" width={42} height={42} />
            ) : (
              <Icon icon="handCodingPurpleIcon" width={42} height={42} />
            )}
            <Typography
              variant="display-sm0-medium"
              className="display-sm0-medium"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.base.black,
                fontSize: { md: "26px", xs: "14px" },
                lineHeight: { md: "32px", xs: "7.39px" },
                fontWeight: { md: 400 },
              }}
            >
              Professional Services
            </Typography>
            <Typography
              variant="text-md-regular"
              className="text-md-regular"
              sx={{
                width: { md: "400px", xs: "263px" },
                fontFamily: "Product Sans, sans-serif",
                textAlign: "center",
                color: palette.color.gray[745],
                fontSize: { md: "16px", xs: "10px" },
                lineHeight: { md: "19.41px", xs: "18px" },
                fontWeight: { md: 400 },
              }}
            >
              Our invoice company provides significant benefits for professional
              services. We offer a streamlined platform for creating
            </Typography>
          </Stack>
          {/* bottom right */}
          <Stack
            className="buttom-right-card"
            direction={"column"}
            gap={{ md: 5, xs: 1.5 }}
            sx={{
              width: { md: "587px", xs: "335px" },
              px: "7%",
              py: "5%",
              borderRadius: { sm: "30px", xs: "6.98px" },
              border: `1.06px solid #0000001A`,
              alignItems: "center",
              color: isUpperHover ? palette.base.black : palette.base.white,
              backgroundColor: isUpperHover
                ? palette.base.white
                : palette.text.contactEmailColor,
              transition: "all 0.3s ease", // Add transition for smooth animation
              "&:hover": {
                color: palette.base.white,
                backgroundColor: palette.text.contactEmailColor,
                transform: "scale(1.05)", // Scale the component up by 10% on hover
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
              <Icon icon="gearsPurpoleIcon" width={42} height={42} />
            ) : (
              <Icon icon="gearsWhiteIcon" width={42} height={42} />
            )}

            <Typography
              variant="display-sm0-medium"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                // color: palette.base.white,
                // Add a class for targeting in the hover state
                "&.display-sm0-medium": {},
                fontSize: { md: "26px", xs: "14px" },
                lineHeight: { md: "32px", xs: "7.39px" },
                fontWeight: { md: 400 },
              }}
            >
              Professional Services
            </Typography>
            {isUpperHover ? (
              <Typography
                variant="text-md-regular"
                className="text-md-regular-right"
                sx={{
                  width: { md: "400px", xs: "263px" },
                  fontFamily: "Product Sans, sans-serif",
                  textAlign: "center",
                  color: palette.color.gray[745],
                  "&.text-md-regular": {},
                  fontSize: { md: "16px", xs: "10px" },
                  lineHeight: { md: "19.41px", xs: "18px" },
                  fontWeight: { md: 400 },
                }}
              >
                Our invoice company provides significant benefits for
                professional services. We offer a streamlined platform for
                creating
              </Typography>
            ) : (
              <Typography
                variant="text-md-regular"
                className="text-md-regular-right"
                sx={{
                  width: { md: "400px", xs: "263px" },
                  fontFamily: "Product Sans, sans-serif",
                  textAlign: "center",
                  // color: palette.base.white,
                  // Add a class for targeting in the hover state
                  "&.text-md-regular": {},
                  fontSize: { md: "16px", xs: "10px" },
                  lineHeight: { md: "19.41px", xs: "18px" },
                  fontWeight: { md: 400 },
                }}
              >
                Our invoice company provides significant benefits for
                professional services. We offer a streamlined platform for
                creating
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default EveryBusinessSection;
