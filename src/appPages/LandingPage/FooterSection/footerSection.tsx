"use client";
import { Icon } from "@/components/Icon";
import { palette } from "@/theme/palette";
import { Box, Link, Stack, Typography } from "@mui/material";

const FooterSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#222039",
        width: "100%",
        pt: 9,
      }}
    >
      <Stack
        direction={"row"}
        gap={5}
        justifyContent={"space-between"}
        sx={{ mx: "5%" }}
      >
        <Stack direction={"column"} gap={2} sx={{ width: "270px" }}>
          <Box sx={{ cursor: "pointer" }}>
            <Icon icon="whiteLogo" height={16} width={120} />
          </Box>
          <Typography
            variant="text-md-regular"
            sx={{ color: palette.color.gray[10] }}
          >
            We will help you to setup plan your financial things computerize.
            And it’s free!
          </Typography>
        </Stack>

        {/* Quick Links */}
        <Stack direction={"column"} gap={2} sx={{ width: "140px" }}>
          <Typography variant="text-md-bold" sx={{ color: palette.base.white }}>
            Quick Links
          </Typography>
          <Stack direction={"column"} gap={1}>
            <Link
              underline="hover"
              variant="text-md-regular"
              sx={{ color: palette.color.gray[10], cursor: "pointer" }}
            >
              Home
            </Link>
            <Link
              underline="hover"
              variant="text-md-regular"
              sx={{ color: palette.color.gray[10], cursor: "pointer" }}
            >
              About us
            </Link>
            <Link
              underline="hover"
              variant="text-md-regular"
              sx={{ color: palette.color.gray[10], cursor: "pointer" }}
            >
              How it works
            </Link>
          </Stack>
        </Stack>

        {/* Other Menus */}
        <Stack direction={"column"} gap={2} sx={{ width: "140px" }}>
          <Typography variant="text-md-bold" sx={{ color: palette.base.white }}>
            Other Menus
          </Typography>
          <Stack direction={"column"} gap={1}>
            <Link
              underline="hover"
              variant="text-md-regular"
              sx={{ color: palette.color.gray[10], cursor: "pointer" }}
            >
              Pricing
            </Link>
            <Link
              underline="hover"
              variant="text-md-regular"
              sx={{ color: palette.color.gray[10], cursor: "pointer" }}
            >
              Contact us
            </Link>
            <Link
              underline="hover"
              variant="text-md-regular"
              sx={{ color: palette.color.gray[10], cursor: "pointer" }}
            >
              Careers
            </Link>
          </Stack>
        </Stack>

        {/* More */}
        <Stack direction={"column"} gap={2} sx={{ width: "197px" }}>
          <Typography variant="text-md-bold" sx={{ color: palette.base.white }}>
            More
          </Typography>
          <Stack direction={"column"} gap={1}>
            <Link
              underline="hover"
              variant="text-md-regular"
              sx={{ color: palette.color.gray[10], cursor: "pointer" }}
            >
              Terms and Condition
            </Link>
            <Link
              underline="hover"
              variant="text-md-regular"
              sx={{ color: palette.color.gray[10], cursor: "pointer" }}
            >
              Privacy and Policy{" "}
            </Link>
          </Stack>
        </Stack>

        {/* Contact us */}
        {/* <Stack direction={"column"} gap={2} sx={{ width: "197px" }}>
          <Typography variant="text-md-bold" sx={{ color: palette.base.white }}>
            Contact Us
          </Typography>
          <Stack direction={"column"} gap={1}>
            <Typography
              variant="text-md-regular"
              sx={{ color: palette.color.gray[10] }}
            >
              Address: 11133 Shady Trail PMB 205 Dallas, TX 75229
            </Typography>
            <Typography
              variant="text-md-regular"
              sx={{ color: palette.color.gray[10] }}
            >
              Contact: +14809201123
            </Typography>
          </Stack>
        </Stack> */}

        {/* Follow us */}
        <Stack direction={"column"} gap={2} sx={{ width: "157px" }}>
          <Typography variant="text-md-bold" sx={{ color: palette.base.white }}>
            Follow us
          </Typography>
          <Stack direction={"row"} gap={1} justifyContent={"space-between"}>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() =>
                window.open("https://www.instagram.com/zeeinvoices/", "_blank")
              }
            >
              <Icon icon="instagarmlpf" height={32} width={32} />
            </Box>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() =>
                window.open("https://www.facebook.com/zeeinvoices/", "_blank")
              }
            >
              <Icon icon="facebooklpf" height={32} width={32} />
            </Box>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() =>
                window.open("https://www.youtube.com/@ZeeInvoices", "_blank")
              }
            >
              <Icon icon="youtube" height={32} width={32} />
            </Box>
            <Box
              sx={{
                cursor: "pointer",
                height: "32px",
                width: "32px",
                borderRadius: "50%",
                backgroundColor: "#E0E0E0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() =>
                window.open("https://twitter.com/zeeinvoices", "_blank")
              }
            >
              <Icon icon="twitterxDarkIcon" height={20} width={20} />
            </Box>
          </Stack>
        </Stack>
      </Stack>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <hr
          style={{
            color: "white",
            width: "88%",
            marginTop: "50px",
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
          variant="text-sm-medium"
          sx={{ color: palette.base.white, my: "3%" }}
        >
          © Copyrights 2024, All rights Reserved by Zee Invoices.
        </Typography>
      </div>
    </Box>
  );
};
export default FooterSection;
