import { palette } from "@/theme/palette";
import { AppBar, Avatar, IconButton, Stack, Typography } from "@mui/material";
import { Icon } from "../Icon";

const DashboardHeader = () => {
  return (
    <AppBar
      sx={{
        top: 0,
        left: 0,
        height: "72px",
        width: "1040px",
        marginLeft: "240px",
        background: palette.base.white,
        justifyContent: "center",
        py: "7px",
        borderBottom: `1px solid ${palette.color.gray[5]}`,
        boxShadow: "0",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          mx: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="text-sm-semibold"
          sx={{ color: palette.base.black }}
        >
          Invoices
        </Typography>
        <Stack direction={"row"}>
          <Avatar alt="Avatar" src="/Images/user-image.png" />
          <IconButton
            sx={{ padding: 1, width: "5px", height: "5px", borderRadius: 5 }}
          >
            <Icon icon="arrowDownIcon" width={15} height={15} />
          </IconButton>
        </Stack>
      </Stack>
    </AppBar>
  );
};

export default DashboardHeader;
