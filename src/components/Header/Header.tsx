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
import {  useSession } from "next-auth/react";
import { handleLogout,handleLogin } from "@/utils/common";
import { useDispatch } from "react-redux";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { setResetInvoice } from "@/redux/features/invoiceSlice";

const Header = () => {
  const route = useRouter();
  const dispatch= useDispatch();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const handLogoClick= ()=>{
      route.push('/invoices')
      dispatch(setResetInvoice());
      dispatch(setResetInvoiceSetting());    
  }
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
          <Box onClick={handLogoClick} sx={{cursor:'pointer'}}>
            <Icon icon="logo" height={24} width={175} />
            </Box>
          {session && <CustomButton />}
        </Stack>
        <Stack direction={"row"} gap={3}>
          {!session ? (
              <Button
                onClick={handleLogin}
                variant="contained"
                sx={{ px: "20px", py: "8px" }}
              >
                Login
              </Button>
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
                  {session.user?.image ? (
                    <Avatar sx={{width:"32px", height:"32px"}} alt="Avatar" src={session.user.image} />
                  ) : (
                    <Avatar sx={{width:"32px", height:"32px"}} alt="Avatar" />
                  )}
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
