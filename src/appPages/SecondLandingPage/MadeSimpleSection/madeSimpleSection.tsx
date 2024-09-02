"use client";
import { palette } from "@/theme/palette";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MadeSimpleSection = () => {
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
        // background:
        //   "conic-gradient(from 180.47deg at 117.4% 50%, #3F4DE1 -72.9deg, #DEDBFA 87.9deg, #3F4DE1 287.1deg, #DEDBFA 447.9deg)",
        // display: "flex",
        // flexDirection: "column",
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
          Invoicing
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
          Made Simple
        </Typography>
      </Stack>
      <Typography
        variant="text-xl-regular"
        sx={{
          fontFamily: "Product Sans, sans-serif",
          color: palette.color.gray[745],
        }}
      >
        Get paid faster with a tool that’s designed for simplicity and
        speed.designed for simplicity and speed.
      </Typography>
      <Stack
        direction={"row"}
        gap={8}
        sx={{ display: "flex", justifyContent: "center", mt: "3%" }}
      >
        {/* left section */}
        <Box sx={{ px: "3%" }}>
          <Image
            src="/Images/simple-mobile-image.svg"
            width={437}
            height={462}
            alt="rectangle iaptop bg"
          />
        </Box>

        {/* right section */}
        <Stack direction={"column"} gap={3} sx={{ width: "540px" }}>
          {/* 1st */}
          <Stack
            direction={"column"}
            sx={{
              py: "5px",
              px: "15px",
              borderLeftWidth: "4px",
              borderLeftStyle: "solid",
              borderImageSource:
                "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
              borderImageSlice: 1,
            }}
          >
            <Stack direction={"row"} gap={1}>
              <Typography
                variant="display-xs-bold"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.color.gray[745],
                }}
              >
                Mobile
              </Typography>
              <Typography
                variant="display-xs-bold"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.color.gray[745],
                  background:
                    "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                Friendly
              </Typography>
            </Stack>
            <Typography
              variant="text-xl1-1-regular"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.color.gray[745],
              }}
            >
              Reduce manual work with automation, reduce manual ands Reduce
              manual work with automation, reduce manual asdaReduce manual work
              with automation, reduce manual asda
            </Typography>
          </Stack>
          {/* 2nd */}
          <Stack
            direction={"column"}
            sx={{
              py: "2px",
              px: "15px",
              borderLeftWidth: "4px",
              borderLeftStyle: "solid",
              borderImageSource: "#D9D9D9",
              borderImageSlice: 1,
            }}
          >
            <Stack direction={"row"} gap={1}>
              <Typography
                variant="display-xs-bold"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.color.gray[745],
                }}
              >
                Stay
              </Typography>
              <Typography
                variant="display-xs-bold"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.color.gray[745],
                  background:
                    "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                Organized
              </Typography>
            </Stack>
            <Typography
              variant="text-xl1-1-regular"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.color.gray[745],
              }}
            >
              Reduce manual work with automation.asdadasdasddasda
            </Typography>
          </Stack>
          {/* 3rd */}
          <Stack
            direction={"column"}
            sx={{
              py: "2px",
              px: "15px",
              borderLeftWidth: "4px",
              borderLeftStyle: "solid",
              borderImageSource: "#D9D9D9",
              borderImageSlice: 1,
            }}
          >
            <Stack direction={"row"} gap={1}>
              <Typography
                variant="display-xs-bold"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.color.gray[745],
                }}
              >
                Automated
              </Typography>
              <Typography
                variant="display-xs-bold"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.color.gray[745],
                  background:
                    "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                Invoicing:
              </Typography>
            </Stack>
            <Typography
              variant="text-xl1-1-regular"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.color.gray[745],
              }}
            >
              Reduce manual work with automation.sdasddasdasdsads
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default MadeSimpleSection;
