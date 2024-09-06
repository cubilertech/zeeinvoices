"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import { FC } from "react";
import { useRouter } from "next/navigation";

const Footer: FC = () => {
  const route = useRouter();
  const handleHelpButton = (data: any) => {
    route.push(`/contact-us`);
  };
  const handleTermsAndConditionButton = (data: any) => {
    route.push(`/termsAndCondition`);
  };
  return (
    <Box sx={{ width: "100%" }}>
      {/* black footer */}
      <Box
        sx={{
          // background: palette.color.gray[700],
          backgroundColor: palette.primary.main,
          py: "13px",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Icon icon="whiteLogo" height={16} width={120} />
          <Stack direction={"row"} spacing={3} sx={{ alignItems: "center" }}>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() =>
                window.open("https://www.facebook.com/zeeinvoices/", "_blank")
              }
            >
              <Icon icon="facebookWhiteIcon" height={25} width={13} />
            </Box>

            <Box
              sx={{ cursor: "pointer" }}
              onClick={() =>
                window.open("https://www.instagram.com/zeeinvoices/", "_blank")
              }
            >
              <Icon icon="instagramWhiteIcon" height={25} width={25} />
            </Box>

            <Box
              sx={{ cursor: "pointer" }}
              onClick={() =>
                window.open("https://www.youtube.com/@ZeeInvoices", "_blank")
              }
            >
              <Icon icon="youtubeWhiteIcon" height={19} width={27} />
            </Box>

            <Box
              sx={{ cursor: "pointer" }}
              onClick={() =>
                window.open("https://twitter.com/zeeinvoices", "_blank")
              }
            >
              <Icon icon="twitterxWhiteIcon" height={20} width={22} />
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
              <Icon icon="linkedinWhiteIcon" height={25} width={25} />
            </Box>
          </Stack>
        </Container>
      </Box>
      {/* white footer */}
      <Box sx={{ background: palette.base.white, py: "13px" }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction={"row"} spacing={4} color={palette.color.gray[650]}>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={handleTermsAndConditionButton}
            >
              <Typography variant="body1" sx={{ cursor: "pointer" }}>
                Terms and Conditions
              </Typography>
            </Box>
            {/* <Typography variant="body1" sx={{ cursor: "pointer" }}>
              Invoice Guide
            </Typography> */}
            <Box sx={{ cursor: "pointer" }} onClick={handleHelpButton}>
              <Typography variant="body1">Help</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Contact: +14809201123</Typography>
            </Box>
          </Stack>
          <Typography variant="body1" color={palette.color.gray[650]}>
            © Copyrights 2024, All rights Reserved by Zee Invoices
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
