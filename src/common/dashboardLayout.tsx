import { DashboardHeader } from "@/components/DashboardHeader";
import { SideBar } from "@/components/SideBar";
import { palette } from "@/theme/palette";
import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";

const DashBoardLayout = ({ children }: { children: ReactNode }) => {
  return (
    // <Box sx={{ background: palette.color.lightWhite, height: "100%" }}>
      <Stack direction={"row"} sx={{ width: "100%", height: "100vh" }}>
        <SideBar />
        <Stack
          direction={"column"}
          sx={{
            height: "100vh",
          }}
        >
          <DashboardHeader />
          {children}
        </Stack>
      </Stack>
    // </Box>
  );
};

export default DashBoardLayout;
