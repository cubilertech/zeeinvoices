"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTimeField } from "@mui/x-date-pickers/TimeField/useTimeField";
import Image from "next/image";

const OurMissionSection = () => {
  const isModile = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ py: { sm: 9, xs: 3 }, px: { md: "0.1%", lg: "0.1%", xs: "0%" } }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: { sm: 2, xs: 10 },
            alignItems: "center",
            flexDirection: { sm: "row", xs: "column-reverse" },
          }}
        >
          <Box
            sx={{
              width: { sm: "48%", xs: "100%" },
              display: "flex",
              gap: { sm: 1, xs: 0 },
              alignItems: "end",
              height: { sm: "562px", xs: "300px" },
              justifyContent: { sm: "", xs: "center" },
            }}
          >
            <Box
              sx={{
                width: { sm: "347px", xs: "162px" },
                height: { sm: "444px", xs: "247px" },
                overflow: "hidden",
                borderRadius: "8px",
                backgroundImage: "url(/Images/about/ourMission-image-1.svg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 120%",
              }}
            ></Box>
            <Stack
              gap={1}
              mb={3}
              sx={{ flexDirection: "column", height: "100%" }}
            >
              <Box
                sx={{
                  width: { sm: "242px", xs: "142px" },
                  height: "50%",
                  overflow: "hidden",
                  borderRadius: "8px",
                  backgroundImage: "url(/Images/about/ourMission-image-1.svg)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}
              ></Box>
              <Box
                sx={{
                  width: { sm: "242px", xs: "142px" },
                  height: "50%",
                  overflow: "hidden",
                  borderRadius: "8px",
                  backgroundImage: "url(/Images/about/ourMission-image-1.svg)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}
              ></Box>
            </Stack>
          </Box>
          <Box sx={{ width: { sm: "48%", xs: "100%" }, textAlign: "center" }}>
            <Typography
              variant={isModile ? "h5" : "display-lg-bold"}
              color={palette.color.gray[805]}
              mb={{ sm: 2, xs: 1 }}
              component={"h1"}
            >
              Our{" "}
              <span style={{ color: palette.text.contactEmailColor }}>
                Mission
              </span>
            </Typography>

            <Typography
              variant={isModile ? "text-xs-regular" : "text-xl-regular"}
              component={"p"}
              color={palette.color.gray[745]}
            >
              At ZEEinvoices, our mission is to empower small businesses and
              freelancers by providing an intuitive, AI-powered invoicing tool
              that simplifies the billing process. We strive to deliver
              customizable solutions that enhance productivity, ensure accuracy,
              and foster professional relationships, making invoicing effortless
              and efficient for everyone.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default OurMissionSection;
