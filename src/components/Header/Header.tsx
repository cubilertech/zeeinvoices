import { AppBar, Box, Button, Container } from "@mui/material";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{ background: palette.base.white, py: "24px", boxShadow: "none" }}
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
