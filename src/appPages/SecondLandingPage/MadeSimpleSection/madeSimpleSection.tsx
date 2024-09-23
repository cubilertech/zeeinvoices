"use client";
import { ExpandableText } from "@/components/ExpandableText";
import { palette } from "@/theme/palette";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const expandableTextData = [
  {
    title1: "Mobile",
    title2: "Friendly",
    desc: "Reduce manual work with automation, reduce manual ands Reduce manual work with automation, reduce manual asdaReduce manual work with automation, reduce manual asda",
  },
  {
    title1: "Stay",
    title2: "Organized",
    desc: "Reduce manual work with automation.",
  },
  {
    title1: "Automated",
    title2: "Invoicing",
    desc: "Reduce manual work with automation.",
  },
];

const MadeSimpleSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // For expanding the text description.
  const sectionRef = useRef<HTMLDivElement | null>(null); // To reference the section element
  const route = useRouter();

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? index : index);
  };

  const handleComplete = () => {
    setOpenIndex((prevIndex) => {
      const nextIndex = (openIndex as number) + 1;
      return nextIndex >= expandableTextData.length ? 0 : nextIndex;
    });
  };

  // Detect when the section is in view
  useEffect(() => {
    const sectionElement = sectionRef.current; // Capture the current value of sectionRef
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOpenIndex(0); // Set openIndex to 0 when the section is in view
        }
      },
      { threshold: 0.5 } // Trigger when at least 50% of the section is visible
    );

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, []);

  return (
    <Stack
      ref={sectionRef} // Attach the section ref here
      direction={"column"}
      gap={3}
      sx={{
        width: "100%",
        backgroundColor: palette.base.white,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: { md: "0%", lg: "0%", xs: "0%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
                  background:
                    "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
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
            speed.
          </Typography>
          <Stack
            direction={{ md: "row", xs: "column-reverse" }}
            gap={{ md: 8, xs: 4 }}
            justifyContent={"space-between"}
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: { md: "3%", xs: "1%" },
            }}
          >
            {/* left section */}
            <Box sx={{ px: "3%", width: { md: "437px", xs: "335px" } }}>
              <Image
                src="/Images/simple-mobile-image.svg"
                width={437}
                height={462}
                alt="mobile"
              />
            </Box>

            {/* right section */}
            <Stack
              direction={"column"}
              gap={3}
              sx={{ width: { md: "540px", xs: "350px" }, height: "230px" }}
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
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default MadeSimpleSection;
