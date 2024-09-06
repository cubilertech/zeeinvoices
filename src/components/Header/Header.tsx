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
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  console.log(`Path Name: >>> : ${pathname}`);
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
    handleLogin(pathname);
  };
  const handleLogoutButton = () => {
    dispatch(setResetInvoiceSetting());
    dispatch(setResetInvoice());
    handleLogout();
  };
  const headerData = [
    { title: "Invoices", url: "/invoices" },
    { title: "Recipients", url: "/clients" },
  ];
  const headerLandingData = [
    { title: "Home", url: "/" },
    { title: "About Us", url: "" },
    // { title: "Learn", url: "" },
  ];
  const handleButton = (data: any) => {
    // setSelected(data.title);
    route.push(data.url);
  };
  const handleCrtInvButton = (data: any) => {
    route.push("/create-new-invoice");
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
        py: "14px",
        px: "40px",
        borderBottom: `1px solid #00000033`,
        boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 0px 0px",
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
          <Box>
            {headerLandingData.map((data, index) => (
              <Button
                key={index}
                onClick={() => handleButton(data)}
                variant="text"
                size="small"
                sx={{
                  color:
                    data.url === pathname
                      ? palette.primary.main
                      : palette.base.black,
                  borderBottom:
                    data.url === pathname
                      ? `2px solid ${palette.primary.main}`
                      : "",
                  borderRadius: "0px",
                  px: 1,
                  mr: 1,
                  fontFamily: "Product Sans, sans-serif !important",
                  fontSize: "14px !important",
                  fontWeight: "400 !important",
                }}
              >
                {data.title}
              </Button>
            ))}
            {session &&
              headerData.map((data, index) => (
                <Button
                  key={index}
                  onClick={() => handleButton(data)}
                  variant="text"
                  size="small"
                  sx={{
                    color:
                      data.url === pathname
                        ? palette.primary.main
                        : palette.base.black,
                    borderBottom:
                      data.url === pathname
                        ? `2px solid ${palette.primary.main}`
                        : "",
                    borderRadius: "0px",
                    px: 1,
                    mr: 1,
                    fontFamily: "Product Sans, sans-serif !important",
                    fontSize: "14px !important",
                    fontWeight: "400 !important",
                  }}
                >
                  {data.title}
                </Button>
              ))}
          </Box>
        </Stack>
        <Stack direction={"row"} gap={3}>
          {!session?.accessToken ? (
            <Stack direction={"row"} gap={1.5}>
              {pathname == "/" ||
              pathname == "/termsAndCondition" ||
              pathname == "/contact-us" ? (
                <Button
                  onClick={handleCrtInvButton}
                  variant="outlined"
                  disabled={loading}
                  sx={{
                    px: "20px",
                    py: "8px",
                    borderRadius: "4px",
                    border: `1px solid ${palette.border.outlinedBtnBorderColor}`,
                  }}
                >
                  Create Invoice
                </Button>
              ) : (
                <></>
              )}

              <Button
                onClick={handleLoginButton}
                variant={
                  pathname == "/" || pathname == "/termsAndCondition"
                    ? "contained"
                    : "contained"
                }
                disabled={loading}
                sx={{
                  py: "0px !important",
                  px: "20px !important",
                  borderRadius: "4px !important",
                  fontFamily: "Product Sans, sans-serif !important",
                  fontSize: "14px !important",
                  fontWeight: "400 !important",
                  background:
                    "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                }}
              >
                {loading ? <CircularProgress size={18} /> : "Sign In"}
              </Button>
            </Stack>
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
                      alt="Bvatar"
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
                      onClick={handleLogoutButton}
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
