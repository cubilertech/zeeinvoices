import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        background: palette.base.white,
        py: "7px",
        // boxShadow: "none",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Stack
          direction={"row"}
          gap={9}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon icon="logo" height={24} width={175} />
          <Button
            variant="outlined"
            size="small"
            startIcon={<Icon icon="invoiceIcon" width={15} height={15} />}
          >
            Invoices
          </Button>
        </Stack>

        <Stack direction={"row"} gap={3}>
          <Stack direction={"row"} gap={1} sx={{cursor:"pointer"}}>
            <Avatar alt="Avatar" src="/Images/user-image.png" />
            {/* <IconButton
              sx={{ padding: 1, width: "5px", height: "5px", borderRadius: 5 }}
            > */}
              <Icon icon="arrowDownIcon" width={15} height={15} />
            {/* </IconButton> */}
          </Stack>
          <Button variant="contained">Login</Button>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
