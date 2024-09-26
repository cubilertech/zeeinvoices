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
    title2: "1. Information We Collect",
    desc: "We collect information to provide and improve our services. This information is categorized as follows:",
    sections: [
      {
        heading: "a. Personal Information",
        subheadings: [
          "When you register for an account, contact us, or use our services, we may collect the following personal data:",
          "• Full name",
          "• Email address",
          "• Phone number",
          "• Company name",
          "• Billing and payment information (credit card details are handled by secure third-party processors)",
        ],
      },
      {
        heading: "b. Invoice Data",
        subheadings: [
          "As part of our service, you may input data about your clients, such as:",
          "• Client names",
          "• Addresses",
          "• Email addresses",
          "• Invoice details, including amounts, products/services, and payment terms",
        ],
      },
      {
        heading: "c. Technical Data",
        subheadings: [
          "We collect technical data to monitor and improve our services, including:",
          "• IP address",
          "• Browser type and version",
          "• Device type and operating system",
          "• Pages viewed and links clicked",
          "• Access times and dates",
        ],
      },
      {
        heading: "d. Usage Data",
        subheadings: [
          "Usage data includes information about how you use our services, such as the features you access, your preferences, and activities within your account.",
        ],
      },
      {
        heading: "e. Cookies and Tracking Technologies",
        subheadings: [
          "We use cookies, beacons, tags, and scripts to track your interaction with our service. You may disable cookies via your browser settings, but this may affect your experience with our services.",
        ],
      },
    ],
  },
  {
    title1: "",
    title2: "2. How We Use Your Information",
    desc: "We use the collected data for the following purposes:",
    sections: [
      {
        heading: "•	Account Management:",
        subheadings: [
          "To register and manage your account, provide customer support, and communicate with you.",
        ],
      },
      {
        heading: "•	Invoice Generation:",
        subheadings: [
          "To enable you to create, customize, and manage invoices and billing records.",
        ],
      },
      {
        heading: "• Payment Processing:",
        subheadings: [
          "To process payments, refunds, and handle billing inquiries.",
        ],
      },
      {
        heading: "•	Service Improvement:",
        subheadings: [
          "To analyze usage, monitor trends, and improve the functionality and performance of our software.",
        ],
      },
      {
        heading: "•	Marketing:",
        subheadings: [
          "To send newsletters, promotions, and updates about our services (you may opt out at any time).",
        ],
      },
      {
        heading: "•	Compliance:",
        subheadings: [
          "To comply with legal requirements, resolve disputes, and enforce our terms of service.",
        ],
      },
    ],
  },
  {
    title1: "",
    title2: "3. How We Share Your Information",
    desc: "We do not sell, trade, or rent your personal information. However, we may share your information in the following circumstances:",
    sections: [
      {
        heading: "a. Service Providers:",
        subheadings: [
          "We work with third-party providers who assist us in delivering our services, such as payment processors, hosting providers, and analytics services. These providers are bound by contractual obligations to protect your data.",
        ],
      },
      {
        heading: "b. Legal Obligations:",
        subheadings: [
          " We may disclose your information if required by law, court order, or governmental regulations, or to protect our rights, safety, and property, or those of others.",
        ],
      },
      {
        heading: "c. Business Transfers:",
        subheadings: [
          "If we are involved in a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction.",
        ],
      },
      {
        heading: "d. With Your Consent:",
        subheadings: [
          "We may share your information with third parties when you have given explicit consent.",
        ],
      },
    ],
  },
  {
    title1: "",
    title2: "4. Data Security",
    desc: "We employ a variety of security measures to protect your information, including encryption, firewalls, and secure access controls. Despite our efforts, no data transmission over the internet can be guaranteed as 100% secure. You are responsible for maintaining the confidentiality of your login credentials.",
  },
  {
    title1: "",
    title2: "5. Data Retention",
    desc: "We retain your data for as long as your account is active or as needed to provide you with our services, comply with legal obligations, resolve disputes, and enforce our agreements. You may request the deletion of your account and data at any time by contacting us.",
  },
  {
    title1: "",
    title2: "6. Your Rights and Choices",
    desc: "Depending on your location, you may have the following rights regarding your data:",
    sections: [
      {
        heading: "a. Access:",
        subheadings: ["Request access to the personal data we hold about you."],
      },
      {
        heading: "b. Correction:",
        subheadings: [
          "Request corrections to any inaccurate or incomplete data.",
        ],
      },
      {
        heading: "c. Deletion:",
        subheadings: [
          "Request the deletion of your data, subject to certain legal restrictions.",
        ],
      },
      {
        heading: "d. Portability:",
        subheadings: [
          "Receive a copy of your data in a structured, commonly used format.",
        ],
      },
      {
        heading: "e. Object/Restrict:",
        subheadings: ["Object to or restrict the processing of your data."],
      },
      {
        heading: "f. Marketing Opt-Out:",
        subheadings: [
          "You can opt out of marketing communications at any time by following the unsubscribe instructions in our emails. To exercise these rights, please contact us at support@zeeinvoices.com.",
        ],
      },
    ],
  },
  {
    title1: "",
    title2: "7. International Data Transfers",
    desc: "ZeeInvoices operates globally, and your data may be transferred to and stored in countries outside your country of residence, including countries that may not offer the same level of data protection as your own. We ensure that adequate safeguards are in place to protect your information, such as standard contractual clauses approved by relevant authorities.",
  },
  {
    title1: "",
    title2: "8. Third-Party Integrations and Links",
    desc: "Our services may include links to third-party websites or integrations with third-party services. We are not responsible for the privacy practices or content of these external sites. Please review the privacy policies of any third-party services you use in connection with our software.",
  },
  {
    title1: "",
    title2: "9. GDPR Compliance (For EU Users)",
    desc: "If you are an EU resident, we comply with the General Data Protection Regulation (GDPR). As a data controller, we process your data based on legitimate interests, consent, contractual obligations, or legal requirements. You have the right to lodge a complaint with a supervisory authority if you believe your data is being mishandled.",
  },
  {
    title1: "",
    title2: "10. CCPA Compliance (For California Residents)",
    desc: "If you are a California resident, you have the right to:",
    sections: [
      {
        heading: "",
        subheadings: [
          "• Request information about the categories and specific pieces of personal information we collect and share.",
          "• Request the deletion of your personal information.",
          "• Opt-out of the sale of your personal information (we do not sell your data).",
          "To exercise these rights, contact us at support@zeeinvoices.com.",
        ],
      },
    ],
  },
  {
    title1: "",
    title2: "11. Children’s Privacy",
    desc: "Our services are not intended for individuals under the age of 16, and we do not knowingly collect personal data from children. If we become aware of such data, we will take steps to delete it promptly.",
  },
  {
    title1: "",
    title2: "12. User Responsibilities",
    desc: "You are responsible for ensuring that any data you provide through our services complies with applicable laws and does not infringe on the rights of third parties. Please refrain from uploading sensitive personal information (e.g., Social Security numbers, financial account information) unless necessary for invoice processing.",
  },
  {
    title1: "",
    title2: "13. Changes to This Privacy Policy",
    desc: "We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or service enhancements. Any changes will be posted on this page with an updated 'Effective Date.' Your continued use of our services after such changes indicates your acceptance of the revised policy.",
  },
  {
    title1: "",
    title2: "14. Contact Us",
    desc: "If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:",
  },
];

interface PrivacyPolicy {}
const PrivacyPolicy: FC<PrivacyPolicy> = ({}) => {
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
          pb: "30px",
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
                Privacy{" "}
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
                  Policy
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
                See our privacy policy
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
                ZeeInvoices (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
                respects your privacy and is committed to protecting your
                personal information. This Privacy Policy describes the types of
                information we collect, how we use it, how we protect it, and
                your rights concerning your data. This policy applies to all
                users of our website{" "}
                <a
                  href="https://www.zeeinvoices.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#4F35DF" }}
                >
                  https://www.zeeinvoices.com/
                </a>{" "}
                and our invoicing software (&quot;Services&quot;).
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
                  +1 480 920 1123
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </>
  );
};
export default PrivacyPolicy;
