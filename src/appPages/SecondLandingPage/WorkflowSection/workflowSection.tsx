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
    desc: "Reduce manual work with automation, reduce manual ands Reduce manual work with automation, reduce manual asdaReduce manual work with automation, reduce manual asda.",
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

const WorkflowSection = () => {
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
            fontSize: { md: "48px", xs: "24px" },
            lineHeight: { md: "64px", xs: "29px" },
            fontWeight: { md: 700 },
          }}
        >
          Invoicing{" "}
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
            Made Simple
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
        Get paid faster with a tool that’s designed for simplicity and
        speed.designed for simplicity and speed.
      </Typography>
      <Stack
        direction={{ md: "row", xs: "column-reverse" }}
        gap={8}
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "3%",
          mx: { md: "0px", xs: "30px" },
        }}
      >
        {/* left section */}
        <Stack
          direction={"column"}
          gap={3}
          sx={{ width: { md: "540px", xs: "335px" } }}
        >
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

        {/* right section */}
        <Box sx={{ width: { md: "580px", xs: "335px" } }}>
          <Image
            src="/Images/workflow-image.svg"
            width={581}
            height={384}
            alt="rectangle iaptop bg"
          />
        </Box>
      </Stack>
    </Stack>
  );
};
export default WorkflowSection;
