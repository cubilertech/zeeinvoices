"use client";
import { Icon } from "@/components/Icon";
import { palette } from "@/theme/palette";
import {
  Box,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useEffect } from "react";

const FooterSection = () => {
  const route = useRouter();
  const handleHomeButton = (data: any) => {
    route.push("/");
  };
  const handleTermsButton = (data: any) => {
    route.push("/termsAndCondition");
  };

  const handlePrivacyButton = (data: any) => {
    route.push("/privacyPolicy");
  };

  const facebookimg = new Image();
  const instagramimg = new Image();
  const facebookPrimaryimg = new Image();

  useEffect(() => {
    facebookimg.src = "/Images/icons/facebook-black-icon.svg"; // Preload hover image
    facebookPrimaryimg.src = "/Images/icons/facebook-primary-icon.svg"; // Preload hover image
    instagramimg.src = "/Images/icons/instagram-colored-icon.svg"; // Preload hover image
    // Ensuring images are loaded
    facebookimg.onload = () => console.log("Facebook black icon loaded");
    facebookPrimaryimg.onload = () =>
      console.log("Facebook primary icon loaded");
    instagramimg.onload = () => console.log("Instagram colored icon loaded");
  }, []);

  console.log(facebookPrimaryimg, "facebookPrimaryimg");

  return (
    <Box
      sx={{
        backgroundColor: "#F7F8F9",
        width: "100%",
        pt: { sm: 7, xs: 5 },
        // display:"flex",
        // alignItems:"center",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { md: "0%", lg: "0%", xs: "0%" } }}>
        <Stack
          direction={{ md: "row", xs: "column" }}
          gap={2}
          justifyContent={"space-between"}
          // sx={{ mx: "6%" }}
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
              ZeeInvoices is a powerful, easy-to-use invoicing solution designed
              to simplify your business finances. From creating invoices to
              tracking payments, ZeeInvoices helps you manage your billing
              effortlessly, giving you more time to focus on growing your
              business. With seamless integration, customizable templates, and
              automated processes, we ensure your invoicing is fast, reliable,
              and secure.
            </Typography>

            {/* Follow us */}
            <Stack
              direction={"row"}
              gap={{ md: 4, xs: 3 }}
              sx={{
                width: { sm: "410px", xs: "100%" },
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
                  sx={{
                    cursor: "pointer",
                    width: { sm: "24px", xs: "24px" },
                    height: { sm: "25px", xs: "25px" },
                    overflow: "hidden",
                    backgroundImage:
                      "url(/Images/icons/facebook-black-icon.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    "&:hover": {
                      // width: { sm: "24px", xs: "24px" },
                      // height: { sm: "21px", xs: "21px" },
                      backgroundImage:
                        "url(/Images/icons/facebook-primary-icon.svg)",
                      backgroundSize: "100% 100%",
                    },
                  }}
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/zeeinvoices/",
                      "_blank"
                    )
                  }
                >
                  {/* <Icon icon="facebook1Icon" height={13} width={13} /> */}
                </Box>
                <Box
                  sx={{
                    cursor: "pointer",
                    width: { sm: "25px", xs: "25px" },
                    height: { sm: "25px", xs: "25px" },
                    overflow: "hidden",
                    backgroundImage:
                      "url(/Images/icons/instagram-black-icon.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    "&:hover": {
                      backgroundImage:
                        "url(/Images/icons/instagram-colored-icon.svg)",
                    },
                  }}
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/zeeinvoices/",
                      "_blank"
                    )
                  }
                >
                  {/* <Icon icon="instagram1Icon" height={25} width={25} /> */}
                  {/* <InstagramIcon
                    sx={{
                      p: "0px",
                      width: "30px",
                      height: "30px",
                      color: palette.color.gray[745],
                      "&:hover": {
                        color: "#000000",
                      },
                    }}
                  /> */}
                </Box>
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/@ZeeInvoices",
                      "_blank"
                    )
                  }
                >
                  {/* <Icon icon="youtube1Icon" height={28} width={28} /> */}
                  <YouTubeIcon
                    sx={{
                      p: "0px",
                      width: "35px",
                      height: "35px",
                      color: palette.base.black,
                      "&:hover": {
                        color: "#FF0000",
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open("https://twitter.com/zeeinvoices", "_blank")
                  }
                >
                  {/* <Icon icon="twitterxIcon" height={20} width={25} /> */}
                  <XIcon
                    sx={{
                      p: "0px",
                      width: "25px",
                      height: "25px",
                      color: palette.base.black,
                      "&:hover": {
                        color: "#000000",
                      },
                    }}
                  />
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
                  {/* <Icon icon="linkedin1Icon" height={25} width={25} /> */}
                  <LinkedInIcon
                    sx={{
                      p: "0px",
                      width: "30px",
                      height: "30px",
                      color: palette.base.black,
                      "&:hover": {
                        color: "#0A66C2",
                      },
                    }}
                  />
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
              direction={{ sm: "column", xs: "row" }}
              gap={{ sm: 3, xs: 4 }}
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
              {/* <Divider
                sx={{ display: { sm: "none", xs: "flex" } }}
                orientation="vertical"
                variant="middle"
                flexItem
              /> */}
              <Stack
                direction={{ sm: "column", xs: "row" }}
                gap={{ sm: 2, xs: 1.5 }}
              >
                <Link
                  underline="hover"
                  variant="text-md-regular"
                  sx={{ color: palette.color.gray[731], cursor: "pointer" }}
                  onClick={handleHomeButton}
                >
                  <Typography
                    variant="text-md-regular"
                    sx={{
                      fontFamily: "Product Sans, sans-serif",
                      fontSize: { md: "16px", xs: "12px" },
                      lineHeight: { md: "20px", xs: "15px" },
                      fontWeight: { md: 400 },
                    }}
                  >
                    Home
                  </Typography>
                </Link>
                <Divider
                  sx={{ display: { sm: "none", xs: "flex" } }}
                  orientation="vertical"
                  variant="middle"
                  flexItem
                />
                <Link
                  underline="hover"
                  variant="text-md-regular"
                  href="/about"
                  sx={{ color: palette.color.gray[731], cursor: "pointer" }}
                >
                  <Typography
                    variant="text-md-regular"
                    sx={{
                      fontFamily: "Product Sans, sans-serif",
                      fontSize: { md: "16px", xs: "12px" },
                      lineHeight: { md: "20px", xs: "15px" },
                      fontWeight: { md: 400 },
                    }}
                  >
                    About
                  </Typography>
                </Link>
                <Divider
                  sx={{ display: { sm: "none", xs: "flex" } }}
                  orientation="vertical"
                  variant="middle"
                  flexItem
                />
                {/* <Link
                  underline="hover"
                  variant="text-md-regular"
                  sx={{ color: palette.color.gray[731], cursor: "pointer" }}
                >
                  <Typography
                    variant="text-md-regular"
                    sx={{
                      fontFamily: "Product Sans, sans-serif",
                      fontSize: { md: "16px", xs: "12px" },
                      lineHeight: { md: "20px", xs: "15px" },
                      fontWeight: { md: 400 },
                    }}
                  >
                    Learn
                  </Typography>
                </Link> */}
                <Link
                  underline="hover"
                  variant="text-md-regular"
                  sx={{ color: palette.color.gray[731], cursor: "pointer" }}
                  onClick={handlePrivacyButton}
                >
                  <Typography
                    variant="text-md-regular"
                    sx={{
                      fontFamily: "Product Sans, sans-serif",
                      fontSize: { md: "16px", xs: "12px" },
                      lineHeight: { md: "20px", xs: "15px" },
                      fontWeight: { md: 400 },
                    }}
                  >
                    Privacy
                  </Typography>
                </Link>
                <Divider
                  sx={{ display: { sm: "none", xs: "flex" } }}
                  orientation="vertical"
                  variant="middle"
                  flexItem
                />
                <Link
                  underline="hover"
                  variant="text-md-regular"
                  sx={{ color: palette.color.gray[731], cursor: "pointer" }}
                  onClick={handleTermsButton}
                >
                  <Typography
                    variant="text-md-regular"
                    sx={{
                      fontFamily: "Product Sans, sans-serif",
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
              <Stack
                direction={"column"}
                gap={2}
                sx={{
                  alignItems: { sm: "start", xs: "center" },
                }}
              >
                <Stack // stack for phone and email
                  direction={{ sm: "column", xs: "row" }}
                  gap={{ sm: 2, xs: 1 }}
                  sx={{ alignItems: { sm: "start", xs: "center" } }}
                >
                  <Stack
                    direction={"row"}
                    gap={1}
                    sx={{ alignItems: "center" }}
                  >
                    <PhoneIcon sx={{ color: palette.primary.main }} />
                    <Typography
                      variant="text-md-regular"
                      sx={{
                        fontFamily: "Product Sans, sans-serif",
                        color: palette.color.gray[731],
                        fontSize: { md: "16px", xs: "12px" },
                        lineHeight: { md: "20px", xs: "15px" },
                        fontWeight: { md: 400 },
                      }}
                    >
                      +1 480 920 1123
                    </Typography>
                  </Stack>

                  <Stack
                    direction={"row"}
                    gap={1}
                    sx={{ alignItems: "center" }}
                  >
                    <EmailIcon sx={{ color: palette.primary.main }} />
                    <a
                      href="https://mail.google.com/mail/?view=cm&to=support@zeeinvoices.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography
                        variant="text-md-regular"
                        sx={{
                          fontFamily: "Product Sans, sans-serif",
                          color: palette.color.gray[731],
                          fontSize: { md: "16px", xs: "12px" },
                          lineHeight: { md: "20px", xs: "15px" },
                          fontWeight: { md: 400 },
                          textDecoration: "none", // Ensure there's no underline
                          "&:hover": {
                            textDecoration: "underline", // Ensure there's no underline
                          },
                        }}
                      >
                        support@zeeinvoices.com
                      </Typography>
                    </a>
                  </Stack>
                </Stack>

                <Stack
                  direction={"row"}
                  gap={1}
                  sx={{ alignItems: { sm: "start", xs: "center" } }}
                >
                  <LocationOnIcon sx={{ color: palette.primary.main }} />
                  <Typography
                    variant="text-md-regular"
                    sx={{
                      fontFamily: "Product Sans, sans-serif",
                      color: palette.color.gray[731],
                      fontSize: { md: "16px", xs: "12px" },
                      lineHeight: { md: "20px", xs: "15px" },
                      fontWeight: { md: 400 },
                    }}
                  >
                    11133 Shady Trail PMB 205 Dallas, TX 75229
                  </Typography>
                </Stack>
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
              width: "100%",
              borderTopWidth: 2,
              backgroundColor: palette.primary.main,
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
      </Container>
    </Box>
  );
};
export default FooterSection;
