import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { palette } from "@/theme/palette";
import { Box } from "@mui/material";
import { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ background: palette.color.lightWhite, height: "100vh" }}>
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default AppLayout;
