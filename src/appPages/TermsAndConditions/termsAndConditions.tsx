"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { ExpandableTextWithSubheadings } from "@/components/ExpandableTextWithSubheadings";
import "@/Styles/sectionStyle.css";

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
      if (hoveredBox !== index) {
        setHoveredBox(index);
      }
    },
    [hoveredBox] 
  );
  const handleBoxMouseLeave = useCallback(() => {
    if (hoveredBox !== null) {
      setHoveredBox(null);
    }
  }, [hoveredBox]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? index : index);
  };
  const handleComplete = () => {
    setOpenIndex((prevIndex) => {
      const nextIndex = (openIndex as number) + 1;
      return nextIndex >= expandableTextData.length ? 0 : nextIndex;
    });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/js/script.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Stack
        direction={"column"}
        sx={{
          width: "100%",
          display: "flex",
          backgroundColor: palette.base.white,
          justifyContent: "center",
          alignItems: "center",
          pt: { sm: 15, xs: 7 },
          pb: { sm: 8, xs: 5 },
        }}
      >
        <Container
          className="mainContainer"
          sx={{ px: { md: "0%", lg: "0%", xs: "0%" } }}
        >
          <Stack
            direction={"column"}
            gap={4}
            sx={{
              width: { md: "100%", xs: "100%" },
              alignItems: "center",
              display: "flex",
            }}
          >
            <Stack direction={"column"} gap={{ sm: 7.5, xs: 9 }}>
              <Stack
                direction={"column"}
                gap={{ sm: 1.5, xs: 2 }}
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
                    color: palette.color.gray[900],
                    fontSize: { md: "48px !important", xs: "36px !important" },
                    lineHeight: {
                      md: "64px !important",
                      xs: "44px !important",
                    },
                    fontWeight: 700,
                  }}
                >
                  Terms &{" "}
                  <span
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
                    color: palette.color.gray[610],
                    fontSize: { sm: "20px !important", xs: "18px !important" },
                    lineHeight: { sm: "28px", xs: "28px" },
                    fontWeight: { sm: 400 },
                  }}
                >
                  See our terms of Use
                </Typography>
              </Stack>

              <Stack direction={"column"} gap={2}>
                <Typography
                  sx={{
                    fontFamily: "Product Sans, sans-serif",
                    color: palette.color.gray[900],
                    fontSize: { md: "30px !important", xs: "20px !important" },
                    lineHeight: {
                      md: "40px !important",
                      xs: "20px !important",
                    },
                    fontWeight: 700,
                  }}
                >
                  Effective Date:{" "}
                  <Box
                    component="span"
                    sx={{
                      fontFamily: "Product Sans, sans-serif",
                      fontSize: {
                        md: "30px !important",
                        xs: "20px !important",
                      },
                      lineHeight: {
                        md: "40px !important",
                        xs: "20px !important",
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
                    color: palette.color.gray[610],
                    fontSize: { md: "20px", xs: "14px" },
                    lineHeight: { md: "30px", xs: "20px" },
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
                      background:
                        "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textDecoration: isHovered ? "underline" : "none",
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    https://www.zeeinvoices.com/
                  </a>{" "}
                  and the invoicing software and services (&quot;Services&quot;)
                  provided by ZeeInvoices (&quot;we,&quot; &quot;us,&quot; or
                  &quot;our&quot;). By accessing or using our Services, you
                  agree to be bound by these Terms. If you do not agree with
                  these Terms, you should not use our Services.
                </Typography>
              </Stack>
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
                <ExpandableTextWithSubheadings
                  key={index}
                  title1={item.title1}
                  title2={item.title2}
                  desc={item.desc}
                  sections={item.sections}
                  isOpen={openIndex === index}
                  isOneTitle={true}
                  onToggle={() => handleToggle(index)}
                  onComplete={handleComplete}
                />
              ))}
            </Stack>
          </Stack>

          <Stack
            direction={{ sm: "row", xs: "column" }}
            gap={3}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: { md: 3, xs: 1 },
              mt: { sm: "48px", xs: "32px" },
              width: { md: "100%", xs: "100%" },
            }}
          >
            {/* first card */}
            <Stack
              direction={"column"}
              sx={{
                width: { xs: "100%" },
                p: "24px",
                borderRadius: { md: "16px", xs: "16px" },
                border: `1.06px solid #0000001A`,
                alignItems: "center",
                gap: { md: 3, xs: 2 },
                color:
                  hoveredBox === 1 || hoveredBox === 2
                    ? palette.base.black
                    : palette.base.white,
                backgroundColor:
                  hoveredBox === 1 || hoveredBox === 2
                    ? palette.base.white
                    : palette.primary.main,
                transition: "all 0.5s ease", 
                "&:hover": {
                  color: palette.base.white,
                  backgroundColor: palette.primary.main,
                  transform: "scale(1.03)", 
                },
                "& .text-md-regular": {
                  color:
                    hoveredBox === 1 || hoveredBox === 2
                      ? palette.text.contactEmailColor
                      : palette.base.white,
                },
                "&:hover .text-md-regular": {
                  color: palette.base.white, 
                },
                "&:hover .display-sm0-medium": {
                  color: palette.base.white, 
                },
              }}
              onMouseEnter={() => handleBoxMouseEnter(0)}
              onMouseLeave={handleBoxMouseLeave} 
            >
              {hoveredBox === 1 || hoveredBox === 2 ? (
                <Icon
                  icon="contactMailIcon"
                  width={isModile ? 32 : 42}
                  height={isModile ? 32 : 42}
                />
              ) : (
                <Icon
                  icon="contactWhiteMailIcon"
                  width={isModile ? 32 : 42}
                  height={isModile ? 32 : 42}
                />
              )}
              <Stack
                direction={"column"}
                gap={{ sm: 1.5, xs: 1 }}
                alignItems={"center"}
              >
                <Typography
                  variant="display-sm0-medium"
                  sx={{
                    width: "auto",
                    textAlign: "center",
                    fontFamily: "Product Sans, sans-serif",
                    fontSize: { md: "20px !important", xs: "18px !important" },
                    lineHeight: {
                      md: "24px !important",
                      xs: "21px !important",
                    },
                    fontWeight: 700,
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
                    variant="text-md-regular"
                    className="text-md-regular"
                    sx={{
                      fontFamily: "Product Sans, sans-serif",
                      textAlign: "center",
                      fontSize: {
                        md: "16px !important",
                        xs: "16px !important",
                      },
                      lineHeight: {
                        md: "24px !important",
                        xs: "24px !important",
                      },
                      fontWeight: 400,
                      "&:hover": {
                        textDecoration: "underline", 
                      },
                    }}
                  >
                    support@zeeinvoices.com
                  </Typography>
                </a>
              </Stack>
            </Stack>

            {/* second card */}
            <Stack
              direction={"column"}
              sx={{
                width: { md: "100%", xs: "100%" },
                p: "24px",
                alignItems: "center",
                borderRadius: { md: "16px", xs: "16px" },
                border: `1.06px solid #0000001A`,
                backgroundColor: palette.base.white,
                transition: "all 0.5s ease",
                gap: { md: 3, xs: 2 },
                "&:hover": {
                  color: palette.base.white,
                  backgroundColor: palette.primary.main,
                  transform: "scale(1.03)", 
                },
                "&:hover .text-md-regular": {
                  color: palette.base.white, 
                },
                "&:hover .display-sm0-medium": {
                  color: palette.base.white, 
                },
              }}
              onMouseEnter={() => handleBoxMouseEnter(1)} 
              onMouseLeave={handleBoxMouseLeave}
            >
              {hoveredBox === 1 ? (
                <Icon
                  icon="contactWhitePhoneIcon" 
                  width={isModile ? 32 : 42}
                  height={isModile ? 32 : 42}
                />
              ) : (
                <Icon
                  icon="contactPhoneIcon"
                  width={isModile ? 32 : 42}
                  height={isModile ? 32 : 42}
                />
              )}

              <Stack
                direction={"column"}
                gap={{ sm: 1.5, xs: 1 }}
                alignItems={"center"}
              >
                <Typography
                  variant="display-md1-regular"
                  className="display-sm0-medium"
                  sx={{
                    width: "auto",
                    textAlign: "center",
                    fontFamily: "Product Sans, sans-serif",
                    color: palette.color.gray[900],
                    fontSize: { md: "20px !important", xs: "18px !important" },
                    lineHeight: {
                      md: "24px  !important",
                      xs: "21px !important",
                    },
                    fontWeight: 700,
                  }}
                >
                  Phone
                </Typography>
                <Typography
                  variant="display-md1-medium"
                  className="text-md-regular"
                  sx={{
                    fontFamily: "Product Sans, sans-serif",
                    color: palette.text.contactEmailColor,
                    fontSize: {
                      md: "16px !important",
                      xs: "16px !important",
                    },
                    lineHeight: {
                      md: "24px !important",
                      xs: "24px !important",
                    },
                    fontWeight: 400,
                  }}
                >
                  +1 480 920 1123
                </Typography>
              </Stack>
            </Stack>

            {/* thired card */}
            <Stack
              direction={"column"}
              sx={{
                width: { xs: "100%" },
                p: "24px",
                borderRadius: { md: "16px", xs: "16px" },
                border: `1.06px solid #0000001A`,
                alignItems: "center",
                backgroundColor: palette.base.white,
                transition: "all 0.5s ease",
                gap: { md: 3, xs: 2 }, 
                "&:hover": {
                  color: palette.base.white,
                  backgroundColor: palette.primary.main,
                  transform: "scale(1.03)", 
                },
                "&:hover .text-md-regular": {
                  color: palette.base.white, 
                },
                "&:hover .display-sm0-medium": {
                  color: palette.base.white, 
                },
              }}
              onMouseEnter={() => handleBoxMouseEnter(2)} 
              onMouseLeave={handleBoxMouseLeave}
            >
              {hoveredBox === 2 ? (
                <Icon
                  icon="contactWhiteLocationIcon"
                  width={isModile ? 32 : 42}
                  height={isModile ? 32 : 42}
                />
              ) : (
                <Icon
                  icon="contactLocationIcon"
                  width={isModile ? 32 : 42}
                  height={isModile ? 32 : 2}
                />
              )}
              <Stack
                direction={"column"}
                gap={{ sm: 1.5, xs: 1 }}
                alignItems={"center"}
              >
                <Typography
                  variant="display-sm0-medium"
                  className="display-sm0-medium"
                  sx={{
                    width: "auto",
                    textAlign: "center",
                    fontFamily: "Product Sans, sans-serif",
                    color: palette.color.gray[900],
                    fontSize: { md: "20px !important", xs: "18px !important" },
                    lineHeight: {
                      md: "24px  !important",
                      xs: "21px !important",
                    },
                    fontWeight: 700,
                  }}
                >
                  Address
                </Typography>
                <Typography
                  variant="text-md-regular"
                  className="text-md-regular"
                  sx={{
                    fontFamily: "Product Sans, sans-serif",
                    textAlign: "center",
                    color: palette.text.contactEmailColor,
                    fontSize: {
                      md: "16px !important",
                      xs: "16px !important",
                    },
                    lineHeight: {
                      md: "24px !important",
                      xs: "24px !important",
                    },
                    fontWeight: 400,
                    mt: { md: 0, xs: 1 },
                  }}
                >
                  11133 Shady Trail PMB 205 Dallas, TX 75229
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </>
  );
};
export default TermsAndConditions;
