"use client";
import { ExpandableText } from "@/components/ExpandableText";
import { palette } from "@/theme/palette";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
            pt: { sm: 3, xs: 1 },
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
              color: palette.color.gray[745],
              fontSize: { md: "20px", xs: "12px" },
              lineHeight: { md: "24px", xs: "18px" },
              fontWeight: { md: 400 },
              textAlign: { xs: "center" },
            }}
          >
            Shift your focus from invoicing to what truly matters—growing your
            business!
          </Typography>
          <Stack
            direction={{ md: "row", xs: "column-reverse" }}
            gap={{ sm: 10, xs: 3 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "3%",
              mx: { md: "0px", xs: "1px" },
            }}
          >
            {/* left section */}
            <Stack
              direction={"column"}
              gap={3}
              sx={{ width: { md: "540px", xs: "335px" }, height: "230px" }}
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
            <Box sx={{ width: { md: "580px", xs: "350px" } }}>
              <Image
                src="/Images/workflow-image-1.svg"
                width={580}
                height={384}
                alt="streamline your invoicing process with ZeeInvoices free invoice maker"
              />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};
export default WorkflowSection;
