"use client";
import { palette } from "@/theme/palette";
import { Box, Button, Rating, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UsersSection = () => {
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
          What Our
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
          Users Say
        </Typography>
      </Stack>
      <Typography
        variant="text-xl-regular"
        sx={{
          fontFamily: "Product Sans, sans-serif",
          color: palette.color.gray[745],
        }}
      >
        Thousands of businesses trust Zeeinvoices to get paid faster.ZeeInvoices
        to get paid faster faster.
      </Typography>
      <Stack
        direction={"row"}
        gap={8}
        sx={{ display: "flex", justifyContent: "center", mt: "3%" }}
      >
        {/* left section */}
        <Stack direction={"column"} gap={3} sx={{ width: "540px" }}>
          {/* 1st */}
          <Stack
            direction={"row"}
            sx={{
              width: "100%",
              pl: "5px",
              borderLeftWidth: "4px",
              borderLeftStyle: "solid",
              borderImageSource:
                "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
              borderImageSlice: 1,
            }}
          >
            <Stack
              direction={"column"}
              sx={{
                width: "100%",
                py: "5px",
                px: "15px",
                borderRadius: "8px",
                border: `1px solid #0000001A`,
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
                  James
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
                  Collin
                </Typography>
              </Stack>
              <Typography
                variant="text-xl-regular"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.color.gray[745],
                }}
              >
                Designer, Catalog
              </Typography>
            </Stack>
          </Stack>
          {/* 2nd */}
          <Stack
            direction={"column"}
            sx={{
              py: "5px",
              px: "15px",
              borderRadius: "8px",
              border: `1px solid #0000001A`,
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
                Jessica
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
                Collin
              </Typography>
            </Stack>
            <Typography
              variant="text-xl-regular"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.color.gray[745],
              }}
            >
              Designer, Catalog
            </Typography>
          </Stack>
          {/* 3rd */}
          <Stack
            direction={"column"}
            sx={{
              py: "5px",
              px: "15px",
              borderRadius: "8px",
              border: `1px solid #0000001A`,
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
                Jhon
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
                Jhonson
              </Typography>
            </Stack>
            <Typography
              variant="text-xl-regular"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.color.gray[745],
              }}
            >
              COO, Sisyphus
            </Typography>
          </Stack>
        </Stack>

        {/* right section */}
        <Stack direction={"column"} gap={1}>
          <Typography
            variant="display-md1-medium"
            sx={{
              fontFamily: "Product Sans, sans-serif",
              color: palette.base.black,
            }}
          >
            It was great experience!
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
              width: "560px",
              fontFamily: "Product Sans, sans-serif",
              color: palette.color.gray[745],
            }}
          >
            I recently used Zeeinvoice and I’m thoroughly impressed. The user
            interface is incredibly intuitive and easy to navigate. The
            available invoice templates are both professional and accurate,
            which made creating my invoices a breeze.intuitive and easy to
            navigate. The available invoice templates are both professional and
            accurate, which made creating my invoices a breeze.
          </Typography>
          <Typography
            variant="text-xl-regular"
            sx={{
              width: "560px",
              fontFamily: "Product Sans, sans-serif",
              color: palette.color.gray[745],
            }}
          >
            I recently used Zeeinvoice and I’m thoroughly impressed. The user
            interface is incredibly intuitive and easy to navigate. The
            available invoice templates are both professional and accurate,
            which made creating my invoices a breeze.intuitive and easy to
            navigate. The available invoice templates are both professional and
            accurate, which made creating my invoices a breeze.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default UsersSection;
