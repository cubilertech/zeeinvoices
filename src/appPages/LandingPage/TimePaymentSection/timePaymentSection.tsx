"use client";
import { Icon } from "@/components/Icon";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";

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
    opacity: 0.2, // Adjust opacity as needed
    zIndex: 0,
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
});

const TimePaymentSection = () => {
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
        }}
      >
        <Stack
          direction={"row"}
          gap={5}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {/* left features section */}

          <Stack direction={"column"} gap={8} sx={{ width: "530px" }}>
            <Typography variant="display-lg-bold">
              Save time and get paid fast
            </Typography>

            <Stack direction={"column"} gap={3}>
              <Stack direction={"row"} gap={2}>
                <Box
                  sx={{
                    width: "22px",
                    height: "22px",
                    backgroundColor: "#3F4DE1",
                    borderRadius: 45,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <Icon icon="tickIcon" width={10} height={7} />
                </Box>
                <Typography variant="text-md-regular">
                  Lorem ipsum may be used as a placeholder before
                </Typography>
              </Stack>

              <Stack direction={"row"} gap={2}>
                <Box
                  sx={{
                    width: "22px",
                    height: "22px",
                    backgroundColor: "#3F4DE1",
                    borderRadius: 45,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <Icon icon="tickIcon" width={10} height={7} />
                </Box>
                <Typography variant="text-md-regular">
                  Lorem ipsum may be used as a placeholder before
                </Typography>
              </Stack>

              <Stack direction={"row"} gap={2}>
                <Box
                  sx={{
                    width: "22px",
                    height: "22px",
                    backgroundColor: "#3F4DE1",
                    borderRadius: 45,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <Icon icon="tickIcon" width={10} height={7} />
                </Box>
                <Typography variant="text-md-regular">
                  Lorem ipsum may be used as a placeholder before
                </Typography>
              </Stack>

              <Stack direction={"row"} gap={2}>
                <Box
                  sx={{
                    width: "22px",
                    height: "22px",
                    backgroundColor: "#3F4DE1",
                    borderRadius: 45,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <Icon icon="tickIcon" width={10} height={7} />
                </Box>
                <Typography variant="text-md-regular">
                  Lorem ipsum may be used as a placeholder before
                </Typography>
              </Stack>

              <Stack direction={"row"} gap={2}>
                <Box
                  sx={{
                    width: "22px",
                    height: "22px",
                    backgroundColor: "#3F4DE1",
                    borderRadius: 45,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <Icon icon="tickIcon" width={10} height={7} />
                </Box>
                <Typography variant="text-md-regular">
                  Lorem ipsum may be used as a placeholder before
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* right features section */}
          <Box sx={{ position: "relative" }}>
            <Box sx={{}}>
              <Image
                src="/Images/time-payment-image.svg"
                width={551}
                height={504}
                alt="rectangle iaptop bg"
              />
            </Box>
            <Box sx={{ position: "absolute", left: "45%", top: "10%" }}>
              <Image
                src="/Images/time-payment-2-image.svg"
                width={260}
                height={280}
                alt="rectangle iaptop bg"
              />
            </Box>
          </Box>
        </Stack>
      </Box>
    </GradientBox>
  );
};
export default TimePaymentSection;
