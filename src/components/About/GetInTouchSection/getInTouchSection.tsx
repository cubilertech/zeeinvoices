"use client";
import { AccordionCardRightIcon } from "@/components/AccordionCardRightIcon";
import GetTouchForm from "@/components/GetTouchedFrom/getTouchedFrom";
import { palette } from "@/theme/palette";
import {
  Box,
  Container,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

const accordionData = [
  {
    title:
      "Can i change my plan later, Can i change my plan later, Can i change my plan later?",
    desc: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    title:
      "Is there a free trial availableIs there a free trial availableIs there a free trial available?",
    desc: "You can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    title:
      "Is there a free trial availableIs there a free trial availableIs there a free trial available?",
    desc: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.t, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    title:
      "Is there a free trial availableIs there a free trial availableIs there a free trial available?",
    desc: "You can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
];
const GetInTouchSection = () => {
  const isModile = useMediaQuery("(max-width: 600px)");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant={isModile ? "h5" : "display-lg-bold"}
            color={palette.color.gray[805]}
            mb={2}
            component={"p"}
          >
            Get In{" "}
            <span style={{ color: palette.text.contactEmailColor }}>Touch</span>
          </Typography>
          <Typography
            variant={isModile ? "text-xs-regular" : "text-xl-regular"}
            component={"p"}
            color={palette.text.termsdescColor}
          >
            Our friendly team would love to hear from you.
          </Typography>
        </Box>
        <Typography
          variant={isModile ? "h6" : "h4"}
          color={palette.color.gray[805]}
          sx={{ mt: 5 }}
        >
          {" "}
          Why Reach To Us
        </Typography>

        <Box
          sx={{
            py: 3,
            display: "flex",
            justifyContent: "space-between",
            gap: { sm: 0, xs: 3 },
            flexDirection: { sm: "row", xs: "column" },
            alignItems: "center",
          }}
        >
          <Box sx={{ width: {sm:"45%",xs: "100%"} }}>
            {accordionData.map((item, index) => (
              <AccordionCardRightIcon
                key={index}
                title={item.title}
                desc={item.desc}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </Box>
          <Divider variant="fullWidth" orientation="vertical" flexItem />
          <Box sx={{ width: {sm:"40%",xs: "100%"} }}>
            <GetTouchForm />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default GetInTouchSection;
