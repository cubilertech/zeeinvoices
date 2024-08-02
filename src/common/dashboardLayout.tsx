import { DashboardHeader } from "@/components/DashboardHeader";
import { SideBar } from "@/components/SideBar";
import { Stack } from "@mui/material";
import { ReactNode } from "react";

const DashBoardLayout = ({ children }: { children: ReactNode }) => {
  return (
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
  );
};

export default DashBoardLayout;
