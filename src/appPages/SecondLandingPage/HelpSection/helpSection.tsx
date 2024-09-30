"use client";
import { ExpandableText } from "@/components/ExpandableText";
import { palette } from "@/theme/palette";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const expandableTextData = [
  {
    title1: "Effortless",
    title2: "Invoicing",
    desc: "Streamline your invoicing process with our free invoicing software. simplicity and speed. ZeeInvoices makes it easy to create and manage invoices online, saving you time and effort.",
  },
  {
    title1: "Automated",
    title2: "Invoicing",
    desc: "With our AI-powered invoice generator, you can reduce manual tasks and speed up your invoicing with ease to focus on growing your business.",
  },
  {
    title1: "Stay",
    title2: "Organized",
    desc: "Easily track and manage your invoices with our platform. Our Invoice tracking feature keeps everything in one place, helping you stay on top of payments and never miss a beat.",
  },
];

const HelpSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // for expanding the text description.
  const sectionRef = useRef<HTMLDivElement | null>(null); // Ref to observe the section
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

  // const resetProgress = () => {};

  useEffect(() => {
    const sectionElement = sectionRef.current; // Capture the current value of sectionRef
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOpenIndex(0); // Set openIndex to 0 when the section is in view
        }
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement); // Clean up the observer
      }
    };
  }, []);

  return (
    <Stack
      ref={sectionRef}
      direction={"column"}
      gap={3}
      sx={{
        width: "100%",
        // pt: 3,
        // pb: 7,
        backgroundColor: palette.base.white,
        justifyContent: "center",
        alignItems: "center",
        mx: { md: "0px", xs: "0px" },
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
            mx: { md: "0px", xs: "0px" },
          }}
        >
          <Stack direction={"row"} gap={2}>
            <Typography
              variant="display-lg-bold"
              sx={{
                textAlign: "center",
                fontFamily: "Product Sans, sans-serif",
                color: palette.color.gray[805],
                fontSize: { md: "48px", xs: "24px" },
                lineHeight: { md: "64px", xs: "29px" },
                fontWeight: { md: 700 },
              }}
              component={"h1"}
            >
              How ZeeInvoices{" "}
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
                Helps You?
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
            ZeeInvoices is a free and easy to use invoice generator and billing
            software custom designed to meet your business needs.
          </Typography>
          <Stack
            direction={{ md: "row", xs: "column" }}
            gap={{ md: 8, xs: 2 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "3%",
              mx: { md: "0px", xs: "20px" },
            }}
          >
            {/* left section */}
            <Box>
              <Image
                src="/Images/help-image-1.svg"
                width={596}
                height={413}
                alt="ZeeInvoices offers an organized way to process billing and invoices"
              />
            </Box>
            {/* right section */}
            <Stack
              direction={"column"}
              gap={3}
              sx={{ width: { md: "540px", xs: "335px" }, height: "180px" }}
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
export default HelpSection;
