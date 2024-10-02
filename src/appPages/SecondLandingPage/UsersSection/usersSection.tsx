"use client";
import { SelectableComment } from "@/components/SelectableComment";
import { palette } from "@/theme/palette";
import {
  Avatar,
  Box,
  Button,
  Container,
  Rating,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const expandableTextData = [
  {
    title1: "James",
    title2: "Collin",
    imgSrc: "/Images/james-image.svg",
    desc: "Designer",
  },
  {
    title1: "Jessica",
    title2: "Johnson",
    imgSrc: "/Images/jessica-image.svg",
    desc: "COO",
  },
  // {
  //   title1: "Jhon",
  //   title2: "William",
  //   imgSrc: "/Images/jhon-image.svg",
  //   desc: "COO, Sisyphus",
  // },
];

const commentTextData = [
  {
    title1: "It was great experience!",
    title2: "",
    rating: 5,
    desc1:
      "I love the intuitive interface and the professional templates. ZeeInvoices has made invoicing so much easier for my business.",
    desc2: "",
  },
  {
    title1: "It was a great tool!",
    title2: "",
    rating: 5,
    desc1:
      "ZeeInvoices is a game-changer. The automated reminders help me get paid faster, and the customization options are perfect for my brand.",
    desc2: "",
  },
  // {
  //   title1: "Great experience!",
  //   title2: "",
  //   rating: 5,
  //   desc1:
  //     "I recently used Zeeinvoice and I’m thoroughly impressed. The user interface is incredibly intuitive and easy to navigate. ",
  //   desc2: "",
  // },
];

const UsersSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null); // Ref to observe the section
  const [openIndex, setOpenIndex] = useState<number>(0); // for expanding the text description.
  const [isTransitioning, setIsTransitioning] = useState(false);

  // const handleToggle = (index: number) => {
  //   setOpenIndex(openIndex === index ? index : index);
  // };

  const handleToggle = (index: number) => {
    // Start the fade-out transition
    setIsTransitioning(true);

    setTimeout(() => {
      // Once the transition is complete, update the openIndex and fade back in
      setOpenIndex(index);
      setIsTransitioning(false);
    }, 250); // This should match the CSS transition duration
  };

  const route = useRouter();

  const handleComplete = () => {
    const nextIndex = (openIndex + 1) % expandableTextData.length;
    handleToggle(nextIndex); // Use handleToggle to ensure fade effect
  };

  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 200); // 200ms matches the CSS transition duration

    return () => clearTimeout(timeout);
  }, [openIndex]);

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
        // pt: 3,
        // pb: { sm: 7, xs: 4 },
        backgroundColor: palette.base.white,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { md: "0%", lg: "0%", xs: "0%" } }}>
        <Stack
          direction={"column"}
          gap={3}
          sx={{
            width: "100%",
            pt: 5,
            pb: { sm: 7, xs: 4 },
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
              What Our{" "}
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
                Users Say
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
            Thousands of businesses trust Zeeinvoices to get paid faster.
          </Typography>
          <Stack
            direction={{ md: "row", xs: "column" }}
            gap={{ sm: 9, xs: 1 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "3%",
              alignItems: { xs: "center" },
            }}
          >
            {/* left section */}
            <Stack
              direction={"column"}
              gap={3}
              sx={{ width: { md: "560px", xs: "335px" } }}
            >
              {expandableTextData.map((item, index) => (
                <SelectableComment
                  key={index}
                  imgSrc={item.imgSrc}
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
            <Stack
              direction={"column"}
              gap={1}
              sx={{
                opacity: isTransitioning ? 0 : 1,
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              <Typography
                variant="display-md1-medium"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.base.black,
                  fontSize: { md: "28px", xs: "14px" },
                  lineHeight: { md: "32px", xs: "32px" },
                  fontWeight: { md: 400 },
                }}
              >
                {commentTextData[openIndex].title1}
              </Typography>
              <Rating
                name="half-rating-read"
                defaultValue={commentTextData[openIndex].rating}
                precision={0.5}
                size="small"
                readOnly
                sx={{ color: "#FCC214" }}
              />
              <Typography
                variant="text-xl-regular"
                sx={{
                  width: { md: "560px", xs: "335px" },
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.color.gray[745],
                  fontSize: { md: "20px", xs: "12px" },
                  lineHeight: { md: "24px", xs: "18px" },
                  fontWeight: { md: 400 },
                }}
              >
                {commentTextData[openIndex].desc1}
              </Typography>
              <Typography
                variant="text-xl-regular"
                sx={{
                  width: { md: "560px", xs: "335px" },
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.color.gray[745],
                  fontSize: { md: "20px", xs: "12px" },
                  lineHeight: { md: "24px", xs: "18px" },
                  fontWeight: { md: 400 },
                }}
              >
                {commentTextData[openIndex].desc2}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};
export default UsersSection;
