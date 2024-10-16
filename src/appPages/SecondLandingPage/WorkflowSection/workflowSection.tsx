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
    title1: "Less Time",
    title2: "More Focus",
    desc: "ZeeInvoices reduces the time spent on paperwork so you can focus on what matters—building your business.",
  },
  {
    title1: "Enhance",
    title2: "Your Efficiency",
    desc: "Cut down on invoicing time and focus on expanding your business.",
  },
  {
    title1: "Revitalize",
    title2: "Your Operations",
    desc: "Reduce the time spent on invoicing, allowing more focus on business growth.",
  },
];

const WorkflowSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // for expanding the text description.
  const sectionRef = useRef<HTMLDivElement | null>(null); // Ref to observe the section

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? index : index);
  };

  const handleComplete = () => {
    setOpenIndex((prevIndex) => {
      const nextIndex = (openIndex as number) + 1;
      return nextIndex >= expandableTextData.length ? 0 : nextIndex;
    });
  };

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
        observer.unobserve(sectionElement);
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
            alignItems: "center",
          }}
        >
          <Stack direction={"column"} gap={1.5} sx={{ alignItems: "center" }}>
            <Stack direction={"row"} gap={2}>
              <Typography
                variant="display-lg-bold"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.color.gray[900],
                  fontSize: { md: "48px", xs: "24px" },
                  lineHeight: { md: "64px", xs: "29px" },
                  fontWeight: { md: 700 },
                }}
              >
                Streamline{" "}
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
                  Your Workflow
                </Box>
              </Typography>
            </Stack>
            <Typography
              variant="text-xl-regular"
              sx={{
                width: { md: "100%", xs: "335px" },
                fontFamily: "Product Sans, sans-serif",
                color: palette.color.gray[610],
                fontSize: { md: "20px", xs: "16px" },
                lineHeight: { md: "30px", xs: "24px" },
                fontWeight: { xs: 400 },
                textAlign: { xs: "center" },
              }}
            >
              Shift your focus from invoicing to what truly matters—growing your
              business!
            </Typography>
          </Stack>
          <Stack
            direction={{ md: "row", xs: "column" }}
            gap={{ sm: 8, xs: 2.5 }}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: { sm: "center" },
              mx: { md: "0px", xs: "0px" },
            }}
          >
            {/* left section */}
            <Stack
              direction={"column"}
              gap={3}
              sx={{
                width: { md: "610px", xs: "335px" },
                height: { md: "230px", xs: "234px" },
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

            {/* right section */}
            <Box>
              <Image
                src="/Images/workflow-image-1.svg"
                width={610}
                height={321}
                alt="streamline your invoicing process with ZeeInvoices free invoice maker"
                placeholder="blur" 
                blurDataURL="/Images/workflow-image-01.png" 
              />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};
export default WorkflowSection;
