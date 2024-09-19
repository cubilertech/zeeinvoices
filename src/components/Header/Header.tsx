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
  Menu,
  MenuItem,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
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
import { BorderRight, Menu as MenuIcon } from "@mui/icons-material";

const Header = () => {
  const pathname = usePathname();
  console.log(`Path Name: >>> : ${pathname}`);
  const route = useRouter();
  const dispatch = useDispatch();
  const counter = useSelector(getCountValue);
  const isModile = useMediaQuery("(max-width: 500px)");
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  // const [selected, setSelected] = useState("Invoices");
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
    { title: "About Us", url: "/about" },
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
        py: { sm: "14px", xs: "10px" },
        px: { sm: "0px", xs: "5px" },
        borderBottom: `1px solid #00000033`,
        boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 0px 0px",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // px: "0px !important",
          px: { md: "0.1%", lg: "0.1%", xs: "5%" },
        }}
      >
        <Stack
          direction={"row"}
          // gap={9}
          sx={{
            justifyContent: { sm: "center", xs: "flex-start" },
            alignItems: "center",
            gap: { sm: 9, xs: 0.8 },
          }}
        >
          <Box sx={{ display: { sm: "none", xs: "block" } }}>
            <IconButton
              sx={{ pl: 0 }}
              aria-haspopup="true"
              onClick={handleClickMenu}
            >
              <MenuIcon sx={{ width: 24, height: 24 }} />
            </IconButton>
            <Popover
              // id="basic-menu"
              anchorEl={anchorElMenu}
              open={openMenu}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              // style={{ borderRadius: "8px", p: 2 }}
              sx={{
                "& .MuiPopover-paper": {
                  borderRadius: "8px",
                  p: "8px 12px 8px 12px",
                  width: "189px",
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
                  pathname == "/termsAndCondition" ||
                  pathname == "/contact-us" ||
                  pathname == "/about" ? (
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
                      height: "35px !important",
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
          <Box onClick={handLogoClick} sx={{ cursor: "pointer" }}>
            <Icon
              icon="logo"
              height={isModile ? 18 : 24}
              width={isModile ? 132 : 175}
            />
          </Box>
          <Box sx={{ display: { sm: "block", xs: "none" } }}>
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
        <Stack
          direction={"row"}
          gap={3}
          sx={{ display: { sm: "block", xs: "none" } }}
        >
          {!session?.accessToken ? (
            <Stack direction={"row"} gap={1.5}>
              {pathname == "/" ||
              pathname == "/termsAndCondition" ||
              pathname == "/contact-us" ||
              pathname == "/about" ? (
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
                  height: "35px !important",
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
            <Stack direction={"row"} gap={2}>
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
            </Stack>
          )}
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
