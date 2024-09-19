"use client";
import { ExpandableText } from "@/components/ExpandableText";
import { palette } from "@/theme/palette";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const expandableTextData = [
  {
    title1: "Efficiency",
    desc: "Save time by automating your invoicing process. Send invoices in just a few clicks and track payments effortlessly.",
  },
  {
    title1: "Customization",
    desc: "Tailor your invoices to match your brand’s identity. Our templates are fully customizable to reflect your business’s unique style.",
  },
  {
    title1: "Support",
    desc: "We’re here to help whenever you need it. Our dedicated support team is available to assist you with any questions or issues you may encounter.",
  },
];

const ChooseZeeInvoiceSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null); // Ref to observe the section
  const isModile = useMediaQuery("(max-width: 600px)");
  const [openIndex, setOpenIndex] = useState<number | null>(0); // for expanding the text description.
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
        observer.unobserve(sectionElement); // Clean up the observer
      }
    };
  }, []);

  return (
    <>
      <Box
        ref={sectionRef}
        sx={{
          backgroundColor: "#F7F8F9",
          width: "100%",
          py: { sm: "50px", xs: 3 },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ px: { md: "0.1%", lg: "0.1%", xs: "0%" } }}
        >
          <Box textAlign={"center"}>
            <Typography
              variant={isModile ? "h5" : "display-lg-bold"}
              color={palette.color.gray[805]}
              mb={{ sm: 3, xs: 1 }}
              component={"p"}
            >
              Why Choose{" "}
              <span style={{ color: palette.text.contactEmailColor }}>
                ZeeInvoice
              </span>
            </Typography>
            <Typography
              component={"p"}
              variant={isModile ? "text-xs-regular" : "text-xl1-regular"}
              color={palette.color.gray[745]}
            >
              See What Benefits We Are Offing Right Now
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: { sm: 5, xs: 3 },
              flexDirection: { sm: "row", xs: "column" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                width: { sm: "50%", xs: "100%" },
              }}
            >
              {expandableTextData.map((item, index) => (
                <ExpandableText
                  key={index}
                  title1={item.title1}
                  // title2={item.title2}
                  desc={item.desc}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                  onComplete={handleComplete} // Pass the completion handler
                />
              ))}
            </Box>
            <Box
              sx={{
                width: { sm: "50%", xs: "100%" },
                mt: { sm: 0, xs: 4 },
                height: { sm: "483px", xs: "310px" },
                overflow: "hidden",
                borderRadius: "8px",
                backgroundImage: "url(/Images/about/Why-Choose-US.svg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            ></Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ChooseZeeInvoiceSection;
