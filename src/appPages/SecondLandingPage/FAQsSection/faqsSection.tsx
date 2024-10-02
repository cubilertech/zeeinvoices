"use client";
import { AccordionCardRightIcon } from "@/components/AccordionCardRightIcon";
import { palette } from "@/theme/palette";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";

const accordionData = [
  {
    title: "What is ZeeInvoices?",
    desc: "ZeeInvoices is a free online invoicing software that allows businesses to create, customize, and manage invoices quickly and efficiently. Our platform offers features such as branding customization, automated billing, and secure invoice management to streamline your invoicing process.",
  },
  {
    title: "How do I create an account with ZeeInvoices?",
    desc: `
      <style>
        .faqlink {
          color: #4F35DF;
          }
        a:hover {
          color: #4F35DF;
          text-decoration: underline;
        }
      </style>
      You can create an account by visiting <a class = "faqlink" href="https://www.zeeinvoices.com/" target="_blank">https://www.zeeinvoices.com</a> and clicking on the 'Sign Up' button. Follow the registration process by providing your name, email address, and other required information. Once completed, you'll receive a confirmation email to activate your account. It's completely free!
    `,
  },
  {
    title: "Can I customize my invoices with my company branding?",
    desc: "Yes, ZeeInvoices allows you to customize your invoices with your company logo, colors, fonts, and other branding elements. This ensures that your invoices reflect your brand identity and maintain a professional appearance.",
  },
  {
    title: "Is my data secure with ZeeInvoices?",
    desc: "Absolutely! We take data security very seriously. ZeeInvoices employs industry-standard encryption and security measures to protect your personal and invoicing data. Your information is stored securely and is only accessible by you and authorized personnel.",
  },
  {
    title: "Is ZeeInvoices available worldwide?",
    desc: "Yes, ZeeInvoices is available to users all over the world. As long as you have an internet connection, you can access our platform and manage your invoices from any location.",
  },
  {
    title: "Are there any hidden fees or charges for using ZeeInvoices?",
    desc: "No, ZeeInvoices is completely free to use with no hidden fees or charges. You can create and manage your invoices without any cost, and you’ll have access to all the features available on our platform.",
  },
  {
    title: "How can I contact customer support if I need help?",
    desc: `
      <style>
        .faqlink {
          color: #4F35DF;
          }
        a:hover {
          color: #4F35DF;
          text-decoration: underline;
        }
      </style>
      You can reach our customer support team by calling +1 480 920 1123 or by emailing us at <a class = "faqlink" href="https://mail.google.com/mail/?view=cm&to=support@zeeinvoices.com" target="_blank">support@zeeinvoices.com</a>. Our support team is available to assist you with any questions or issues you may have.
    `,
  },
  {
    title:
      "Does ZeeInvoices integrate with other accounting or payment software?",
    desc: "Yes, ZeeInvoices integrates with various accounting and payment software solutions to streamline your invoicing and payment processes. For a complete list of integrations, please visit our website or contact our support team.",
  },
  {
    title: "Is there a limit to how many invoices I can create?",
    desc: "No, there is no limit to the number of invoices you can create with ZeeInvoices. As a free user, you have unlimited access to generate, customize, and manage as many invoices as you need.",
  },
  {
    title: "Can I use ZeeInvoices on multiple devices?",
    desc: "Yes, ZeeInvoices is a cloud-based software that can be accessed from any device with an internet connection. Whether you’re using a computer, tablet, or smartphone, you can manage your invoices from anywhere at any time.",
  },
];

const FAQsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Stack
      direction={"column"}
      gap={3}
      sx={{
        width: "100%",
        py: { md: 9, xs: 2 },
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: palette.base.white,
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
          Frequently{" "}
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
            Asked Questions
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
        Everything you need to know about the product and billing.
      </Typography>
      <Container
        maxWidth="lg"
        sx={{
          overflowY: "auto",
          height: "100%",
          width: { sm: "auto", xs: "90%" },
          px: { md: "0%", lg: "0%", xs: "0%" },
        }}
      >
        <Stack
          direction={"column"}
          gap={0}
          sx={{ display: "flex", mx: "0%", mt: "1%", justifyContent: "center" }}
        >
          {accordionData.map((item, index) => (
            <AccordionCardRightIcon
              key={index}
              title={item.title}
              desc={item.desc}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </Stack>
      </Container>
    </Stack>
  );
};
export default FAQsSection;
