"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { Icon } from "../Icon";
import { TextField } from "../TextField";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "@/Styles/profilePhoneNoStyle.css";
import ProfileAvatar from "../ProfileAvatar/profileAvatar";

interface Profile {}

const Profile: FC<Profile> = ({}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <>
      <hr />
      <Box
        borderRadius={3}
        sx={{
          alignSelf: "center",
          margin: "20px",
          marginTop: "70px",
          width: "97%",
          height: "928px",
          backgroundColor: palette.base.white,
        }}
      >
        {/* top bar */}
        <Box
          sx={{
            height: "156px",
            background: `linear-gradient(92.47deg, #3F4DE1 47.93%, #4B59E8 112.85%)`,
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            position: "relative",
          }}
        ></Box>

        {/* circle avatar */}
        <ProfileAvatar/>
        

        {/* name and email  */}
        <Stack direction={"column"} sx={{ ml: "210px", mt: "5px" }}>
          <Typography variant="display-xs-semibold">Zapta Tech</Typography>
          <Typography
            variant="text-md-regular"
            sx={{ color: palette.color.gray[735] }}
          >
            ZaptaTech@example.com
          </Typography>
        </Stack>

        {/* profile detail ssection */}
        <Stack
          direction={"column"}
          sx={{
            mt: "50px",
            mx: "20px",
            p: "20px",
            border: `1px solid ${palette.color.gray[5]}`,
            borderRadius: "10px",
          }}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="text-xl-semibold">Profile Details</Typography>
            <Button variant="contained" sx={{ gap: "7px" }}>
              Edit Profile
              <Icon icon="editWhiteIcon" width={12} height={14} />
            </Button>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ mt: "30px" }}
          >
            <FormControl sx={{ width: "333px" }}>
              <TextField
                label="Name/Company Name"
                size="large"
                name="name"
                sx={{ width: "333px" }}
              />
            </FormControl>
            <FormControl sx={{ width: "333px" }}>
              <TextField
                label="Email"
                size="large"
                name="email"
                sx={{ width: "333px" }}
              />
            </FormControl>
            <FormControl sx={{ width: "333px" }}>
              <Typography variant="text-sm-medium" sx={{ marginBottom: "5px" }}>
                Phone
              </Typography>
              <PhoneInput
                style={{ width: "333px",
                 }}
                name="phoneNumber"
                className="custom-phone-input"
                defaultCountry="pk"
                value={"92 300-0000000"}
                // onChange={(value) => {
                //   handleChange({
                //     target: {
                //       name: "phoneNumber",
                //       value: value,
                //     },
                //   });
                // }}
                // onBlur={() =>
                //   handleBlur({ target: { name: "phoneNumber" } })
                // }
              />
              {/* {touched.phoneNumber && Boolean(errors.phoneNumber) && (
                    <Typography
                      color="error"
                      variant="text-xs-regular"
                      sx={{ marginTop: "5px", marginLeft: "15px" }}
                    >
                      {isString(errors.phoneNumber)
                        ? errors.phoneNumber
                        : "Invalid phone number"}
                    </Typography>
                  )} */}
            </FormControl>
          </Stack>
          {/* city, state , address */}
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ mt: "20px" }}
          >
            <FormControl sx={{ width: "333px" }}>
              <TextField
                label="City"
                size="large"
                name="city"
                sx={{ width: "333px" }}
              />
            </FormControl>
            <FormControl sx={{ width: "333px" }}>
              <TextField
                label="State"
                size="large"
                name="state"
                sx={{ width: "333px" }}
              />
            </FormControl>
            <FormControl sx={{ width: "333px" }}>
              <TextField
                label="Address"
                size="large"
                name="address"
                sx={{ width: "333px" }}
              />
            </FormControl>
          </Stack>
        </Stack>

        {/* password section */}

        <Stack
          direction={"column"}
          sx={{
            mt: "50px",
            mx: "20px",
            p: "20px",
            border: `1px solid ${palette.color.gray[5]}`,
            borderRadius: "10px",
          }}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="text-xl-semibold">Profile Details</Typography>
            <Button variant="contained" sx={{ gap: "7px" }}>
              Change Password
              <Icon icon="editWhiteIcon" width={12} height={14} />
            </Button>
          </Stack>

          <Stack direction={"row"} justifyContent={"space-between"}>
            <FormControl sx={{ my: 3 }} variant="outlined">
              <Typography variant="text-sm-medium" sx={{ marginBottom: "5px" }}>
                Current Password
              </Typography>
              <OutlinedInput
                sx={{
                  borderRadius: "8px",
                  height: "48px",
                  width: "333px",
                  borderColor: "#D6DAE1",
                }}
                placeholder="Current Password"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        borderRadius: "50px",
                        height: "5px",
                        width: "5px",
                      }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <Icon icon="closeEyeIcon" width={16} height={16} />
                      ) : (
                        <Icon icon="openEyeIcon" width={16} height={16} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl sx={{ my: 3 }} variant="outlined">
              <Typography variant="text-sm-medium" sx={{ marginBottom: "5px" }}>
                New Password
              </Typography>
              <OutlinedInput
                sx={{
                  borderRadius: "8px",
                  height: "48px",
                  width: "333px",
                  borderColor: "#D6DAE1",
                }}
                placeholder="New Password"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        borderRadius: "50px",
                        height: "5px",
                        width: "5px",
                      }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <Icon icon="closeEyeIcon" width={16} height={16} />
                      ) : (
                        <Icon icon="openEyeIcon" width={16} height={16} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl sx={{ my: 3 }} variant="outlined">
              <Typography variant="text-sm-medium" sx={{ marginBottom: "5px" }}>
                Confirm Password
              </Typography>
              <OutlinedInput
                sx={{
                  borderRadius: "8px",
                  height: "48px",
                  width: "333px",
                  borderColor: "#D6DAE1",
                }}
                placeholder="Confirm Password"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        borderRadius: "50px",
                        height: "5px",
                        width: "5px",
                      }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <Icon icon="closeEyeIcon" width={16} height={16} />
                      ) : (
                        <Icon icon="openEyeIcon" width={16} height={16} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Profile;
