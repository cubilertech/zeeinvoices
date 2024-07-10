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
          background: palette.color.gray[700],
          py: "24px",
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
            <Icon icon="twitter" height={28} width={28} />
            <Icon icon="facebook" height={28} width={28} />
            <Icon icon="instagarm" height={28} width={28} />
          </Stack>
        </Container>
      </Box>
      {/* white footer */}
      <Box sx={{ background: palette.base.white, py: "24px" }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction={"row"} spacing={2} color={palette.color.gray[650]}>
            <Typography variant="body1">Terms and Conditions</Typography>
            <Typography variant="body1">Invoice Guide</Typography>
            <Typography variant="body1">Help</Typography>
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
