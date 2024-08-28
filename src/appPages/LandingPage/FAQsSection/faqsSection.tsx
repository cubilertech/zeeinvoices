"use client";
import { AccordionCard } from "@/components/AccordionCard";
import { palette } from "@/theme/palette";
import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";

const accordionData = [
  {
    title: "Is there a free trial available?",
    desc: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    title: "Can I change my plan later?",
    desc: "You can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    title: "What is your cancellation policy?",
    desc: "You can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    title: "Can other info be added to an invoice?",
    desc: "You can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    title: "How do I change my account email?",
    desc: "You can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
];

const FAQsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Box
      sx={{
        width: "100%",
        py: 9,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: "10px",
        }}
      >
        <Typography variant="display-lg-bold" sx={{ textAlign: "center" }}>
          Frequently asked questions
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="text-xl-regular"
          sx={{ textAlign: "center", color: palette.color.gray[725] }}
        >
          Everything you need to know about the product and billing.
        </Typography>
      </Box>
      <Stack
        direction={"column"}
        gap={5}
        sx={{ display: "flex", mx: "22%", mt: "5%", justifyContent: "center" }}
      >
        {accordionData.map((item, index) => (
          <AccordionCard
            key={index}
            title={item.title}
            desc={item.desc}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </Stack>
    </Box>
  );
};
export default FAQsSection;
