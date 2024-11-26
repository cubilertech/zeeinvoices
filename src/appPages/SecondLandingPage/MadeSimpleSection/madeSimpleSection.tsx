"use client";
import { ExpandableText } from "@/components/ExpandableText";
import { palette } from "@/theme/palette";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import "@/Styles/sectionStyle.css";
import { useTranslation } from "react-i18next";

const expandableTextData = [
  {
    title1: "Mobile",
    title2: "Friendly",
    desc: "Create and send professional invoices from anywhere with our mobile-friendly invoice generator. ZeeInvoices offers fast invoicing solutions for businesses on the go.",
    lang:'friendlyDesc'
  },
  {
    title1: "Save",
    title2: "Time",
    desc: "Streamline invoicing tasks like billing and payment tracking, allowing you to focus on what matters most.",
    lang:'timeDesc'
  },
  {
    title1: "Security",
    title2: "First",
    desc: "Your data is secured with top-tier protection, ensuring privacy and safety for your business transactions.",
    lang:'securityDesc'
  },
];

const MadeSimpleSection = () => {
  const { t } = useTranslation('common');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement | null>(null); 
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
          gap={3}
          sx={{
            width: "100%",
            pt: { sm: 10, xs: 5 },
            pb: 0,
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
                color: palette.color.gray[900],
                fontSize: { md: "48px", xs: "24px" },
                lineHeight: { md: "64px", xs: "29px" },
                fontWeight: { md: 700 },
              }}
            >
              {t('Invoicing')}{" "}
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
                {t('Made Simple')}
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
            {t('sampleDesc')}
          </Typography>
          <Stack
            direction={{ md: "row", xs: "column-reverse" }}
            gap={{ md: 7.5, xs: 5 }}
            sx={{
              display: "flex",
              alignItems: { sm: "center" },
              mt: { md: "3%", xs: "1%" },
            }}
          >
            {/* left section */}
            <Box>
              <Image
                src="/Images/simple-mobile-image-1.webp"
                width={437}
                height={462}
                alt="mobile-friendly invoice generator with easy to use interface"     
                placeholder="blur" 
                blurDataURL="/Images/simple-mobile-image-01.png" 
              />
            </Box>

            {/* right section */}
            <Stack
              direction={"column"}
              gap={3}
              sx={{
                width: { md: "652px", xs: "343px" },
                maxHeight: { sm: "312px", xs: "254px" },
              }}
            >
              {expandableTextData.map((item, index) => (
                <ExpandableText
                  key={index}
                  title1={item.title1}
                  title2={item.title2}
                  lang={item.lang}
                  desc={item.desc}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                  onComplete={handleComplete} 
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
