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

const OurMissionSection = () => {
  const isModile = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <Container maxWidth="lg" sx={{ py: { sm: 9, xs: 3 } }}>
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
              component={"p"}
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
              At ZEE Invoices, our mission is to empower businesses of all sizes
              by providing an easy-to-use invoicing tool that streamlines your
              financial operations. We believe that efficient invoicing is key
              to maintaining healthy cash flow and running a successful
              business.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default OurMissionSection;
