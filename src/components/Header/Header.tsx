"use client";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";

import React, { useEffect } from "react";
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
import { BorderRight, Menu as MenuIcon } from "@mui/icons-material";
import "@/Styles/sectionStyle.css";
import { ProfilePopover } from "../ProfilePopover";

const Header = () => {
  const pathname = usePathname();
  const route = useRouter();
  const dispatch = useDispatch();
  const counter = useSelector(getCountValue);
  const isModile = useMediaQuery("(max-width: 500px)");
  const { data: session } = useSession();

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(
    null
  );
  const openMenu = Boolean(anchorElMenu);

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
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    setAnchorEl(null);
    setAnchorElMenu(null);
    route.push("/profile");
  };
  const handleLoginButton = () => {
    setLoading(true);
    handleLogin(pathname);
    setTimeout(() => setLoading(false), 5000);
  };
  const handleLogoutButton = () => {
    dispatch(setResetInvoiceSetting());
    dispatch(setResetInvoice());
    handleLogout();
  };
  const headerData = [
    { title: "Invoices", url: "/invoices" },
    { title: "Senders", url: "/senders" },
    { title: "Recipients", url: "/clients" },
  ];
  const headerLandingData = [
    { title: "Home", url: "/" },
    { title: "About Us", url: "/about-us" },
  ];
  const handleButton = (data: any) => {
    route.push(data.url);
  };
  const handleCrtInvButton = (data: any) => {
    handleCloseMenu();
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
        py: { sm: "12px", xs: "10px" },
        px: { sm: "0px", xs: "0px" },
        borderBottom: `1px solid #00000033`,
        boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 0px 0px",
      }}
    >
      <Container
        className="mainContainer"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { md: "0%", lg: "0%", xs: "0%" },
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            justifyContent: { sm: "center", xs: "flex-start" },
            alignItems: "center",
            gap: { sm: 5, xs: 22 },
          }}
        >
          <Box onClick={handLogoClick} sx={{ cursor: "pointer" }}>
            <Icon
              priority
              icon="logo"
              height={isModile ? 18 : 24}
              width={isModile ? 132 : 175}
            />
          </Box>
          <Box sx={{ display: { sm: "none", xs: "block" } }}>
            <IconButton
              sx={{ p: "0px !important" }}
              aria-haspopup="true"
              onClick={handleClickMenu}
            >
              <MenuIcon sx={{ width: 24, height: 24 }} />
            </IconButton>
            <Popover
              anchorEl={anchorElMenu}
              open={openMenu}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              sx={{
                "& .MuiPopover-paper": {
                  borderRadius: "8px",
                  p: "8px 12px 8px 12px",
                  width: "189px",
                  marginLeft: "-7px", // Move 5px to the left
                },
              }}
            >
              {session?.accessToken && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    pb: 1,
                  }}
                >
                  {" "}
                  <Box sx={{ width: "41px", height: "41px" }}>
                    {profileData?.image ? (
                      <Avatar
                        sx={{ width: "41px", height: "41px" }}
                        alt="Avatar"
                        src={imageConvertion(profileData?.image)}
                      />
                    ) : (
                      <Avatar
                        sx={{ width: "41px", height: "41px" }}
                        alt="Bvatar"
                      />
                    )}
                  </Box>
                  <Typography
                    sx={{
                      color: "#52525B;",
                      alignSelf: "center",
                      mt: 2,
                      fontSize: "14px",
                      fontWeight: 500,
                      maxWidth: { sm: "100%", xs: "100%" },
                      overflow: "hidden",
                      wordBreak: "break-word",
                    }}
                  >
                    Hi, {profileData?.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#4F35DF",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {profileData?.email}
                  </Typography>
                </Box>
              )}
              {headerLandingData.map((data, index) => (
                <>
                  {index !== 0 && (
                    <Divider
                      sx={{
                        my: "0px !important",
                        p: 0,
                        borderColor: "1px solid #0000001A",
                        width: "100%",
                        mx: "auto",
                      }}
                      variant="middle"
                    />
                  )}

                  <Typography
                    key={index}
                    onClick={() => {
                      handleCloseMenu();
                      handleButton(data);
                    }}
                    sx={{
                      py: 2,
                      color: "black",
                      fontSize: "12px",
                      fontFamily: "Product Sans, sans-serif !important",
                    }}
                  >
                    {data.title}
                  </Typography>
                </>
              ))}
              {session &&
                headerData.map((data, index) => (
                  <>
                    <Divider
                      sx={{
                        my: "0px !important",
                        p: 0,
                        borderColor: "1px solid #0000001A",
                        width: "100%",
                        mx: "auto",
                      }}
                      variant="middle"
                    />
                    <Typography
                      key={index}
                      onClick={() => {
                        handleCloseMenu();
                        handleButton(data);
                      }}
                      sx={{
                        py: 2,
                        color: "black",
                        fontSize: "12px",
                        fontFamily: "Product Sans, sans-serif !important",
                      }}
                    >
                      {data.title}
                    </Typography>
                  </>
                ))}
              <Divider
                sx={{
                  my: "0px !important",
                  p: 0,
                  borderColor: "1px solid #0000001A",
                  width: "100%",
                  mx: "auto",
                }}
                variant="middle"
              />{" "}
              {!session?.accessToken ? (
                <Stack gap={1.5} mt={1}>
                  {pathname == "/" ||
                  pathname == "/terms-and-condition" ||
                  pathname == "/privacy-policy" ||
                  pathname == "/contact-us" ||
                  pathname == "/about-us" ? (
                    <Button
                      onClick={handleCrtInvButton}
                      variant="outlined"
                      disabled={loading}
                      sx={{
                        px: "16px !important",
                        py: "10px !important",
                        borderRadius: "4px",
                        border: `1px solid ${palette.border.outlinedBtnBorderColor}`,
                        fontFamily: "Product Sans, sans-serif",
                        fontSize: {
                          md: "14px !important",
                          xs: "14px !important",
                        },
                        lineHeight: {
                          md: "18px !important",
                          xs: "18px !important",
                        },
                        fontWeight: "700 !important",
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
                      pathname == "/" || pathname == "/terms-and-condition"
                        ? "contained"
                        : "contained"
                    }
                    disabled={loading}
                    sx={{
                      height: "35px !important",
                      py: "10px !important",
                      px: "16px !important",
                      borderRadius: "4px !important",
                      fontFamily: "Product Sans, sans-serif !important",
                      fontSize: "14px !important",
                      lineHeight: {
                        md: "18px !important",
                        xs: "18px !important",
                      },
                      fontWeight: "700 !important",
                      backgroundColor: palette.primary.main,
                    }}
                  >
                    {loading ? (
                      <CircularProgress
                        size={18}
                        sx={{ color: palette.color.gray[5] }}
                      />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </Stack>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: 2,
                    flexDirection: "column",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleProfile}
                    sx={{
                      color: "#4F35DF",
                      border: "0.56px solid #D6D8DC",
                      borderRadius: "2px",
                      "&:hover": {
                        color: "#4F35DF",
                        border: "0.56px solid #D6D8DC",
                        backgroundColor: palette.color.gray[10],
                        borderRadius: "2px",
                      },
                    }}
                    disabled={loading}
                  >
                    Profile
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleLogoutButton}
                    disabled={loading}
                    sx={{
                      height: "35px !important",
                      py: "0px !important",
                      px: "20px !important",
                      borderRadius: "4px !important",
                      fontFamily: "Product Sans, sans-serif !important",
                      fontSize: "14px !important",
                      fontWeight: "400 !important",
                      background:
                        "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                      color: "white",
                    }}
                  >
                    {loading ? (
                      <CircularProgress
                        size={18}
                        sx={{ color: palette.color.gray[5] }}
                      />
                    ) : (
                      "Logout"
                    )}
                  </Button>
                </Box>
              )}
            </Popover>
          </Box>
          <Box sx={{ display: { sm: "block", xs: "none" } }}>
            {!session &&
              headerLandingData.map((data, index) => (
                <Button
                  key={index}
                  onClick={() => handleButton(data)}
                  variant="text"
                  size="small"
                  sx={{
                    minWidth: "42px !important",
                    height: "40px !important",
                    px: "16px",
                    color:
                      data.url === pathname
                        ? palette.primary.main
                        : palette.color.gray[610],
                    backgroundColor:
                      data.url === pathname ? "rgba(79, 53, 223, 0.1)" : "",
                    borderRadius: "8px",
                    mr: "8px",
                    fontFamily: "Product Sans, sans-serif !important",
                    fontSize: "16px !important",
                    lineHeight: "24px !important",
                    fontWeight:
                      data.url === pathname
                        ? "700 !important"
                        : "600 !important",
                    ":hover": {
                      color: palette.primary.main,
                      backgroundColor: "rgba(79, 53, 223, 0.2)",
                    },
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
                    minWidth: "42px !important",
                    height: "40px !important",
                    px: "12px",
                    color:
                      data.url === pathname
                        ? palette.primary.main
                        : palette.color.gray[610],
                    backgroundColor:
                      data.url === pathname ? "rgba(79, 53, 223, 0.1)" : "",
                    borderRadius: "8px",
                    mr: "8px",
                    fontFamily: "Product Sans, sans-serif !important",
                    fontSize: "16px !important",
                    lineHeight: "24px !important",
                    fontWeight:
                      data.url === pathname
                        ? "700 !important"
                        : "600 !important",
                    ":hover": {
                      color: palette.primary.main,
                      backgroundColor: "rgba(79, 53, 223, 0.2)",
                    },
                  }}
                >
                  {data.title}
                </Button>
              ))}
          </Box>
        </Stack>
        <Stack
          direction={"row"}
          gap={3}
          sx={{ display: { sm: "block", xs: "none" } }}
        >
          {!session?.accessToken ? (
            <Stack direction={"row"} gap={2}>
              {pathname == "/" ||
              pathname == "/terms-and-condition" ||
              pathname == "/privacy-policy" ||
              pathname == "/contact-us" ||
              pathname == "/about-us" ? (
                <Button
                  onClick={handleCrtInvButton}
                  variant="outlined"
                  disabled={loading}
                  sx={{
                    px: "16px !important",
                    py: "10px !important",
                    borderRadius: "4px",
                    border: `1px solid ${palette.border.outlinedBtnBorderColor}`,
                    fontFamily: "Product Sans, sans-serif",
                    fontSize: {
                      md: "14px !important",
                      xs: "14px !important",
                    },
                    lineHeight: {
                      md: "18px !important",
                      xs: "18px !important",
                    },
                    fontWeight: "700 !important",
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
                  pathname == "/" || pathname == "/terms-and-condition"
                    ? "contained"
                    : "contained"
                }
                disabled={loading}
                sx={{
                  py: "10px !important",
                  px: "16px !important",
                  borderRadius: "4px !important",
                  fontFamily: "Product Sans, sans-serif !important",
                  fontSize: "14px !important",
                  lineHeight: {
                    md: "18px !important",
                    xs: "18px !important",
                  },
                  fontWeight: "700 !important",
                  backgroundColor: palette.primary.main,
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={18}
                    sx={{ color: palette.primary.main }}
                  />
                ) : (
                  "Sign In"
                )}
              </Button>
            </Stack>
          ) : (
            <Stack
              direction={"row"}
              sx={{ cursor: "pointer", position: "relative" }}
              gap={2}
              onMouseEnter={handleClick}
              onMouseLeave={handleClose}
            >
              <Typography
                sx={{ color: "black", alignSelf: "center", fontWeight: 500 }}
              >
                Hi, {profileData?.name}
              </Typography>
              <Box>
                <Stack direction={"row"} gap={1} onClick={handleClick}>
                  {profileData?.image ? (
                    <Avatar
                      sx={{ width: "40px", height: "40px" }}
                      alt="Avatar"
                      src={imageConvertion(profileData?.image)}
                    />
                  ) : (
                    <Avatar
                      sx={{ width: "40px", height: "40px" }}
                      alt="Bvatar"
                    />
                  )}
                  <Icon icon="arrowDownIcon" width={15} height={15} />
                  <ProfilePopover
                    isOpen={open}
                    profileData={profileData}
                    handleOpenProfile={handleProfile}
                    handleLogout={handleLogoutButton}
                  />
                </Stack>
              </Box>
            </Stack>
          )}
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
