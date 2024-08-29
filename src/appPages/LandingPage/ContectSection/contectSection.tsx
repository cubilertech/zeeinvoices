"use client";
import { TextField } from "@/components/TextField";
import { palette } from "@/theme/palette";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "@/Styles/contactPhoneNoStyle.css";
import MulTextField from "@mui/material/TextField";

const ContectSection = () => {
  return (
    <Box
      id="contact-section"
      sx={{
        width: "100%",
        py: 12,
        // px: 9,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        direction={"row"}
        gap={8}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {/* left features section */}
        <Box sx={{}}>
          <Image
            src="/Images/zepta-image.svg"
            width={576}
            height={712}
            alt="rectangle iaptop bg"
          />
        </Box>

        {/* right features section */}
        <Stack direction={"column"} gap={2} sx={{ width: "540px" }}>
          <Typography variant="display-lg-bold">Contact us</Typography>
          <Typography
            variant="text-xl-regular"
            sx={{ color: palette.color.gray[725] }}
          >
            Our friendly team would love to hear from you.
          </Typography>

          <Stack direction={"column"} gap={2} sx={{ mt: "5%" }}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <FormControl sx={{ width: "240px" }}>
                <TextField
                  label="First Name"
                  size="large"
                  name="name"
                  sx={{ width: "240px" }}
                />
              </FormControl>
              <FormControl sx={{ width: "240px" }}>
                <TextField
                  label="Last Name"
                  size="large"
                  name="lastName"
                  sx={{ width: "240px" }}
                />
              </FormControl>
            </Stack>

            <Stack direction={"row"}>
              <FormControl sx={{ width: "100%" }}>
                <TextField label="Email" size="large" name="email" sx={{}} />
              </FormControl>
            </Stack>

            <FormControl sx={{ width: "100%" }}>
              <Typography variant="text-sm-medium" sx={{ marginBottom: "5px" }}>
                Phone
              </Typography>
              <PhoneInput
                style={{ width: "100%" }}
                name="phoneNumber"
                className="custom-phone-input"
                defaultCountry="pk"
                value={""}
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

            <Stack direction={"column"}>
              <Typography variant="text-sm-medium" sx={{ marginBottom: "5px" }}>
                Message
              </Typography>
              <MulTextField
                id="outlined-multiline-static"
                multiline
                rows={5}
                placeholder="Leave us a message..."
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    color: "#667085",
                  },
                }}
              />
            </Stack>
            <Stack direction={"row"} sx={{ alignItems: "center" }}>
              <FormControlLabel
                sx={{ mr: "3px" }}
                control={<Checkbox defaultChecked />}
                label="You agree to our friendly"
              />
              <Link
                color="inherit"
                sx={{
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                privacy policy.
              </Link>
            </Stack>
          </Stack>

          <Button
            variant="contained"
            size="large"
            sx={{ height: "48px", py: "12px", px: "20px", mt: "10px" }}
          >
            Send message
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
export default ContectSection;
