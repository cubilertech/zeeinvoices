"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      {/* black footer */}
      <Box
        sx={{
          // background: palette.color.gray[700],
          backgroundColor: palette.primary.main,
          py: "10px",
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
          <Stack direction={"row"} spacing={2}>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() =>
                window.open("https://twitter.com/zeeinvoices", "_blank")
              }
            >
              <Icon icon="twitter" height={28} width={28} />
            </Box>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() =>
                window.open("https://www.facebook.com/zeeinvoices/", "_blank")
              }
            >
              <Icon icon="facebook" height={28} width={28} />
            </Box>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() =>
                window.open("https://www.instagram.com/zeeinvoices/", "_blank")
              }
            >
              <Icon icon="instagarm" height={28} width={28} />
            </Box>
          </Stack>
        </Container>
      </Box>
      {/* white footer */}
      <Box sx={{ background: palette.base.white, py: "15px" }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction={"row"} spacing={2} color={palette.color.gray[650]}>
            <Typography variant="body1" sx={{ cursor: "pointer" }}>
              Terms and Conditions
            </Typography>
            <Typography variant="body1" sx={{ cursor: "pointer" }}>
              Invoice Guide
            </Typography>
            <Typography variant="body1" sx={{ cursor: "pointer" }}>
              Help
            </Typography>
          </Stack>
          <Typography variant="body1" color={palette.color.gray[650]}>
            © Copyright 2022, All Rights Reserved by ZAPTA Technologies
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
