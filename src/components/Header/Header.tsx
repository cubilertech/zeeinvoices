"use client";
import {
  AppBar,
  Avatar,
  Box,
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
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const route = useRouter();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogin = () => {
    signIn("google", { callbackUrl: `${process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL}/invoices` });
  };
  const handleLogout = () => {
    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL}` });
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
          <Box onClick={() => route.push("/")} sx={{ cursor: "pointer" }}>
            <Icon icon="logo" height={24} width={175} />
          </Box>
        {session && <CustomButton />}  
        </Stack>
        <Stack direction={"row"} gap={3}>
         
          {!session ? (
            <>
              <Button
                onClick={handleLogin}
                variant="contained"
                sx={{ px: "20px", py: "8px" }}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <Typography sx={{ color: "black", alignSelf: "center" }}>
                Hi, {session.user?.name}
              </Typography>
              <Box>
          <Stack
            direction={"row"}
            gap={1}
            sx={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            <Avatar alt="Avatar" src="/Images/user-image.png" />
            <Icon icon="arrowDownIcon" width={15} height={15} />
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
                onClick={handleLogout}
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
          </Box>
              {/* <Button
                onClick={handleLogout}
                variant="contained"
                sx={{ px: "20px", py: "8px" }}
              >
                Sign out
              </Button> */}
            </>
          )}
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
