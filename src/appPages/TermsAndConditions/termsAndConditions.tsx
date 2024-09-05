"use client";
import { ContactInfoCard } from "@/components/ContactInfoCard";
import { TermsConditions } from "@/components/TermsConditions";
import { palette } from "@/theme/palette";
import { Box, Container, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { FooterSection } from "../LandingPage/FooterSection";
import { ExpandableText } from "@/components/ExpandableText";
import Image from "next/image";
import { Icon } from "@/components/Icon";

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
  const [isHover, setIsHover] = useState(false);
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
        {/* <Container maxWidth="lg" sx={{ overflowY: "auto", height: "100%" }}> */}
        <Stack
          direction={"column"}
          gap={4}
          sx={{ width: "65%", alignItems: "center", display: "flex", mt: "8%" }}
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
            <Stack
              direction={"row"}
              gap={2}
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
                }}
              >
                Terms &
              </Typography>
              <Typography
                variant="display-lg-bold"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  background:
                    "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                Conditions
              </Typography>
            </Stack>

            <Typography
              variant="text-xl-regular"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.color.gray[745],
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
                onToggle={() => handleToggle(index)}
                onComplete={handleComplete} // Pass the completion handler
              />
            ))}
          </Stack>
        </Stack>

        <Stack
          direction={"column"}
          gap={3}
          sx={{ display: "flex", justifyContent: "center", mt: "3%" }}
        >
          {/* upper section */}
          <Stack
            direction={"row"}
            gap={13}
            sx={{
              width: "1200px",
              px: "10%",
              py: "9%",
              borderRadius: "30px",
              border: `1.06px solid #0000001A`,
              alignItems: "center",
              backgroundColor: palette.base.white,
              transition: "all 0.3s ease", // Add transition for smooth animation
              "&:hover": {
                transform: "scale(1.03)", // Scale the component up by 10% on hover
              },
            }}
          >
            <Box>
              <Image
                src="/Images/contact-email-image.svg"
                width={243}
                height={243}
                alt="rectangle iaptop bg"
              />
            </Box>

            <Stack direction={"column"} gap={2.5} sx={{ pl: "12%" }}>
              <Typography
                variant="display-md1-regular"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.base.black,
                }}
              >
                Email
              </Typography>
              <Typography
                variant="display-md1-medium"
                sx={{
                  width: "500px",
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.text.contactEmailColor,
                }}
              >
                support@zeeinvoices.com
              </Typography>
            </Stack>
          </Stack>

          {/* bottom section */}
          <Stack direction={"row"} gap={3}>
            <Stack
              direction={"column"}
              gap={5}
              sx={{
                width: "587px",
                px: "7%",
                py: "5%",
                borderRadius: "30px",
                border: `1.06px solid #0000001A`,
                alignItems: "center",
                backgroundColor: palette.base.white,
                transition: "all 0.3s ease", // Add transition for smooth animation
                "&:hover": {
                  transform: "scale(1.05)", // Scale the component up by 10% on hover
                },
              }}
            >
              <Icon icon="contactLocationIcon" width={42} height={42} />
              <Typography
                variant="display-sm0-medium"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.base.black,
                }}
              >
                Address
              </Typography>
              <Typography
                variant="text-md-regular"
                sx={{
                  width: "400px",
                  fontFamily: "Product Sans, sans-serif",
                  textAlign: "center",
                  color: palette.color.gray[745],
                }}
              >
                11133 Shady Trail PMB 205 Dallas, TX 75229
              </Typography>
            </Stack>
            {/* right bottom */}
            <Stack
              direction={"column"}
              gap={4}
              sx={{
                width: "587px",
                px: "7%",
                py: "5%",
                borderRadius: "30px",
                border: `1.06px solid #0000001A`,
                alignItems: "center",
                color: palette.base.white,
                backgroundColor: palette.primary.main,
                transition: "all 0.3s ease", // Add transition for smooth animation
                "&:hover": {
                  color: palette.base.black,
                  backgroundColor: palette.base.white,
                  transform: "scale(1.05)", // Scale the component up by 10% on hover
                },
                "&:hover .text-md-regular": {
                  color: palette.color.gray[745], // Change the color of the specific Typography on hover
                },
                "&:hover .display-sm0-medium": {
                  color: palette.base.black, // Change the color of the other Typography on hover
                },
              }}
              onMouseEnter={() => setIsHover(true)} // Set hover state to true on mouse enter
              onMouseLeave={() => setIsHover(false)} // Set hover state to false on mouse leave
            >
              {isHover ? (
                <Icon icon="contactPhoneIcon" width={42} height={42} />
              ) : (
                <Icon icon="contactPhoneIcon" width={42} height={42} />
              )}

              <Typography
                variant="display-sm0-medium"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  // color: palette.base.white,
                  // Add a class for targeting in the hover state
                  "&.display-sm0-medium": {},
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
                }}
              >
                +14809201123
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        {/* </Container> */}
        <FooterSection />
      </Stack>
    </>
  );
};
export default TermsAndConditions;
