"use client";
import { SelectableComment } from "@/components/SelectableComment";
import { palette } from "@/theme/palette";
import {
  Box,
  Container,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import "@/Styles/sectionStyle.css";
import { useTranslation } from "react-i18next";

const expandableTextData = [
  {
    title1: "Omar",
    title2: "Hassan",
    imgSrc: "/Images/user-1.webp",
    desc: "Contractor",
  },
  {
    title1: "Emily",
    title2: "Walker",
    imgSrc: "/Images/user-2.webp",
    desc: "Freelancer",
  },
  {
    title1: "Kwame",
    title2: "Okoye",
    imgSrc: "/Images/user-3.webp",
    desc: "Software Engineer",
  },
  {
    title1: "Wei",
    title2: "Chen",
    imgSrc: "/Images/user-4.webp",
    desc: "Web Developer",
  },
];

const commentTextData = [
  {
    title1: "It was great experience!",
    title2: "",
    rating: 5,
    desc1:
      "I love the intuitive interface and the professional templates. ZeeInvoices has made invoicing so much easier for my business.",
    desc2: "",
    lang: 'expDesc1',
  },
  {
    title1: "It was a great tool!",
    title2: "",
    rating: 5,
    desc1:
      "ZeeInvoices is a game-changer. The customization options are perfect for my brand.",
    desc2: "",
    lang:'expDesc2',
  },
  {
    title1: "Great experience!",
    title2: "",
    rating: 5,
    desc1:
      "I recently used Zeeinvoice and I’m thoroughly impressed. The user interface is incredibly intuitive and easy to navigate.",
    desc2: "",
    lang:'expDesc3',
  },
  {
    title1: "Good tool!",
    title2: "",
    rating: 5,
    desc1: "The user interface is incredibly intuitive and easy to navigate.",
    desc2: "",
    lang:'expDesc4',
  },
];

const UsersSection = () => {
  const { t } = useTranslation('common');
  const isMobile = useMediaQuery("(max-width: 600px)");
  const sectionRef = useRef<HTMLDivElement | null>(null); 
  const [openIndex, setOpenIndex] = useState<number>(0); 
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = (index: number) => {
    setIsTransitioning(true);

    setTimeout(() => {
      setOpenIndex(index);
      setIsTransitioning(false);
    }, 250); 
  };

  const handleComplete = () => {
    const nextIndex = (openIndex + 1) % expandableTextData.length;
    handleToggle(nextIndex);
  };

  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 200); 

    return () => clearTimeout(timeout);
  }, [openIndex]);

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
      <Container className="mainContainer" sx={{ px: { md: "0%", lg: "0%", xs: "16px" } }}>
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
          }}
        >
          <Stack
            direction={"column"}
            gap={{ sm: 1.5, xs: 1.5 }}
            sx={{ alignItems: "center" }}
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
                {t('What Our')}{" "}
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
                  {t('Users Say')}
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
              {t('usersSayDesc')}
            </Typography>
          </Stack>
          <Stack
            direction={{ md: "column-reverse", xs: "column" }}
            gap={{ sm: 7.5, xs: 1 }}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: { xs: "center" },
            }}
          >
            {/* left section */}
            <Stack
              direction={{ sm: "row", xs: "column" }}
              gap={{ sm: 1, xs: 1 }}
              justifyContent={"space-around"}
              sx={{ width: { md: "100%", xs: "100%" } }}
            >
              {expandableTextData.map((item, index) => (
                <SelectableComment
                  key={index}
                  openIndex={index}
                  imgSrc={item.imgSrc}
                  title1={item.title1}
                  title2={item.title2}
                  desc={item.desc}
                  commentTextData={commentTextData}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                  onComplete={handleComplete} 
                />
              ))}
            </Stack>

            {/* right section */}
            {!isMobile && (
              <Stack
                direction={"column"}
                gap={2}
                justifyContent={"space-between"}
                sx={{
                  opacity: isTransitioning ? 0 : 1,
                  transition: "opacity 0.3s ease-in-out",
                }}
              >
                <Typography
                  variant="display-md1-medium"
                  sx={{
                    textAlign: "center",
                    fontFamily: "Product Sans, sans-serif",
                    color: palette.color.gray[900],
                    fontSize: { md: "28px", xs: "14px" },
                    lineHeight: { md: "32px", xs: "32px" },
                    fontWeight: { md: 400 },
                  }}
                >
                  {t(commentTextData[openIndex].title1 || '')}
                </Typography>
                <Rating
                  name="half-rating-read"
                  defaultValue={commentTextData[openIndex].rating}
                  precision={0.5}
                  size="small"
                  readOnly
                  sx={{
                    width: "100%",
                    color: "#FCC214",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
                <Typography
                  variant="text-xl-regular"
                  sx={{
                    width: { md: "100%", xs: "335px" },
                    textAlign: "center",
                    fontFamily: "Product Sans, sans-serif",
                    color: palette.color.gray[610],
                    fontSize: { md: "20px", xs: "12px" },
                    lineHeight: { md: "30px", xs: "18px" },
                    fontWeight: { md: 400 },
                  }}
                >
                  {/* {commentTextData[openIndex].desc1} */}
                  {t(commentTextData[openIndex].lang || '')}
                </Typography>
                {commentTextData[openIndex].desc2 !== "" && (
                  <Typography
                    variant="text-xl-regular"
                    sx={{
                      width: { md: "100%", xs: "335px" },
                      textAlign: "center",
                      fontFamily: "Product Sans, sans-serif",
                      color: palette.color.gray[610],
                      fontSize: { md: "20px", xs: "12px" },
                      lineHeight: { md: "30px", xs: "18px" },
                      fontWeight: { md: 400 },
                    }}
                  >
                    {commentTextData[openIndex].desc2}
                  </Typography>
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};
export default UsersSection;
