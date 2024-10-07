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

  useEffect(() => {
    const facebookimg = new Image();
    const instagramimg = new Image();
    const facebookPrimaryimg = new Image();
    facebookimg.src = "/Images/icons/facebook-black-icon.svg"; // Preload hover image
    facebookPrimaryimg.src = "/Images/icons/facebook-primary-icon.svg"; // Preload hover image
    instagramimg.src = "/Images/icons/instagram-colored-icon.svg"; // Preload hover image
    // Ensuring images are loaded
    facebookimg.onload = () => console.log("Facebook black icon loaded");
    facebookPrimaryimg.onload = () =>
      console.log("Facebook primary icon loaded");
    instagramimg.onload = () => console.log("Instagram colored icon loaded");
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#F7F8F9",
        width: "100%",
        pt: { sm: 8, xs: 5 },
        pb: { sm: 5, xs: 5 },
        // display:"flex",
        // alignItems:"center",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { md: "0%", lg: "0%", xs: "16px" } }}>
        <Stack
          direction={"column"}
          gap={2}
          sx={{ alignItems: { sm: "start", xs: "center" } }}
        >
          <Box sx={{ cursor: "pointer" }}>
            <Icon icon="logo" height={31} width={225} />
          </Box>
          <Stack
            direction={{ md: "row", xs: "column" }}
            gap={2}
            justifyContent={"space-between"}
            sx={{ width: "100%" }}
          >
            <Stack
              direction={"column"}
              gap={3}
              sx={{
                // width: { sm: "667px", xs: "100%" },
                justifyContent: { sm: "start", xs: "center" },
                alignItems: { sm: "start", xs: "center" },
                textAlign: { sm: "start", xs: "center" },
              }}
            >
              <Typography
                variant="text-md-regular"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  width: { md: "847px", xs: "100%" },
                  color: palette.color.gray[610],
                  fontSize: { md: "16px", xs: "12px" },
                  lineHeight: { md: "24px", xs: "24px" },
                  fontWeight: { md: 400 },
                }}
              >
                ZeeInvoices is a powerful, easy-to-use invoicing solution
                designed to simplify your business finances. From creating
                invoices to tracking payments, ZeeInvoices helps you manage your
                billing effortlessly, giving you more time to focus on growing
                your business. With seamless integration, customizable
                templates, and automated processes, we ensure your invoicing is
                fast, reliable, and secure.
              </Typography>

              <Stack
                direction={{ sm: "row", xs: "row" }}
                gap={{ sm: 4, xs: 3 }}
                sx={{ alignItems: "center" }}
              >
                <Link
                  underline="hover"
                  variant="text-sm-bold"
                  sx={{ color: palette.color.gray[731], cursor: "pointer" }}
                  onClick={handleHomeButton}
                >
                  <Typography
                    variant="text-sm-bold"
                    sx={{
                      fontFamily: "Product Sans, sans-serif",
                      fontSize: { md: "14px", xs: "14px" },
                      lineHeight: { md: "21px", xs: "21px" },
                      fontWeight: { md: 700 },
                    }}
                  >
                    Home
                  </Typography>
                </Link>
                {/* <Divider
                sx={{ display: { sm: "none", xs: "flex" } }}
                orientation="vertical"
                variant="middle"
                flexItem
              /> */}
                <Link
                  underline="hover"
                  variant="text-sm-bold"
                  href="/about"
                  sx={{ color: palette.color.gray[731], cursor: "pointer" }}
                >
                  <Typography
                    variant="text-sm-bold"
                    sx={{
                      fontFamily: "Product Sans, sans-serif",
                      fontSize: { md: "14px", xs: "14px" },
                      lineHeight: { md: "21px", xs: "21px" },
                      fontWeight: { md: 700 },
                    }}
                  >
                    About
                  </Typography>
                </Link>
                {/* <Divider
                sx={{ display: { sm: "none", xs: "flex" } }}
                orientation="vertical"
                variant="middle"
                flexItem
              /> */}

                <Link
                  underline="hover"
                  variant="text-sm-bold"
                  sx={{ color: palette.color.gray[731], cursor: "pointer" }}
                  onClick={handlePrivacyButton}
                >
                  <Typography
                    variant="text-sm-bold"
                    sx={{
                      fontFamily: "Product Sans, sans-serif",
                      fontSize: { md: "14px", xs: "14px" },
                      lineHeight: { md: "21px", xs: "21px" },
                      fontWeight: { md: 700 },
                    }}
                  >
                    Privacy
                  </Typography>
                </Link>
                {/* <Divider
                sx={{ display: { sm: "none", xs: "flex" } }}
                orientation="vertical"
                variant="middle"
                flexItem
              /> */}
                <Link
                  underline="hover"
                  variant="text-sm-bold"
                  sx={{ color: palette.color.gray[731], cursor: "pointer" }}
                  onClick={handleTermsButton}
                >
                  <Typography
                    variant="text-sm-bold"
                    sx={{
                      fontFamily: "Product Sans, sans-serif",
                      fontSize: { md: "14px", xs: "14px" },
                      lineHeight: { md: "21px", xs: "21px" },
                      fontWeight: { md: 700 },
                    }}
                  >
                    Terms
                  </Typography>
                </Link>
              </Stack>

              {/* Follow us */}
              <Stack
                direction={{ sm: "row", xs: "column" }}
                gap={{ md: 4, xs: 1 }}
                sx={{
                  width: { sm: "410px", xs: "100%" },
                  justifyContent: { sm: "start", xs: "center" },
                  alignItems: { sm: "center", xs: "center" },
                  textAlign: { sm: "start", xs: "center" },
                }}
              >
                <Typography
                  variant="display-xs-regular"
                  sx={{
                    fontFamily: "Product Sans, sans-serif",
                    color: palette.color.gray[610],
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
                      width: { sm: "27px", xs: "27px" },
                      height: { sm: "27px", xs: "27px" },
                      overflow: "hidden",
                      backgroundImage: "url(/Images/icons/facebook2-icon.svg)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100% 100%",
                      "&:hover": {
                        // width: { sm: "22px", xs: "24px" },
                        // height: { sm: "20px", xs: "21px" },
                        backgroundImage:
                          "url(/Images/icons/facebook2-colored-icon.svg)",
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
                      width: { sm: "27px", xs: "27px" },
                      height: { sm: "27px", xs: "27px" },
                      overflow: "hidden",
                      backgroundImage: "url(/Images/icons/instagram2-icon.svg)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100% 100%",
                      "&:hover": {
                        backgroundImage:
                          "url(/Images/icons/instagram2-colored-icon.svg)",
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
                        color: palette.color.gray[610],
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
                        color: palette.color.gray[610],
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
                        color: palette.color.gray[610],
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
              {/* Contact us */}
              <Stack
                direction={"column"}
                gap={{ sm: 2, xs: 3 }}
                sx={{
                  width: { sm: "232px", xs: "100%" },
                  justifyContent: { sm: "start", xs: "center" },
                  alignItems: { sm: "start", xs: "center" },
                  textAlign: { sm: "start", xs: "center" },
                }}
              >
                <Typography
                  variant="text-sm-bold"
                  sx={{
                    fontFamily: "Product Sans, sans-serif",
                    color: palette.color.gray[610],
                    fontSize: { md: "14px", xs: "14px" },
                    lineHeight: { md: "21px", xs: "21px" },
                    fontWeight: { md: 400, xs: 700 },
                  }}
                >
                  Contact Us
                </Typography>
                <Stack
                  direction={"column"}
                  gap={{ sm: 3, xs: 2 }}
                  sx={{
                    alignItems: { sm: "start", xs: "center" },
                  }}
                >
                  <Stack // stack for phone and email
                    direction={{ sm: "column", xs: "column" }}
                    gap={{ sm: 3, xs: 2 }}
                    sx={{ alignItems: { sm: "start", xs: "center" } }}
                  >
                    <Stack
                      direction={"row"}
                      gap={1}
                      sx={{ alignItems: "center" }}
                    >
                      {/* <PhoneIcon sx={{ color: palette.primary.main }} /> */}
                      <Icon icon="FooterPhoneIcon" width={18} height={18} />
                      <Typography
                        variant="text-md-regular"
                        sx={{
                          fontFamily: "Product Sans, sans-serif",
                          color: palette.color.gray[610],
                          fontSize: { md: "16px", xs: "14px" },
                          lineHeight: { md: "20px", xs: "20px" },
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
                      {/* <EmailIcon sx={{ color: palette.primary.main }} /> */}
                      <Icon icon="FooterMailIcon" width={18} height={18} />

                      <a
                        href="https://mail.google.com/mail/?view=cm&to=support@zeeinvoices.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Typography
                          variant="text-md-regular"
                          sx={{
                            fontFamily: "Product Sans, sans-serif",
                            color: palette.color.gray[610],
                            fontSize: { md: "16px", xs: "14px" },
                            lineHeight: { md: "20px", xs: "20px" },
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
                    {/* <LocationOnIcon sx={{ color: palette.primary.main }} /> */}
                    <Icon icon="FooterMarkerIcon" width={18} height={18} />

                    <Typography
                      variant="text-md-regular"
                      sx={{
                        fontFamily: "Product Sans, sans-serif",
                        color: palette.color.gray[610],
                        fontSize: { md: "16px", xs: "14px" },
                        lineHeight: { md: "20px", xs: "20px" },
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
                borderTopWidth: "1px",
                backgroundColor: palette.color.gray[5],
              }}
            />
          </div>
          <Typography
            variant="text-sm-regular"
            sx={{
              width: "100%",
              textAlign: "center",
              fontFamily: "Product Sans, sans-serif",
              color: palette.color.gray[510],
              mt: "0.5%",
              fontSize: { md: "14px", xs: "12px" },
              lineHeight: { md: "28px", xs: "28px" },
              fontWeight: { md: 400 },
            }}
          >
            © 2024 All Rights Reserved ZeeInvoices
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};
export default FooterSection;
