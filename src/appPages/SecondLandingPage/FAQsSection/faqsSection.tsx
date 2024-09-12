"use client";
import { AccordionCardRightIcon } from "@/components/AccordionCardRightIcon";
import { palette } from "@/theme/palette";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";

const accordionData = [
  {
    title:
      "Can i change my plan later, Can i change my plan later, Can i change my plan later?",
    desc: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    title:
      "Is there a free trial availableIs there a free trial availableIs there a free trial available?",
    desc: "You can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    title:
      "Is there a free trial availableIs there a free trial availableIs there a free trial available?",
    desc: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.t, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    title:
      "Is there a free trial availableIs there a free trial availableIs there a free trial available?",
    desc: "You can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    title:
      "Is there a free trial availableIs there a free trial availableIs there a free trial available?",
    desc: "You can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
];

const FAQsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
        Everything you need to know about the product and billing. about the
        product and billing and billing
      </Typography>
      <Container
        maxWidth="lg"
        sx={{
          overflowY: "auto",
          height: "100%",
          width: { sm: "auto", xs: "90%" },
        }}
      >
        <Stack
          direction={"column"}
          gap={0}
          sx={{ display: "flex", mx: "0%", mt: "5%", justifyContent: "center" }}
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
