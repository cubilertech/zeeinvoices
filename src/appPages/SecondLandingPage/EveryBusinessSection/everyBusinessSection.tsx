"use client";
import { Icon } from "@/components/Icon";
import { palette } from "@/theme/palette";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EveryBusinessSection = () => {
  const route = useRouter();

  const handleCrtInvButton = (data: any) => {
    route.push("/create-new-invoice");
  };
  return (
    <Stack
      direction={"column"}
      gap={3}
      sx={{
        width: "100%",
        pt: 3,
        pb: 7,
        backgroundColor: "#F7F8F9",
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
          }}
        >
          Built For
        </Typography>
        <Typography
          variant="display-lg-bold"
          sx={{
            fontFamily: "Product Sans, sans-serif",
            background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          }}
        >
          Every Business
        </Typography>
      </Stack>
      <Typography
        variant="text-xl-regular"
        sx={{
          fontFamily: "Product Sans, sans-serif",
          color: palette.color.gray[745],
        }}
      >
        No matter your industry, ZeeInvoices is here to help.ZeeInvoices is here
        to help.ZeeInvoices is here to help.
      </Typography>
      <Stack
        direction={"column"}
        gap={3}
        sx={{ display: "flex", justifyContent: "center", mt: "3%" }}
      >
        {/* upper section */}
        <Stack
          direction={"row"}
          gap={13}
          sx={{
            width: "100%",
            px: "10%",
            py: "9%",
            borderRadius: "30px",
            border: `1.06px solid #0000001A`,
            alignItems: "center",
            backgroundColor: palette.base.white,
          }}
        >
          <Box>
            <Image
              src="/Images/pro-business-image.svg"
              width={243}
              height={243}
              alt="rectangle iaptop bg"
            />
          </Box>

          <Stack direction={"column"} gap={1} sx={{ pl: "12%" }}>
            <Typography
              variant="display-md1-regular"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.base.black,
              }}
            >
              Professional Services
            </Typography>
            <Typography
              variant="text-md-regular"
              sx={{
                width: "500px",
                fontFamily: "Product Sans, sans-serif",
                color: palette.color.gray[745],
              }}
            >
              Our invoice company provides significant benefits for professional
              services. We offer a streamlined platform for creating
            </Typography>
          </Stack>
        </Stack>

        {/* bottom section */}
        <Stack direction={"row"} gap={3}>
          <Stack
            direction={"column"}
            gap={5}
            sx={{
              width: "587px",
              px: "7%",
              py: "5%",
              borderRadius: "30px",
              border: `1.06px solid #0000001A`,
              alignItems: "center",
              backgroundColor: palette.base.white,
            }}
          >
            <Icon icon="handCodingIcon" width={42} height={42} />
            <Typography
              variant="display-sm2-medium"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.base.black,
              }}
            >
              Professional Services
            </Typography>
            <Typography
              variant="text-md-regular"
              sx={{
                width: "400px",
                fontFamily: "Product Sans, sans-serif",
                textAlign: "center",
                color: palette.color.gray[745],
              }}
            >
              Our invoice company provides significant benefits for professional
              services. We offer a streamlined platform for creating
            </Typography>
          </Stack>
          {/* right bottom */}
          <Stack
            direction={"column"}
            gap={5}
            sx={{
              width: "587px",
              px: "7%",
              py: "5%",
              borderRadius: "30px",
              border: `1.06px solid #0000001A`,
              alignItems: "center",
              backgroundColor: palette.primary.main,
            }}
          >
            <Icon icon="gearsIcon" width={42} height={42} />
            <Typography
              variant="display-sm2-medium"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.base.white,
              }}
            >
              Professional Services
            </Typography>
            <Typography
              variant="text-md-regular"
              sx={{
                width: "400px",
                fontFamily: "Product Sans, sans-serif",
                textAlign: "center",
                color: palette.base.white,
              }}
            >
              Our invoice company provides significant benefits for professional
              services. We offer a streamlined platform for creating
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default EveryBusinessSection;
