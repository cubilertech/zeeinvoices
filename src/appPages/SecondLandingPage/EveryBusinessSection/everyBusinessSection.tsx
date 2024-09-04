"use client";
import { Icon } from "@/components/Icon";
import { palette } from "@/theme/palette";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EveryBusinessSection = () => {
  const route = useRouter();
  const [isHover, setIsHover] = useState(false);
  const [is1Hover, set1IsHover] = useState(false);
  const [is2Hover, set2IsHover] = useState(false);

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
            width: "1200px",
            px: "10%",
            py: "9%",
            borderRadius: "30px",
            border: `1.06px solid #0000001A`,
            alignItems: "center",
            backgroundColor: palette.base.white,
            transition: "all 0.3s ease", // Add transition for smooth animation
            "&:hover": {
              color: palette.base.white,
              backgroundColor: palette.text.contactEmailColor,
              transform: "scale(1.03)", // Scale the component up by 10% on hover
            },
            "&:hover .display-md1-regular": {
              color: palette.base.white, // Change the color of the specific Typography on hover
            },
            "&:hover .text-md-regular": {
              color: palette.base.white, // Change the color of the other Typography on hover
            },
          }}
          onMouseEnter={() => set1IsHover(true)}
          onMouseLeave={() => set1IsHover(false)}
        >
          {is1Hover ? (
            <Box>
              <Image
                src="/Images/pro-business-white-image.svg"
                width={243}
                height={243}
                alt="rectangle iaptop bg"
              />
            </Box>
          ) : (
            <Box>
              <Image
                src="/Images/pro-business-image.svg"
                width={243}
                height={243}
                alt="rectangle iaptop bg"
              />
            </Box>
          )}

          <Stack direction={"column"} gap={1} sx={{ pl: "12%" }}>
            <Typography
              variant="display-md1-regular"
              className="display-md1-regular"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.base.black,
              }}
            >
              Professional Services
            </Typography>
            <Typography
              variant="text-md-regular"
              className="text-md-regular"
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
              transition: "all 0.3s ease", // Add transition for smooth animation
              "&:hover": {
                color: palette.base.white,
                backgroundColor: palette.text.contactEmailColor,
                transform: "scale(1.05)", // Scale the component up by 10% on hover
              },
              "&:hover .text-md-regular": {
                color: palette.base.white, // Change the color of the specific Typography on hover
              },
              "&:hover .display-sm0-medium": {
                color: palette.base.white, // Change the color of the other Typography on hover
              },
            }}
            onMouseEnter={() => set2IsHover(true)}
            onMouseLeave={() => set2IsHover(false)}
          >
            {is2Hover ? (
              <Icon icon="handCodingWhiteIcon" width={42} height={42} />
            ) : (
              <Icon icon="handCodingIcon" width={42} height={42} />
            )}
            <Typography
              variant="display-sm0-medium"
              className="display-sm0-medium"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.base.black,
              }}
            >
              Professional Services
            </Typography>
            <Typography
              variant="text-md-regular"
              className="text-md-regular"
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
              color: palette.base.white,
              backgroundColor: palette.text.contactEmailColor,
              transition: "all 0.3s ease", // Add transition for smooth animation
              "&:hover": {
                color: palette.base.black,
                backgroundColor: palette.base.white,
                transform: "scale(1.05)", // Scale the component up by 10% on hover
              },
              "&:hover .text-md-regular": {
                color: palette.color.gray[745], // Change the color of the specific Typography on hover
              },
              "&:hover .display-sm0-medium": {
                color: palette.base.black, // Change the color of the other Typography on hover
              },
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {isHover ? (
              <Icon icon="gearsPurpoleIcon" width={42} height={42} />
            ) : (
              <Icon icon="gearsIcon" width={42} height={42} />
            )}

            <Typography
              variant="display-sm0-medium"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                // color: palette.base.white,
                // Add a class for targeting in the hover state
                "&.display-sm0-medium": {},
              }}
            >
              Professional Services
            </Typography>
            <Typography
              variant="text-md-regular"
              className="text-md-regular"
              sx={{
                width: "400px",
                fontFamily: "Product Sans, sans-serif",
                textAlign: "center",
                // color: palette.base.white,
                // Add a class for targeting in the hover state
                "&.text-md-regular": {},
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
