"use client";
import { AccordionCardRightIcon } from "@/components/AccordionCardRightIcon";
import GetTouchForm from "@/components/GetTouchedFrom/getTouchedFrom";
import { palette } from "@/theme/palette";
import {
  Box,
  Container,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

const accordionData = [
  {
    title: "Can I change my plan later?",
    desc: "Yes, you can easily change your plan whenever you need to, whether you're upgrading or downgrading, and the process is quick.",
  },
  {
    title: "Is there a free trial available?",
    desc: "Yes! Enjoy a 30-day free trial to explore our features without any commitment.",
  },
  {
    title: "What support do you provide?",
    desc: "We offer a free personalized onboarding call to help you get started quickly and easily.",
  },
  {
    title: "Are there any hidden fees?",
    desc: "No, we believe in clear pricing. You’ll never encounter hidden fees with us.",
  },
  {
    title: "Is my data secure?",
    desc: "Yes, your data is fully encrypted and stored securely. We prioritize your privacy and ensure your information is protected at all times.",
  },
  {
    title: "Do you offer discounts for annual plans?",
    desc: "Yes, we offer significant discounts when you choose an annual plan. It's a great way to save while enjoying uninterrupted access to our services.",
  },
];

const GetInTouchSection = () => {
  const isModile = useMediaQuery("(max-width: 600px)");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ py: 6, px: { md: "0.1%", lg: "0.1%", xs: "0%" } }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant={isModile ? "h5" : "display-lg-bold"}
            color={palette.color.gray[805]}
            mb={2}
            component={"p"}
          >
            Get In{" "}
            <span style={{ color: palette.text.contactEmailColor }}>Touch</span>
          </Typography>
          <Typography
            variant={isModile ? "text-xs-regular" : "text-xl-regular"}
            component={"p"}
            color={palette.text.termsdescColor}
          >
            Our friendly team would love to hear from you.
          </Typography>
        </Box>
        <Typography
          variant={isModile ? "h6" : "h4"}
          color={palette.color.gray[805]}
          sx={{ mt: 5 }}
        >
          {" "}
          Why Reach To Us
        </Typography>

        <Box
          sx={{
            height: { sm: "530px", xs: "800px" },
            // py: 3,
            display: "flex",
            justifyContent: "space-between",
            gap: { sm: 0, xs: 3 },
            flexDirection: { sm: "row", xs: "column" },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: { sm: "45%", xs: "100%" },
              mt: "1%",
              alignSelf: "self-start",
            }}
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
          </Box>
          <Divider variant="fullWidth" orientation="vertical" flexItem />
          <Box sx={{ width: { sm: "40%", xs: "100%" } }}>
            <GetTouchForm />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default GetInTouchSection;
