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
import { ExpandableTextWithSubheadings } from "@/components/ExpandableTextWithSubheadings";

const expandableTextData = [
  {
    title1: "",
    title2: "1. Acceptance of Terms",
    desc: "By registering, accessing, or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms, our Privacy Policy, and any other agreements or policies referenced herein.",
  },
  {
    title1: "",
    title2: "2. User Eligibility",
    desc: "You must be at least 18 years old or the age of majority in your jurisdiction to use our Services. By using ZeeInvoices, you represent that you have the legal capacity to enter into a binding agreement.",
  },
  {
    title1: "",
    title2: "3. Account Registration",
    desc: "To use our Services, you must create an account. You agree to:",
    sections: [
      {
        heading: "",
        subheadings: [
          "•	Provide accurate and complete information during registration.",
          "•	Keep your login credentials confidential and secure.",
          "•	Immediately notify us of any unauthorized use of your account.",
          "We reserve the right to suspend or terminate your account if any information is found to be inaccurate, misleading, or in violation of these Terms.",
        ],
      },
    ],
  },
  {
    title1: "",
    title2: "4. Free Software and Service Availability",
    desc: "",
    sections: [
      {
        heading: "a. Free Access:",
        subheadings: [
          "ZeeInvoices is a free software that allows users to create, customize, and manage invoices without any charges or subscription fees. All features available on our platform are accessible without any cost.",
        ],
      },
      {
        heading: "b. Availability:",
        subheadings: [
          "Our Services are available to users worldwide. As a cloud-based platform, ZeeInvoices can be accessed from any location with an internet connection.",
        ],
      },
    ],
  },
  {
    title1: "",
    title2: "5. Use of Services",
    desc: "You agree to use our Services solely for lawful purposes and in compliance with these Terms and all applicable laws and regulations. You agree not to:",
    sections: [
      {
        heading: "",
        subheadings: [
          "•	Use our Services in any way that could harm, disable, or impair them.",
          "•	Engage in unauthorized access or tampering with the platform, its servers, or any connected networks.",
          "•	Transmit any harmful code, viruses, or other malicious software.",
          "•	Upload or share any data that is illegal, defamatory, obscene, or infringes on the rights of others.",
          "We reserve the right to monitor your use of the Services and to terminate your access if we suspect any misuse or violation of these Terms.",
        ],
      },
    ],
  },
  {
    title1: "",
    title2: "6. User Content",
    desc: "You retain ownership of any data, content, or invoices you create using our Services ('User Content'). By using our Services, you grant us a limited, non-exclusive, royalty-free license to use, store, and process your User Content solely for the purpose of providing and improving our Services. You are responsible for ensuring that your User Content does not violate any laws, infringe on third-party rights, or contain any harmful content.",
  },
  {
    title1: "",
    title2: "7. Intellectual Property Rights",
    desc: "ZeeInvoices retains all intellectual property rights in the Services, including but not limited to the software, website design, trademarks, logos, and other proprietary content. You agree not to:",
    sections: [
      {
        heading: "",
        subheadings: [
          "•	Copy, modify, distribute, or create derivative works based on our Services.",
          "•	Reverse-engineer, decompile, or attempt to extract the source code of any software used in the Services.",
          "•	Use our trademarks, logos, or branding without our explicit written consent.",
        ],
      },
    ],
  },
  {
    title1: "",
    title2: "8. Third-Party Integrations",
    desc: "Our Services may integrate with third-party tools, websites, or services. These integrations are provided for your convenience, and we do not endorse or assume responsibility for the privacy practices or content of such third parties. Your use of any third-party services is governed by their terms and policies.",
  },
  {
    title1: "",
    title2: "9. Disclaimer of Warranties",
    desc: "Our Services are provided 'as is' and 'as available' without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee that the Services will be uninterrupted, error-free, or secure.",
  },
  {
    title1: "",
    title2: "10. Limitation of Liability",
    desc: "To the fullest extent permitted by law, ZeeInvoices, its affiliates, and their respective officers, directors, employees, or agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising out of or in connection with your use of the Services.",
    sections: [
      {
        heading:
          "Our total liability for any claims related to the Services shall not exceed the amount you have paid to us (which, as a free service, is zero).",
        subheadings: [""],
      },
    ],
  },
  {
    title1: "",
    title2: "11. Indemnification",
    desc: "You agree to indemnify, defend, and hold harmless ZeeInvoices and its affiliates from and against any claims, liabilities, damages, losses, and expenses, including legal fees, arising out of or in connection with:",
    sections: [
      {
        heading: "",
        subheadings: [
          "•	Your use of the Services",
          "•	Your violation of these Terms",
          "•	Your infringement of any third-party rights",
        ],
      },
    ],
  },
  {
    title1: "",
    title2: "12. Termination",
    desc: "We reserve the right to suspend or terminate your access to the Services at any time, with or without notice, for any reason, including but not limited to violations of these Terms. Upon termination, your right to use the Services will immediately cease, and we may delete any data associated with your account.",
  },
  {
    title1: "",
    title2: "13. Governing Law",
    desc: "These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law principles. Any legal actions or disputes arising from these Terms or your use of the Services shall be resolved exclusively in the state or federal courts located in Dallas, Texas.",
  },
  {
    title1: "",
    title2: "14. Changes to Terms & Conditions",
    desc: "We reserve the right to update or modify these Terms at any time. Any changes will be posted on this page with an updated 'Effective Date.' Your continued use of the Services after such changes indicates your acceptance of the revised Terms.",
  },
  {
    title1: "",
    title2: "15. Contact Information",
    desc: "If you have any questions, concerns, or requests regarding these Terms & Conditions, please contact us at:",
  },
];

interface TermsAndConditions {}
const TermsAndConditions: FC<TermsAndConditions> = ({}) => {
  const isModile = useMediaQuery("(max-width: 500px)");
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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

            <Stack>
              <Typography
                // variant="display-xs-bold"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.text.expandableTextGreyColor,
                  fontSize: { md: "24px !important", xs: "14px !important" },
                  lineHeight: { md: "34px !important", xs: "18px !important" },
                  fontWeight: 700,
                }}
              >
                Effective Date:{" "}
                <Box
                  component="span"
                  sx={{
                    fontFamily: "Product Sans, sans-serif",
                    fontSize: { md: "24px !important", xs: "14px !important" },
                    lineHeight: {
                      md: "34px !important",
                      xs: "18px !important",
                    },
                    fontWeight: { md: 700 },
                    background:
                      "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }}
                >
                  01/09/2023
                </Box>
              </Typography>
              <Typography
                variant="text-xl1-1-regular"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.text.expandableTextGreyColor,
                  fontSize: { md: "20px", xs: "12px" },
                  lineHeight: { md: "34px", xs: "18px" },
                  fontWeight: { md: 400 },
                }}
              >
                Welcome to ZeeInvoices! These Terms & Conditions
                (&quot;Terms&quot;) govern your use of our website{" "}
                <a
                  href="https://www.zeeinvoices.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: palette.primary.main,
                    textDecoration: isHovered ? "underline" : "none",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  https://www.zeeinvoices.com/
                </a>{" "}
                and the invoicing software and services (&quot;Services&quot;)
                provided by ZeeInvoices (&quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;). By accessing or using our Services, you agree
                to be bound by these Terms. If you do not agree with these
                Terms, you should not use our Services.
              </Typography>
            </Stack>

            <Stack
              direction={"column"}
              gap={3}
              sx={{
                width: "100%",
                // height: { sm: "724px", xs: "590px" },
                display: "flex",
                justifyContent: "center",
                mt: "1%",
              }}
            >
              {expandableTextData.map((item, index) => (
                <ExpandableTextWithSubheadings
                  key={index}
                  title1={item.title1}
                  title2={item.title2}
                  desc={item.desc}
                  sections={item.sections} // Pass sections here
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
                <a
                  className="text-md-regular"
                  href="https://mail.google.com/mail/?view=cm&to=support@zeeinvoices.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Typography
                    variant="display-md1-medium"
                    className="text-md-regular"
                    sx={{
                      width: { md: "500px", xs: "auto" },
                      fontFamily: "Product Sans, sans-serif",
                      color: palette.text.contactEmailColor,
                      fontSize: {
                        md: "28px !important",
                        xs: "12px !important",
                      },
                      lineHeight: {
                        md: "34px !important",
                        xs: "18px !important",
                      },
                      "&:hover": {
                        textDecoration: "underline", // Ensure there's no underline
                      },
                    }}
                  >
                    support@zeeinvoices.com
                  </Typography>
                </a>
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
                  +1 480 920 1123
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
