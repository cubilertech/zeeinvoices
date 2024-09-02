"use client";
import { AccordionCardRightIcon } from "@/components/AccordionCardRightIcon";
import { palette } from "@/theme/palette";
import { Stack, Typography } from "@mui/material";
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
        py: 9,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction={"row"} gap={2}>
        <Typography
          variant="display-lg-bold"
          sx={{
            fontFamily: "Product Sans, sans-serif",
            color: palette.color.gray[805],
          }}
        >
          Frequently
        </Typography>
        <Typography
          variant="display-lg-bold"
          sx={{
            fontFamily: "Product Sans, sans-serif",
            background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          }}
        >
          Asked Questions
        </Typography>
      </Stack>
      <Typography
        variant="text-xl-regular"
        sx={{
          fontFamily: "Product Sans, sans-serif",
          color: palette.color.gray[745],
        }}
      >
        Thousands of businesses trust Zeeinvoices to get paid faster.ZeeInvoices
        to get paid faster faster.
      </Typography>
      <Stack
        direction={"column"}
        gap={0}
        sx={{ display: "flex", mx: "3%", mt: "5%", justifyContent: "center" }}
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
    </Stack>
  );
};
export default FAQsSection;
