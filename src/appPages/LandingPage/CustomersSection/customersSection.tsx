"use client";

import { Box, Stack, Typography, IconButton, Rating, styled } from "@mui/material";
import Image from "next/image";
import { useRef } from "react";
import Slider from "react-slick";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { palette } from "@/theme/palette";

const GradientBox = styled(Box)({
  position: "relative",
  width: "100%",
  paddingY: 9,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "conic-gradient(from 180.47deg at 117.4% 50%, #3F4DE1 -72.9deg, #DEDBFA 87.9deg, #3F4DE1 287.1deg, #DEDBFA 447.9deg)",
    opacity: 0.2, 
    zIndex: 0,
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
});

const testimonials = [
  {
    name: "Alisa Hester",
    title: "PM, Hourglass",
    company: "Web Design Agency",
    review: "",
    rating: 5,
    image: "/Images/cc1.jpeg",
  },
  {
    name: "Rich Wilson",
    title: "COO, Command+R",
    company: "Web Development Agency",
    review: "We’ve really sped up our workflow using Untitled.",
    rating: 5,
    image: "/Images/cc2.jpeg",
  },
  {
    name: "Annie Stanley",
    title: "Designer, Catalog",
    company: "UX Agency",
    review: "This product has transformed our design process.",
    rating: 5,
    image: "/Images/cc3.jpeg",
  },
];

const CustomersSection = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <GradientBox>
      <Box
        sx={{
          width: "100%",
          py: 9,
          // background:
          //   "conic-gradient(from 180.47deg at 117.4% 50%, #3F4DE1 -72.9deg, #DEDBFA 87.9deg, #3F4DE1 287.1deg, #DEDBFA 447.9deg)",
          justifyContent: "center",
          alignItems: "center",
          // textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            //   my: "10px",
          }}
        >
          <Typography
            variant="display-lg-bold"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Our customers
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="text-xl-regular"
            sx={{ mb: 7, color: palette.color.gray[725], textAlign: "center" }}
          >
            Hear from some of our amazing customers who are building faster.
          </Typography>
        </Box>

        <Stack direction={"column"} gap={3} sx={{ pl: "4%" }}>
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial, index) => (
              <Box
                key={index}
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                  width: "360px !important",
                  height: "480px !important",
                  background: "#0000004D",
                  // width: "20% !important",
                  // height: "20% !important",
                }}
              >
                <Box
                  sx={{
                    background: "#0000004D",
                    borderRadius: "12px",
                    zIndex: -1,
                    position: "absolute",
                    width: "360px !important",
                    height: "480px !important",
                    // width: "20% !important",
                    // height: "20% !important",
                  }}
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    // width={360}
                    // height={480}
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
                <Box
                  sx={{
                    // filter: "blur(4px)",
                    // background: "#FFFFFF4D",
                    background: "rgba(255, 255, 255, 0.3)",
                    borderRadius: "6px",
                    position: "absolute",
                    left: "6.5%",
                    bottom: "5%",
                    width: "87%",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    p: 1,
                    border: `1px solid #FFFFFF80`,
                    color: "#fff",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontStyle: "italic", mb: 1 }}
                  >
                    {testimonial.review}
                  </Typography>
                  <Rating
                    name="half-rating-read"
                    defaultValue={4.5}
                    precision={0.5}
                    size="small"
                    readOnly
                    sx={{ color: "#fff" }}
                  />
                  <Typography
                    variant="display-sm-semibold"
                    sx={{ color: palette.base.white }}
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography
                    variant="text-lg-semibold"
                    sx={{ color: palette.base.white }}
                  >
                    {testimonial.title}
                  </Typography>
                  <Typography
                    variant="text-md-medium"
                    sx={{ color: palette.base.white }}
                  >
                    {testimonial.company}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Slider>

          <Stack direction={"row"} gap={5}>
            <IconButton
              onClick={handlePrev}
              sx={{
                borderRadius: "50px",
                // position: "absolute",
                // top: "50%",
                // left: 0,
                // transform: "translateY(-50%)",
                backgroundColor: "#fff",
                ":hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                borderRadius: "50px",
                // position: "absolute",
                // top: "50%",
                // right: 0,
                // transform: "translateY(-50%)",
                backgroundColor: "#fff",
                ":hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <ArrowForward />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </GradientBox>
  );
};

export default CustomersSection;
