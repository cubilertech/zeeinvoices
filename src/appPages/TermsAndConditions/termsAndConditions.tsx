"use client";
import { ContactInfoCard } from "@/components/ContactInfoCard";
import { TermsConditions } from "@/components/TermsConditions";
import { palette } from "@/theme/palette";
import { Box, Container, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { FooterSection } from "../LandingPage/FooterSection";
import { ExpandableText } from "@/components/ExpandableText";

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
  const [openIndex, setOpenIndex] = useState<number | null>(0); // for expanding the text description.
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? index : index);
  };
  return (
    <>
      <Stack
        direction={"column"}
        gap={3}
        sx={{
          width: "100%",
          // pt: 3,
          // pb: 7,
          backgroundColor: palette.base.white,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg" sx={{ overflowY: "auto", height: "100%" }}>
          <Box sx={{ mt: "9%" }}></Box>
          <Stack direction={"column"} gap={4}>
            {/* <Typography variant="display-md1-semibold">
              Terms and Condition
            </Typography> */}
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
              {/* <hr
              style={{
                margin: "10px 0px 10px 0px",
                height: "0.5px",
                backgroundColor: "rgba(156, 163, 175, 1)",
                color: "rgba(156, 163, 175, 1)",
              }}
            ></hr> */}
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
            {/* <Stack
              direction={"column"}
              gap={3}
              sx={{
                width: "100%",
                ml: "1%",
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
                />
              ))}
            </Stack> */}
            <TermsConditions
              num="1"
              title="1. Introduction"
              description="Please read these Terms and Conditions carefully before using ZEE Invoices. By using the service, you agree to these terms. If you don’t agree, please don’t use the service."
            />
            <TermsConditions
              num="2"
              title="2. Account Registration"
              description="When you create an account, ensure that the information you provide is accurate. You are responsible for keeping your account details secure."
            />
            <TermsConditions
              num="3"
              title="3. Use of Service"
              description="ZEE Invoices is intended for generating and managing invoices. You may only use the service for lawful purposes."
            />
            <TermsConditions
              num="4"
              title="4. Subscription and Payment"
              description="Certain features of ZEE Invoices may require a subscription. By subscribing, you agree to pay the associated fees."
            />
            <TermsConditions
              num="5"
              title="5. Data Privacy"
              description="We respect your privacy. Please refer to our Privacy Policy to understand how we collect, use, and protect your data."
            />
            <TermsConditions
              num="6"
              title="6. Intellectual Property"
              description="All content and software related to ZEE Invoices are owned by us or our licensors. You are granted a limited, non-exclusive license to use the service."
            />
            <TermsConditions
              num="7"
              title="7. Limitations of Liability"
              description='ZEE Invoices is provided "as is" without any warranties. We are not responsible for any losses or damages that may result from using the service.'
            />
            <TermsConditions
              num="8"
              title="8. Termination"
              description="We reserve the right to suspend or terminate your account if you violate these terms."
            />
            <TermsConditions
              num="9"
              title="9. Modifications"
              description="We may update these Terms and Conditions from time to time. Continued use of the service constitutes acceptance of the updated terms."
            />
            <TermsConditions
              num="10"
              title="10. Contact Information"
              description="For any questions or concerns about these Terms and Conditions, please contact us at:"
            />
          </Stack>
          <Stack
            direction={"row"}
            gap={2.5}
            justifyContent={"space-between"}
            sx={{ my: "5%" }}
          >
            <ContactInfoCard
              icon="emailIcon"
              title="Email"
              desc="support@zeeinvoices.com"
            />
            <ContactInfoCard
              icon="markerPinIcon"
              title="Address"
              desc="11133 Shady Trail PMB 205, Dallas, TX 75229"
            />
            <ContactInfoCard
              icon="PhoneIcon"
              title="Phone"
              desc="+1 (480) 920-1123"
            />
          </Stack>
        </Container>
        <FooterSection />
      </Stack>
    </>
  );
};
export default TermsAndConditions;
