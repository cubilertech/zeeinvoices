"use client";
import { ExpandableText } from "@/components/ExpandableText";
import { palette } from "@/theme/palette";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import "@/Styles/sectionStyle.css";

const expandableTextData = [
  {
    title1: "Efficiency",
    desc: "With our automated invoicing system, you can streamline your billing process and reduce manual tasks leading to enhance productivity for businesses of all sizes.",
  },
  {
    title1: "Customization",
    desc: "Our customizable invoice templates helps you personalize your invoices ensuring a professional appearance every time.",
  },
  {
    title1: "Support",
    desc: "With AI-powered invoicing you get exceptional support helping businesses of all sizes navigate our with ease.",
  },
];

const ChooseZeeInvoiceSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null); 
  const isModile = useMediaQuery("(max-width: 600px)");
  const [openIndex, setOpenIndex] = useState<number | null>(0); 
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
    const sectionElement = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOpenIndex(0); 
        }
      },
      { threshold: 0.5 }
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
    <>
      <Box
        ref={sectionRef}
        sx={{
          backgroundColor: "#F7F8F9",
          width: "100%",
          px: { sm: "0px", xs: "0px" },
          py: { sm: "50px", xs: 3 },
        }}
      >
        <Container
          className="mainContainer"
          sx={{ px: { md: "0.1%", lg: "0.1%", xs: "0%" } }}
        >
          <Box textAlign={"center"}>
            <Typography
              variant={isModile ? "display-sm2-bold" : "display-lg-bold"}
              color={palette.color.gray[900]}
              mb={{ sm: 3, xs: 1 }}
              component={"p"}
              sx={{
                fontFamily: "Product Sans,sans-serif",
                fontSize: { md: "48px", xs: "26px" },
                lineHeight: { md: "64px", xs: "32px" },
                fontWeight: { xs: 700 },
              }}
            >
              Why Choose{" "}
              <span
                style={{
                  background:
                    "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ZeeInvoices
              </span>
            </Typography>
            <Typography
              component={"p"}
              variant={isModile ? "text-lg-regular" : "text-xl1-regular"}
              color={palette.color.gray[610]}
              sx={{
                fontFamily: "Product Sans,sans-serif",
                fontSize: { md: "20px", xs: "18px" },
                lineHeight: { md: "30px", xs: "28px" },
                fontWeight: { xs: 400 },
                width: { md: "70%" },
                textAlign: "center",
                mx: "auto",
              }}
            >
              Choose ZeeInvoices for enhanced efficiency, extensive
              customization options and exceptional support tailored to your
              invoicing needs.
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
                height: "204px",
                justifyContent: "center",
              }}
            >
              {expandableTextData.map((item, index) => (
                <ExpandableText
                  key={index}
                  title1={item.title1}
                  desc={item.desc}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                  onComplete={handleComplete} 
                />
              ))}
            </Box>
            <Box
              sx={{
                width: { sm: "50%", xs: "100%" },
                mt: { sm: 0, xs: 1 },
                height: { sm: "483px", xs: "310px" },
                overflow: "hidden",
                borderRadius: "8px",
                backgroundImage: "url(/Images/about/Why-Choose-US-1.webp)",
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
