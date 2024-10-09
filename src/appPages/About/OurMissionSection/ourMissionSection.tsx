"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "@/Styles/sectionStyle.css";

const OurMissionSection = () => {
  const isModile = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <Container
        className="mainContainer"
        sx={{ py: { sm: 12, xs: 3 }, px: { md: "0.1%", lg: "0.1%", xs: "0%" } }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: { sm: 4, xs: 10 },
            alignItems: "center",
            flexDirection: { sm: "row", xs: "column-reverse" },
          }}
        >
          <Box
            sx={{
              width: { sm: "48%", xs: "100%" },
              display: "flex",
              gap: { sm: 2, xs: 1 },
              alignItems: "end",
              height: { sm: "562px", xs: "300px" },
              justifyContent: { sm: "", xs: "center" },
            }}
          >
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
                  backgroundImage: "url(/Images/about/ourMission-image-2.svg)",
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
                  backgroundImage: "url(/Images/about/ourMission-image-3.svg)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}
              ></Box>
            </Stack>
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
          </Box>
          <Box
            sx={{
              width: { sm: "48%", xs: "100%" },
              textAlign: { sm: "start", xs: "center" },
            }}
          >
            <Typography
              variant={isModile ? "display-sm2-bold" : "display-lg-bold"}
              color={palette.color.gray[900]}
              mb={{ sm: 2, xs: 1 }}
              sx={{ fontFamily: "Product Sans,sans-serif" }}
              component={"h1"}
            >
              Our{" "}
              <span
                style={{
                  // color: palette.text.contactEmailColor,
                  background:
                    "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Mission
              </span>
            </Typography>

            <Typography
              variant={isModile ? "text-lg-regular" : "text-xl-regular"}
              component={"p"}
              color={palette.color.gray[610]}
              sx={{ fontFamily: "Product Sans,sans-serif" }}
            >
              At ZeeInvoices, our mission is to empower small businesses and
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
