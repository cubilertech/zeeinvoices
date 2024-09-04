"use client";
import { ExpandableText } from "@/components/ExpandableText";
import { palette } from "@/theme/palette";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const expandableTextData = [
  {
    title1: "Automated",
    title2: "Invoicing",
    desc: "Reduce manual work with automation, reduce manual work with automation, reduce manual work with automation.",
  },
  {
    title1: "Stay",
    title2: "Organazied",
    desc: "Reduce manual work with automation.",
  },
  {
    title1: "Automated",
    title2: "Invoicing",
    desc: "Reduce manual work with automation.",
  },
];

const HelpSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // for expanding the text description.
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? index : index);
  };
  const route = useRouter();

  const handleComplete = () => {
    setOpenIndex((prevIndex) => {
      const nextIndex = (openIndex as number) + 1;
      return nextIndex >= expandableTextData.length ? 0 : nextIndex;
    });
  };

  return (
    <Stack
      direction={"column"}
      gap={3}
      sx={{
        width: "100%",
        pt: 3,
        pb: 7,
        backgroundColor: palette.base.white,
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
          How
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
          ZeeInvoices Helps?
        </Typography>
      </Stack>
      <Typography
        variant="text-xl-regular"
        sx={{
          fontFamily: "Product Sans, sans-serif",
          color: palette.color.gray[745],
        }}
      >
        Effortless invoicing with essential features, Effortless invoicing with
        essential features. Effortless
      </Typography>
      <Stack
        direction={"row"}
        gap={8}
        sx={{ display: "flex", justifyContent: "center", mt: "3%" }}
      >
        {/* left section */}
        <Box>
          <Image
            src="/Images/help-image.svg"
            width={596}
            height={413}
            alt="rectangle iaptop bg"
          />
        </Box>
        {/* right section */}
        <Stack direction={"column"} gap={3} sx={{ width: "540px" }}>
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
    </Stack>
  );
};
export default HelpSection;
