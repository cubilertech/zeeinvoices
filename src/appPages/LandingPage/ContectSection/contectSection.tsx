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
import { useFormik } from "formik";
import * as Yup from "yup";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import { Icon } from "@/components/Icon";

const alphaRegex = /[a-zA-Z]/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov)$/;
const validationSchema = Yup.object({
  firstName: Yup.string().required("Name is required"),
  message: Yup.string().required("Message is required"),
  email: Yup.string()
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),
  // phoneNumber: Yup.string().required("Phone number is required"),
});

const ContectSection = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
    countryCode: "",
  };
  interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    message?: string;
    countryCode?: string;
  }
  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,

      validate: (values) => {
        const errors: FormErrors = {}; // Use FormErrors type here

        // Validate other fields
        // ...

        // Validate phone number
        const phoneError = validatePhoneNumber(
          values.phoneNumber,
          values.countryCode
        );
        if (phoneError) {
          errors.phoneNumber = phoneError;
        }

        return errors;
      },

      onSubmit: (values) => {
        fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((response) => {
            if (response.status === 200) {
              alert("Message sent successfully!");
            } else {
              alert("Failed to send message.");
            }
          })
          .catch((error) => {
            alert("An error occurred while sending the message.");
          });
      },
    });

  function isString(value: any): value is string {
    return typeof value === "string";
  }

  const validatePhoneNumber = (
    phoneNumber: string,
    countryCode: string
  ): string => {
    // Ensure countryCode is a valid CountryCode
    // const validCountryCode: CountryCode = countryCode as CountryCode;
    const validCountryCode = countryCode as CountryCode;
    if (!phoneNumber) {
      // return "Phone number is required";
      return "";
    }
    const phoneNumberInstance = parsePhoneNumberFromString(
      // This function parses the phone number according to the given country code.
      phoneNumber,
      validCountryCode
    );
    // if (!phoneNumberInstance) {
    //   return "Invalid phone number.";
    // }
    if (!phoneNumberInstance?.isValid()) {
      return "Invalid phone number";
    }
    return "";
  };
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
        {/* left section */}
        <Box
          sx={{
            width: "576px",
            height: "712px",
            borderRadius: "15px",
            backgroundColor: palette.primary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon icon="whiteLogo" height={126} width={220} />
          {/* <Image
            src="/Images/zepta-image.svg"
            width={576}
            height={712}
            alt="rectangle iaptop bg"
          /> */}
        </Box>

        {/* right section */}
        <Stack direction={"column"} gap={2} sx={{ width: "540px" }}>
          <form onSubmit={handleSubmit}>
            <Stack direction={"column"} gap={2}>
              <Typography variant="display-lg-bold">Contact us</Typography>
              <Typography
                variant="text-xl-regular"
                sx={{ color: palette.color.gray[725] }}
              >
                Our friendly team would love to hear from you.
              </Typography>
            </Stack>

            <Stack direction={"column"} gap={2} sx={{ mt: "5%" }}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <FormControl sx={{ width: "240px" }}>
                  <TextField
                    label="First Name"
                    size="large"
                    name="firstName"
                    sx={{ width: "240px" }}
                    value={values.firstName}
                    onChange={handleChange}
                    helperText={touched.firstName && errors.firstName}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                  />
                </FormControl>
                <FormControl sx={{ width: "240px" }}>
                  <TextField
                    label="Last Name"
                    size="large"
                    name="lastName"
                    sx={{ width: "240px" }}
                    value={values.lastName}
                    onChange={handleChange}
                    helperText={touched.lastName && errors.lastName}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                  />
                </FormControl>
              </Stack>

              <Stack direction={"row"}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Email"
                    size="large"
                    name="email"
                    sx={{}}
                    value={values.email}
                    onChange={handleChange}
                    helperText={touched.email && errors.email}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                  />
                </FormControl>
              </Stack>

              <FormControl sx={{ width: "100%" }}>
                <Typography
                  variant="text-sm-medium"
                  sx={{ marginBottom: "5px" }}
                >
                  Phone
                </Typography>
                <PhoneInput
                  style={{ width: "100%" }}
                  name="phoneNumber"
                  className="custom-phone-input"
                  defaultCountry="us"
                  value={""}
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: "phoneNumber",
                        value: value,
                      },
                    });
                  }}
                  onBlur={() => handleBlur({ target: { name: "phoneNumber" } })}
                />
                {touched.phoneNumber && Boolean(errors.phoneNumber) && (
                  <Typography
                    color="error"
                    variant="text-xs-regular"
                    sx={{ marginTop: "5px", marginLeft: "15px" }}
                  >
                    {isString(errors.phoneNumber)
                      ? errors.phoneNumber
                      : "Invalid phone number"}
                  </Typography>
                )}
              </FormControl>

              <Stack direction={"column"}>
                <Typography
                  variant="text-sm-medium"
                  sx={{ marginBottom: "5px" }}
                >
                  Message
                </Typography>
                <MulTextField
                  name="message"
                  id="outlined-multiline-static"
                  multiline
                  rows={5}
                  placeholder="Leave us a message..."
                  sx={{
                    "& .MuiInputBase-input::placeholder": {
                      color: "#667085",
                    },
                  }}
                  value={values.message}
                  onChange={handleChange}
                  helperText={touched.message && errors.message}
                  onBlur={handleBlur}
                  error={touched.message && Boolean(errors.message)}
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
              type="submit"
              variant="contained"
              size="large"
              sx={{
                width: "100%",
                height: "48px",
                py: "12px",
                px: "20px",
                mt: "10px",
              }}
            >
              Send message
            </Button>
          </form>
        </Stack>
      </Stack>
    </Box>
  );
};
export default ContectSection;
