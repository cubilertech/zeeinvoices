"use client";
import { ContactInfoCard } from "@/components/ContactInfoCard";
import { TermsConditions } from "@/components/TermsConditions";
import { palette } from "@/theme/palette";
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, useCallback, useState } from "react";
// import { FooterSection } from "../LandingPage/FooterSection";
import { ExpandableText } from "@/components/ExpandableText";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { FooterSection } from "../SecondLandingPage/FooterSection";

const expandableTextData = [
  {
    title1: "",
    title2: "Introduction",
    desc: "Please read these Terms and Conditions carefully before using ZEE Invoices. By using the service, you agree to these terms. If you don’t agree, please don’t use the service.",
  },
  {
    title1: "",
    title2: "Account Registration",
    desc: "When you create an account, ensure that the information you provide is accurate. You are responsible for keeping your account details secure.",
  },
  {
    title1: "",
    title2: "Use Of Service",
    desc: "ZeeInvoices is intended for generating and managing invoices. You may only use the service for lawful purposes.",
  },
  {
    title1: "",
    title2: "Subscription & Payment",
    desc: "Certain features of ZEE Invoices may require a subscription. By subscribing, you agree to pay the associated fees.",
  },
  {
    title1: "",
    title2: "Data Privacy",
    desc: "We respect your privacy. Please refer to our Privacy Policy to understand how we collect, use, and protect your data.",
  },
  {
    title1: "",
    title2: "Intellectual Property",
    desc: "All content and software related to ZEE Invoices are owned by us or our licensors. You are granted a limited, non-exclusive license to use the service.",
  },
  {
    title1: "",
    title2: "Limitations Of Liability",
    desc: "ZeeInvoices is provided 'as is' without any warranties. We are not responsible for any losses or damages that may result from using the service.",
  },
  {
    title1: "",
    title2: "Termination",
    desc: "We reserve the right to suspend or terminate your account if you violate these terms.",
  },
  {
    title1: "",
    title2: "Modifications",
    desc: "We may update these Terms and Conditions from time to time. Continued use of the service constitutes acceptance of the updated terms.",
  },
  {
    title1: "",
    title2: "Contact Information",
    desc: "For any questions or concerns about these Terms and Conditions, please contact us at:",
  },
];

interface TermsAndConditions {}
const TermsAndConditions: FC<TermsAndConditions> = ({}) => {
  const isModile = useMediaQuery("(max-width: 500px)");
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);

  const handleBoxMouseEnter = useCallback(
    (index: number) => {
      // Only update state if it's not already the hovered index
      if (hoveredBox !== index) {
        setHoveredBox(index);
      }
    },
    [hoveredBox] // Add hoveredBox as a dependency
  );
  const handleBoxMouseLeave = useCallback(() => {
    // Only clear state if it's not already null
    if (hoveredBox !== null) {
      setHoveredBox(null);
    }
  }, [hoveredBox]);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // for expanding the text description.
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? index : index);
  };
  const handleComplete = () => {
    setOpenIndex((prevIndex) => {
      const nextIndex = (openIndex as number) + 1;
      return nextIndex >= expandableTextData.length ? 0 : nextIndex;
    });
  };
  return (
    <>
      <Stack
        direction={"column"}
        gap={3}
        sx={{
          width: "100%",
          display: "flex",
          backgroundColor: palette.base.white,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg" sx={{ px: { md: "0%", lg: "0%", xs: "5%" } }}>
          <Stack
            direction={"column"}
            gap={4}
            sx={{
              width: { md: "100%", xs: "100%" },
              alignItems: "center",
              display: "flex",
              mt: "6%",
            }}
          >
            <Stack
              direction={"column"}
              gap={0.5}
              sx={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="display-lg-bold"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.color.gray[805],
                  fontSize: { md: "48px !important", xs: "24px !important" },
                  lineHeight: {
                    md: "64px !important",
                    xs: "29.11px !important",
                  },
                }}
              >
                Terms &{" "}
                <span
                  // variant="display-lg-bold"
                  // component={"span"}
                  style={{
                    background:
                      "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }}
                >
                  Conditions
                </span>
              </Typography>

              <Typography
                variant="text-xl-regular"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.color.gray[745],
                  fontSize: { sm: "20px !important", xs: "12px !important" },
                  lineHeight: { sm: "24px", xs: "18px" },
                  fontWeight: { sm: 400 },
                }}
              >
                See our terms of Use
              </Typography>
            </Stack>
            <Stack
              direction={"column"}
              gap={3}
              sx={{
                width: "100%",
                height: { sm: "724px", xs: "590px" },
                display: "flex",
                justifyContent: "center",
                mt: "1%",
              }}
            >
              {expandableTextData.map((item, index) => (
                <ExpandableText
                  key={index}
                  title1={item.title1}
                  title2={item.title2}
                  desc={item.desc}
                  isOpen={openIndex === index}
                  isOneTitle={true}
                  onToggle={() => handleToggle(index)}
                  onComplete={handleComplete} // Pass the completion handler
                />
              ))}
            </Stack>
          </Stack>

          <Stack
            direction={"column"}
            gap={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: { md: 3, xs: 1 },
              mt: "5%",
              width: { md: "fit-content", xs: "100%" },
              mx: "auto",
            }}
          >
            {/* upper section */}
            <Stack
              direction={"row"}
              // gap={13}
              sx={{
                width: { md: "1200px", xs: "100%" },
                px: "10%",
                py: "9%",
                borderRadius: { md: "30px", xs: "9.39px" },
                border: `1.06px solid #0000001A`,
                alignItems: "center",
                backgroundColor: palette.base.white,
                transition: "all 0.9s ease",
                gap: { md: 13, xs: "22px" }, // Add transition for smooth animation
                "&:hover": {
                  color: palette.base.white,
                  backgroundColor: palette.primary.main,
                  transform: "scale(1.03)", // Scale the component up by 10% on hover
                },
                "&:hover .text-md-regular": {
                  color: palette.base.white, // Change the color of the specific Typography on hover
                },
                "&:hover .display-sm0-medium": {
                  color: palette.base.white, // Change the color of the other Typography on hover
                },
              }}
              onMouseEnter={() => handleBoxMouseEnter(0)} // Set hover state to true on mouse enter
              onMouseLeave={handleBoxMouseLeave}
            >
              <Box
                sx={{
                  width: { md: "243px", xs: "72px" },
                  height: { md: "243px", xs: "58px" },
                }}
              >
                {hoveredBox !== 0 ? (
                  <Image
                    style={{}}
                    src="/Images/contact-email-image.svg"
                    width={isModile ? 72 : 243}
                    height={isModile ? 58 : 243}
                    alt="rectangle iaptop bg"
                  />
                ) : (
                  <Image
                    src="/Images/contact-email-white-image.svg"
                    width={isModile ? 72 : 243}
                    height={isModile ? 58 : 243}
                    alt="rectangle iaptop bg"
                  />
                )}
              </Box>

              <Stack
                direction={"column"}
                sx={{ pl: "12%", gap: { md: 2.5, xs: 1 } }}
              >
                <Typography
                  variant="display-md1-regular"
                  className="display-sm0-medium"
                  sx={{
                    fontFamily: "Product Sans, sans-serif",
                    color: palette.base.black,
                    fontSize: { md: "40px !important", xs: "14px !important" },
                    lineHeight: {
                      md: "31px  !important",
                      xs: "9.94px !important",
                    },
                  }}
                >
                  Email
                </Typography>
                <Typography
                  variant="display-md1-medium"
                  className="text-md-regular"
                  sx={{
                    width: { md: "500px", xs: "auto" },
                    fontFamily: "Product Sans, sans-serif",
                    color: palette.text.contactEmailColor,
                    fontSize: { md: "28px !important", xs: "12px !important" },
                    lineHeight: {
                      md: "34px !important",
                      xs: "18px !important",
                    },
                  }}
                >
                  support@zeeinvoices.com
                </Typography>
              </Stack>
            </Stack>

            {/* bottom section */}
            <Stack
              // direction={"row"}
              gap={{ sm: 3, xs: 1 }}
              sx={{ flexDirection: { md: "row", xs: "column" } }}
            >
              <Stack
                direction={"column"}
                // gap={5}
                sx={{
                  width: { md: "587px", xs: "100%" },
                  px: "7%",
                  py: "5%",
                  borderRadius: { md: "30px", xs: "9.39px" },
                  border: `1.06px solid #0000001A`,
                  alignItems: "center",
                  backgroundColor: palette.base.white,
                  transition: "all 0.9s ease",
                  gap: { md: 5, xs: 1.5 }, // Add transition for smooth animation
                  "&:hover": {
                    color: palette.base.white,
                    backgroundColor: palette.primary.main,
                    transform: "scale(1.05)", // Scale the component up by 10% on hover
                  },
                  "&:hover .text-md-regular": {
                    color: palette.base.white, // Change the color of the specific Typography on hover
                  },
                  "&:hover .display-sm0-medium": {
                    color: palette.base.white, // Change the color of the other Typography on hover
                  },
                }}
                onMouseEnter={() => handleBoxMouseEnter(1)} // Set hover state to true on mouse enter
                onMouseLeave={handleBoxMouseLeave}
              >
                {hoveredBox === 1 ? (
                  <Icon
                    icon="contactWhiteLocationIcon"
                    width={isModile ? 31 : 42}
                    height={isModile ? 35 : 42}
                  />
                ) : (
                  <Icon
                    icon="contactLocationIcon"
                    width={isModile ? 31 : 42}
                    height={isModile ? 35 : 2}
                  />
                )}
                <Typography
                  variant="display-sm0-medium"
                  className="display-sm0-medium"
                  sx={{
                    fontFamily: "Product Sans, sans-serif",
                    color: palette.base.black,
                    fontSize: { md: "26px !important", xs: "14px !important" },
                    lineHeight: {
                      md: "31px !important",
                      xs: "7.34px !important",
                    },
                  }}
                >
                  Address
                </Typography>
                <Typography
                  variant="text-md-regular"
                  className="text-md-regular"
                  sx={{
                    width: "400px",
                    fontFamily: "Product Sans, sans-serif",
                    textAlign: "center",
                    color: palette.color.gray[745],
                    fontSize: { md: "16px !important", xs: "10px !important" },
                    lineHeight: {
                      md: "19px !important",
                      xs: "18px !important",
                    },
                    mt: { md: 0, xs: 1 },
                  }}
                >
                  11133 Shady Trail PMB 205 Dallas, TX 75229
                </Typography>
              </Stack>
              {/* right bottom */}
              <Stack
                direction={"column"}
                // gap={4}
                sx={{
                  width: { md: "587px", xs: "100%" },
                  px: "7%",
                  py: "5%",
                  borderRadius: { md: "30px", xs: "9.39px" },
                  border: `1.06px solid #0000001A`,
                  alignItems: "center",
                  gap: { md: 5, xs: 1.5 },
                  color:
                    hoveredBox === 1 || hoveredBox === 0
                      ? palette.base.black
                      : palette.base.white,
                  backgroundColor:
                    hoveredBox === 1 || hoveredBox === 0
                      ? palette.base.white
                      : palette.primary.main,
                  transition: "all 0.9s ease", // Add transition for smooth animation
                  "&:hover": {
                    color: palette.base.white,
                    backgroundColor: palette.primary.main,
                    transform: "scale(1.05)", // Scale the component up by 10% on hover
                  },
                  "&:hover .text-md-regular": {
                    color: palette.base.white, // Change the color of the specific Typography on hover
                  },
                  "&:hover .display-sm0-medium": {
                    color: palette.base.white, // Change the color of the other Typography on hover
                  },
                }}
                onMouseEnter={() => handleBoxMouseEnter(3)} // Set hover state to true on mouse enter
                onMouseLeave={handleBoxMouseLeave} // Set hover state to false on mouse leave
              >
                {hoveredBox === 1 || hoveredBox === 0 ? (
                  <Icon
                    icon="contactPhoneIcon"
                    width={isModile ? 29 : 42}
                    height={isModile ? 30 : 42}
                  />
                ) : (
                  <Icon
                    icon="contactWhitePhoneIcon"
                    width={isModile ? 29 : 42}
                    height={isModile ? 30 : 42}
                  />
                )}

                <Typography
                  variant="display-sm0-medium"
                  sx={{
                    fontFamily: "Product Sans, sans-serif",
                    // color: palette.base.white,
                    // Add a class for targeting in the hover state
                    "&.display-sm0-medium": {},
                    fontSize: { md: "26px !important", xs: "14px !important" },
                    lineHeight: {
                      md: "31px !important",
                      xs: "7.34px !important",
                    },
                  }}
                >
                  Phone
                </Typography>
                <Typography
                  variant="text-md-regular"
                  className="text-md-regular"
                  sx={{
                    width: "400px",
                    fontFamily: "Product Sans, sans-serif",
                    textAlign: "center",
                    // color: palette.base.white,
                    // Add a class for targeting in the hover state
                    "&.text-md-regular": {},
                    fontSize: { md: "16px !important", xs: "10px !important" },
                    lineHeight: {
                      md: "19px !important",
                      xs: "18px !important",
                    },
                  }}
                >
                  +14809201123
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Container>
        <FooterSection />
      </Stack>
    </>
  );
};
export default TermsAndConditions;
