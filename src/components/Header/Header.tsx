"use client";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import CustomButton from "./CustomButton";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { handleLogout, handleLogin, imageConvertion } from "@/utils/common";
import { useDispatch, useSelector } from "react-redux";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { setResetInvoice } from "@/redux/features/invoiceSlice";
import { useFetchSingleDocument } from "@/utils/ApiHooks/common";
import { backendURL } from "@/utils/constants";
import { getCountValue } from "@/redux/features/counterSlice";
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const route = useRouter();
  const dispatch = useDispatch();
  const counter = useSelector(getCountValue);
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  // const [selected, setSelected] = useState("Invoices");
  //Fetch Profile Data
  const {
    data: profileData,
    refetch: fetchProfile,
    isFetching: fetchingProfile,
  } = useFetchSingleDocument(`${backendURL}/users/my-profile`);
  useEffect(() => {
    if (session?.accessToken) fetchProfile();
  }, [fetchProfile, session?.accessToken, counter]);
  // Handle Logo Click
  const handLogoClick = () => {
    route.push("/");
    dispatch(setResetInvoice());
    dispatch(setResetInvoiceSetting());
  };
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    route.push("/profile");
    setAnchorEl(null);
  };
  const handleLoginButton = () => {
    setLoading(true);
    handleLogin();
  };
  const headerData = [
    { title: "Invoices", url: "/invoices" },
    { title: "Clients", url: "/clients" },
  ];
  const handleButton = (data: any) => {
    // setSelected(data.title);
    route.push(data.url);
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
          <Box onClick={handLogoClick} sx={{ cursor: "pointer" }}>
            <Icon icon="logo" height={24} width={175} />
          </Box>
          <Box >
            {session &&
              headerData.map((data, index) => (
                <Button
                  key={index}
                  onClick={() => handleButton(data)}
                  variant="text"
                  size="small"
                  sx={{
                    borderBottom:
                      data.url === pathname
                        ? `2px solid ${palette.primary.main}`
                        : "",
                    borderRadius: "0px",
                    px: 1,
                    mr:1
                  }}
                >
                  {data.title}
                </Button>
              ))}
          </Box>
        </Stack>
        <Stack direction={"row"} gap={3}>
          {!session ? (
            <Button
              onClick={handleLoginButton}
              variant="contained"
              disabled={loading}
              sx={{ px: "20px", py: "8px" }}
            >
              {loading ? <CircularProgress size={18} /> : "Login"}
            </Button>
          ) : (
            <>
              <Typography sx={{ color: "black", alignSelf: "center" }}>
                Hi, {profileData?.name}
              </Typography>
              <Box>
                <Stack
                  direction={"row"}
                  gap={1}
                  sx={{ cursor: "pointer" }}
                  onClick={handleClick}
                >
                  {profileData?.image ? (
                    <Avatar
                      sx={{ width: "32px", height: "32px" }}
                      alt="Avatar"
                      src={imageConvertion(profileData?.image)}
                    />
                  ) : (
                    <Avatar
                      sx={{ width: "32px", height: "32px" }}
                      alt="Avatar"
                    />
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
                      onClick={handleProfile}
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
            </>
          )}
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
