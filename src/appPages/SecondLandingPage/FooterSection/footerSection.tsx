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
      }}
    >
      <Stack
        direction={"row"}
        gap={8}
        justifyContent={"space-between"}
        sx={{ mx: "6%" }}
      >
        <Stack direction={"column"} gap={2} sx={{ width: "667px" }}>
          <Box sx={{ cursor: "pointer" }}>
            <Icon icon="logo" height={31} width={225} />
          </Box>
          <Typography
            variant="text-md-regular"
            sx={{
              fontFamily: "Product Sans, sans-serif",
              width: "667px",
              color: palette.color.gray[745],
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum
            diam orci pretium a pharetra, feugiat cursus. Dictumst risus, sem
            egestas odio cras adipiscing vulputate. Nisi, risus in suscipit non.
            Non commodo volutpat, pharetra, vel.Nisi, risus in suscipit non. Non
            commodo volutpat, pharetra, vel.
          </Typography>

          {/* Follow us */}
          <Stack direction={"row"} gap={4} sx={{ width: "396px", mt: "3%" }}>
            <Typography
              variant="display-xs-regular"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.base.black,
              }}
            >
              Follow us
            </Typography>
            <Stack direction={"row"} gap={4} sx={{ alignItems: "center" }}>
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
                // onClick={() => window.open("", "")}
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
        <Stack direction={"row"} gap={15}>
          {/* Pages */}
          <Stack direction={"column"} gap={2} sx={{ width: "70px" }}>
            <Typography
              variant="display-xs-regular"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.base.black,
              }}
            >
              Pages
            </Typography>
            <Stack direction={"column"} gap={1}>
              <Link
                underline="hover"
                variant="text-md-regular"
                sx={{ color: palette.color.gray[731], cursor: "pointer" }}
                onClick={handleHomeButton}
              >
                Home
              </Link>
              <Link
                underline="hover"
                variant="text-md-regular"
                sx={{ color: palette.color.gray[731], cursor: "pointer" }}
              >
                About
              </Link>
              <Link
                underline="hover"
                variant="text-md-regular"
                sx={{ color: palette.color.gray[731], cursor: "pointer" }}
              >
                Learn
              </Link>
              <Link
                underline="hover"
                variant="text-md-regular"
                sx={{ color: palette.color.gray[731], cursor: "pointer" }}
              >
                Privacy
              </Link>
              <Link
                underline="hover"
                variant="text-md-regular"
                sx={{ color: palette.color.gray[731], cursor: "pointer" }}
                onClick={handleTermsButton}
              >
                Terms
              </Link>
            </Stack>
          </Stack>

          {/* Contact us */}
          <Stack direction={"column"} gap={2} sx={{ width: "232px" }}>
            <Typography
              variant="display-xs-regular"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.base.black,
              }}
            >
              Contact Us
            </Typography>
            <Stack direction={"column"} gap={1}>
              <Typography
                variant="text-md-regular"
                sx={{ color: palette.color.gray[731] }}
              >
                Phone: +14809201123
              </Typography>
              <Typography
                variant="text-md-regular"
                sx={{ color: palette.color.gray[731] }}
              >
                Email: info@zeeinvoice.com
              </Typography>
              <Typography
                variant="text-md-regular"
                sx={{ color: palette.color.gray[731] }}
              >
                Address: 11133 Shady Trail PMB 205 Dallas, TX 75229
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <div
        style={{
          marginTop: "7%",
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
            my: "1.5%",
          }}
        >
          © 2024 All Rights Reserved ZeeInvoices
        </Typography>
      </div>
    </Box>
  );
};
export default FooterSection;
