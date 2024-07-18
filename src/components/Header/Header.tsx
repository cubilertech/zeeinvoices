import { AppBar, Box, Button, Container } from "@mui/material";
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
        <Icon icon="logo" height={24} width={175} />
        <Button variant="contained">Login</Button>
      </Container>
    </AppBar>
  );
};

export default Header;
