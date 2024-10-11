"use client";
import { ExpandableText } from "@/components/ExpandableText";
import { palette } from "@/theme/palette";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "@/Styles/sectionStyle.css";

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
        backgroundColor: palette.base.white,
        justifyContent: "center",
        alignItems: "center",
        mx: { md: "0px", xs: "0px" },
      }}
    >
      <Container
        className="mainContainer"
        sx={{
          px: { md: "0%", lg: "0%", xs: "16px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction={"column"}
          gap={{ sm: 7.5, xs: 4 }}
          sx={{
            width: "100%",
            pt: { sm: 10, xs: 5 },
            pb: { sm: 10, xs: 5 },
            backgroundColor: palette.base.white,
            justifyContent: "center",
            alignItems: "center",
            mx: { md: "0px", xs: "0px" },
          }}
        >
          <Stack
            direction={"column"}
            gap={{ sm: 1.5, xs: 0.5 }}
            sx={{ alignItems: "center" }}
          >
            <Stack direction={"row"} gap={2}>
              <Typography
                variant="display-lg-bold"
                sx={{
                  width: { sm: "auto", xs: "359px" },
                  textAlign: "center",
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.color.gray[900],
                  fontSize: { md: "48px", xs: "26px" },
                  lineHeight: { md: "64px", xs: "32px" },
                  fontWeight: { md: 700 },
                }}
                component={"h1"}
              >
                How{" "}
                <Box
                  component="span"
                  sx={{
                    fontFamily: "Product Sans, sans-serif",
                    fontSize: { md: "48px", xs: "26px" },
                    lineHeight: { md: "64px", xs: "32px" },
                    fontWeight: { md: 700 },
                    background:
                      "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }}
                >
                  ZeeInvoices Helps You?
                </Box>
              </Typography>
            </Stack>
            <Typography
              variant="text-xl-regular"
              sx={{
                width: { md: "772px", xs: "335px" },
                fontFamily: "Product Sans, sans-serif",
                color: palette.color.gray[610],
                fontSize: { md: "20px", xs: "16px" },
                lineHeight: { md: "30px", xs: "24px" },
                fontWeight: { xs: 400 },
                textAlign: { xs: "center" },
              }}
            >
              ZeeInvoices is a free and easy to use invoice generator and
              billing software custom designed to meet your business needs.
            </Typography>
          </Stack>
          <Stack
            direction={{ md: "row", xs: "column" }}
            gap={{ md: 7.5, xs: 2.5 }}
            sx={{
              width: "100%",
              height: "auto",
              display: "flex",
              alignItems: { sm: "center" },
              mx: { md: "0px", xs: "20px" },
            }}
          >
            {/* left section */}
            <Box>
              <Image
                src="/Images/help-image-1.svg"
                width={500}
                height={359}
                alt="ZeeInvoices offers an organized way to process billing and invoices"
              />
            </Box>

            {/* right section */}
            <Stack
              direction={"column"}
              gap={{ sm: 1.5, xs: 1 }}
              sx={{
                width: { md: "720px", xs: "335px" },
                maxHeight: { sm: "359", sx: "246px" },
                justifyContent: "center",
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
