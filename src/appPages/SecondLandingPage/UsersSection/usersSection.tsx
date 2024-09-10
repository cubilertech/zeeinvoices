"use client";
import { SelectableComment } from "@/components/SelectableComment";
import { palette } from "@/theme/palette";
import {
  Avatar,
  Box,
  Button,
  Rating,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const expandableTextData = [
  {
    title1: "James",
    title2: "Collin",
    imgSrc: "/Images/james-image.svg",
    desc: "Designer, Catalog",
  },
  {
    title1: "Jessica",
    title2: "Collin",
    imgSrc: "/Images/jessica-image.svg",
    desc: "Designer, Catalog",
  },
  {
    title1: "Jhon",
    title2: "Jhonson",
    imgSrc: "/Images/jhon-image.svg",
    desc: "COO, Sisyphus",
  },
];

const commentTextData = [
  {
    title1: "It was great experience!",
    title2: "",
    rating: 5,
    desc1:
      "I recently used Zeeinvoice and I’m thoroughly impressed. The user interface is incredibly intuitive and easy to navigate. The available invoice templates are both professional and accurate, which made creating my invoices a breeze.intuitive and easy to navigate. The available invoice templates are both professional and accurate, which made creating my invoices a breeze.",
    desc2:
      "I recently used Zeeinvoice and I’m thoroughly impressed. The user interface is incredibly intuitive and easy to navigate. The available invoice templates are both professional and accurate, which made creating my invoices a breeze.intuitive and easy to navigate. The available invoice templates are both professional and accurate, which made creating my invoices a breeze.",
  },
  {
    title1: "It was a great tool!",
    title2: "",
    rating: 5,
    desc1:
      "I recently used Zeeinvoice and was really impressed. The interface is very easy to use and navigate. The invoice templates are professional and accurate, making it simple for me to create my invoices.",
    desc2:
      "I recently used Zeeinvoice and I’m thoroughly impressed. The user interface is incredibly intuitive and easy to navigate. The available invoice templates are both professional and accurate, which made creating my invoices a breeze.intuitive and easy to navigate. The available invoice templates are both professional and accurate, which made creating my invoices a breeze.",
  },
  {
    title1: "Great experience!",
    title2: "",
    rating: 5,
    desc1:
      "I recently used Zeeinvoice and I’m thoroughly impressed. The user interface is incredibly intuitive and easy to navigate. The available invoice templates are both professional and accurate, which made creating my invoices a breeze.intuitive and easy to navigate. The available invoice templates are both professional and accurate, which made creating my invoices a breeze.",
    desc2:
      "I recently used Zeeinvoice and was really impressed. The interface is very easy to use and navigate. The invoice templates are professional and accurate, making it simple for me to create my invoices.",
  },
];

const UsersSection = () => {
  const [openIndex, setOpenIndex] = useState<number>(0); // for expanding the text description.
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
  return (
    <Stack
      direction={"column"}
      gap={3}
      sx={{
        width: "100%",
        pt: 3,
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
              background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
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
        Thousands of businesses trust Zeeinvoices to get paid faster.ZeeInvoices
        to get paid faster faster.
      </Typography>
      <Stack
        direction={{ md: "row", xs: "column" }}
        gap={8}
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
        <Stack direction={"column"} gap={1}>
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
            defaultValue={5}
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
  );
};
export default UsersSection;
