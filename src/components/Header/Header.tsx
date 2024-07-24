"use client";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import CustomButton from "./CustomButton";
import React from "react";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
          <CustomButton />
        </Stack>

        <Stack direction={"row"} gap={3}>
          <Stack
            direction={"row"}
            gap={1}
            sx={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            <Avatar alt="Avatar" src="/Images/user-image.png" />
            {/* <IconButton
              sx={{ padding: 1, width: "5px", height: "5px", borderRadius: 5 }}
            > */}
            <Icon icon="arrowDownIcon" width={15} height={15} />
            {/* </IconButton> */}
          </Stack>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            sx={{ borderRadius: "8px" }}
          >
            <Stack direction={"column"}>
              <Button
                variant="outlined"
                startIcon={<Icon icon="profileIcon" />}
                sx={{
                  border: "none",
                  color: "#4B5563",
                  "&:hover": {
                    border: "none",
                    color: "#4B5563",
                    backgroundColor: palette.color.gray[10],
                    borderRadius: 0,
                  },
                }}
              >
                Profile
              </Button>
              <Button
                variant="outlined"
                startIcon={<Icon icon="logoutIcon" />}
                sx={{
                  border: "none",
                  color: "#4B5563",
                  "&:hover": {
                    border: "none",
                    color: "#4B5563",
                    backgroundColor: palette.color.gray[10],
                    borderRadius: 0,
                  },
                }}
              >
                Logout
              </Button>
            </Stack>
          </Popover>

          <Button variant="contained" sx={{ px:"20px", py:"8px" }}>
            Login
          </Button>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
