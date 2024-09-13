"use client";
import { Icon } from "@/components/Icon";
import { palette } from "@/theme/palette";
import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const FooterSection = () => {
  const route = useRouter();
  const handleHomeButton = (data: any) => {
    route.push("/");
  };
  const handleTermsButton = (data: any) => {
    route.push("/termsAndCondition");
  };
  return (
    <Box
      sx={{
        backgroundColor: "#F7F8F9",
        width: "100%",
        pt: 7,
        // display:"flex",
        // alignItems:"center",
      }}
    >
      <Stack
        direction={{ md: "row", xs: "column" }}
        gap={5}
        justifyContent={"space-between"}
        sx={{ mx: "6%" }}
      >
        <Stack
          direction={"column"}
          gap={2}
          sx={{
            width: { sm: "667px", xs: "100%" },
            justifyContent: { sm: "start", xs: "center" },
            alignItems: { sm: "start", xs: "center" },
            textAlign: { sm: "start", xs: "center" },
          }}
        >
          <Box sx={{ cursor: "pointer" }}>
            <Icon icon="logo" height={31} width={225} />
          </Box>
          <Typography
            variant="text-md-regular"
            sx={{
              fontFamily: "Product Sans, sans-serif",
              width: { md: "667px", xs: "295px" },
              color: palette.color.gray[745],
              fontSize: { md: "16px", xs: "12px" },
              lineHeight: { md: "24px", xs: "24px" },
              fontWeight: { md: 400 },
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum
            diam orci pretium a pharetra, feugiat cursus. Dictumst risus, sem
            egestas odio cras adipiscing vulputate. Nisi, risus in suscipit non.
            Non commodo volutpat, pharetra, vel.Nisi, risus in suscipit non. Non
            commodo volutpat, pharetra, vel.
          </Typography>

          {/* Follow us */}
          <Stack
            direction={"row"}
            gap={{ md: 4, xs: 3 }}
            sx={{
              width: { sm: "396px", xs: "100%" },
              mt: "3%",
              justifyContent: { sm: "start", xs: "center" },
              alignItems: { sm: "center", xs: "center" },
              textAlign: { sm: "start", xs: "center" },
            }}
          >
            <Typography
              variant="display-xs-regular"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.base.black,
                fontSize: { md: "24px", xs: "14px" },
                lineHeight: { md: "36px", xs: "21px" },
                fontWeight: { md: 400 },
              }}
            >
              Follow us
            </Typography>
            <Stack
              direction={"row"}
              gap={{ md: 4, xs: 2 }}
              sx={{ alignItems: "center" }}
            >
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  window.open("https://www.facebook.com/zeeinvoices/", "_blank")
                }
              >
                <Icon icon="facebook1Icon" height={13} width={13} />
              </Box>
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/zeeinvoices/",
                    "_blank"
                  )
                }
              >
                <Icon icon="instagram1Icon" height={25} width={25} />
              </Box>
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  window.open("https://www.youtube.com/@ZeeInvoices", "_blank")
                }
              >
                <Icon icon="youtube1Icon" height={28} width={28} />
              </Box>

              <Box
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  window.open("https://twitter.com/zeeinvoices", "_blank")
                }
              >
                <Icon icon="twitterxIcon" height={20} width={25} />
              </Box>
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/company/zeeinvoices/",
                    "_blank"
                  )
                }
              >
                <Icon icon="linkedin1Icon" height={25} width={25} />
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction={{ md: "row", xs: "column" }}
          sx={{
            justifyContent: { sm: "start", xs: "center" },
            alignItems: { sm: "start", xs: "center" },
          }}
          gap={{ md: 15, xs: 3 }}
        >
          {/* Pages */}
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: { sm: "70px", xs: "100%" },
              justifyContent: { sm: "start", xs: "center" },
              alignItems: { sm: "start", xs: "center" },
              textAlign: { sm: "start", xs: "center" },
            }}
          >
            <Typography
              variant="display-xs-regular"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.base.black,
                fontSize: { md: "24px", xs: "14px" },
                lineHeight: { md: "29px", xs: "17px" },
                fontWeight: { md: 400 },
              }}
            >
              Pages
            </Typography>
            <Stack direction={"column"} gap={2}>
              <Link
                underline="hover"
                variant="text-md-regular"
                sx={{ color: palette.color.gray[731], cursor: "pointer" }}
                onClick={handleHomeButton}
              >
                <Typography
                  variant="text-md-regular"
                  sx={{
                    fontSize: { md: "16px", xs: "12px" },
                    lineHeight: { md: "20px", xs: "15px" },
                    fontWeight: { md: 400 },
                  }}
                >
                  Home
                </Typography>
              </Link>
              <Link
                underline="hover"
                variant="text-md-regular"
                sx={{ color: palette.color.gray[731], cursor: "pointer" }}
              >
                <Typography
                  variant="text-md-regular"
                  sx={{
                    fontSize: { md: "16px", xs: "12px" },
                    lineHeight: { md: "20px", xs: "15px" },
                    fontWeight: { md: 400 },
                  }}
                >
                  About
                </Typography>
              </Link>
              <Link
                underline="hover"
                variant="text-md-regular"
                sx={{ color: palette.color.gray[731], cursor: "pointer" }}
              >
                <Typography
                  variant="text-md-regular"
                  sx={{
                    fontSize: { md: "16px", xs: "12px" },
                    lineHeight: { md: "20px", xs: "15px" },
                    fontWeight: { md: 400 },
                  }}
                >
                  Learn
                </Typography>
              </Link>
              <Link
                underline="hover"
                variant="text-md-regular"
                sx={{ color: palette.color.gray[731], cursor: "pointer" }}
              >
                <Typography
                  variant="text-md-regular"
                  sx={{
                    fontSize: { md: "16px", xs: "12px" },
                    lineHeight: { md: "20px", xs: "15px" },
                    fontWeight: { md: 400 },
                  }}
                >
                  Privacy
                </Typography>
              </Link>
              <Link
                underline="hover"
                variant="text-md-regular"
                sx={{ color: palette.color.gray[731], cursor: "pointer" }}
                onClick={handleTermsButton}
              >
                <Typography
                  variant="text-md-regular"
                  sx={{
                    fontSize: { md: "16px", xs: "12px" },
                    lineHeight: { md: "20px", xs: "15px" },
                    fontWeight: { md: 400 },
                  }}
                >
                  Terms
                </Typography>
              </Link>
            </Stack>
          </Stack>

          {/* Contact us */}
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: { sm: "232px", xs: "100%" },
              justifyContent: { sm: "start", xs: "center" },
              alignItems: { sm: "start", xs: "center" },
              textAlign: { sm: "start", xs: "center" },
            }}
          >
            <Typography
              variant="display-xs-regular"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.base.black,
                fontSize: { md: "24px", xs: "14px" },
                lineHeight: { md: "29px", xs: "17px" },
                fontWeight: { md: 400 },
              }}
            >
              Contact Us
            </Typography>
            <Stack direction={"column"} gap={2}>
              <Typography
                variant="text-md-regular"
                sx={{
                  color: palette.color.gray[731],
                  fontSize: { md: "16px", xs: "12px" },
                  lineHeight: { md: "20px", xs: "15px" },
                  fontWeight: { md: 400 },
                }}
              >
                Phone: +14809201123
              </Typography>
              <Typography
                variant="text-md-regular"
                sx={{
                  color: palette.color.gray[731],
                  fontSize: { md: "16px", xs: "12px" },
                  lineHeight: { md: "20px", xs: "15px" },
                  fontWeight: { md: 400 },
                }}
              >
                Email: info@zeeinvoice.com
              </Typography>
              <Typography
                variant="text-md-regular"
                sx={{
                  color: palette.color.gray[731],
                  fontSize: { md: "16px", xs: "12px" },
                  lineHeight: { md: "20px", xs: "15px" },
                  fontWeight: { md: 400 },
                }}
              >
                Address: 11133 Shady Trail PMB 205 Dallas, TX 75229
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <div
        style={{
          marginTop: "3%",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Divider
          orientation="horizontal"
          variant="middle"
          flexItem
          sx={{
            width: "90%",
            borderTopWidth: 2,
            backgroundColor: "#000000",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="text-sm-regular"
          sx={{
            fontFamily: "Product Sans, sans-serif",
            color: palette.color.gray[745],
            mt: "0.5%",
            mb: "1%",
            fontSize: { md: "14px", xs: "12px" },
            lineHeight: { md: "28px", xs: "28px" },
            fontWeight: { md: 400 },
          }}
        >
          © 2024 All Rights Reserved ZeeInvoices
        </Typography>
      </div>
    </Box>
  );
};
export default FooterSection;
