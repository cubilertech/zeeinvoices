"use client";

import { palette } from "@/theme/palette";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { ContactUsCard } from "@/components/ContactUsCrad";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "@/Styles/contactPhoneNoStyle.css";
import { TextField } from "@/components/TextField";
import MulTextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import { FooterSection } from "../SecondLandingPage/FooterSection";

const alphaRegex = /^[a-zA-Z]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov)$/;
const validationSchema = Yup.object({
  firstName: Yup.string()
    .matches(alphaRegex, "Invalid name")
    .required("Name is required"),
  message: Yup.string().required("Message is required"),
  email: Yup.string()
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),
  // phoneNumber: Yup.string().required("Phone number is required"),
});

interface ContactUs {}
const ContactUs: FC<ContactUs> = ({}) => {
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
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    resetForm,
  } = useFormik({
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
            resetForm();
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
    <>
      <Box sx={{ mt: "3%" }}></Box>

      <Box sx={{ backgroundColor: palette.text.termsHeadingColor }}>
        <Container maxWidth="lg" sx={{ overflowY: "auto", height: "100%" }}>
          <Stack direction={"column"} gap={1} sx={{ my: "7%" }}>
            <Typography
              variant="text-sm-bold"
              sx={{ color: palette.base.white }}
            >
              - CONTACT US
            </Typography>
            <Typography
              variant="display-xl-semibold"
              sx={{ color: palette.base.white }}
            >
              Let s Start Working with Us Today
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Box sx={{ backgroundColor: palette.base.white }}>
        <Container maxWidth="lg" sx={{ overflowY: "auto", height: "100%" }}>
          <Stack direction={"column"} gap={2} sx={{ mt: "3%", mb: "1%" }}>
            <Typography
              variant="display-md-semibold"
              sx={{ color: palette.base.black }}
            >
              Get in touch
            </Typography>
            <Typography
              variant="text-xl1-regular"
              sx={{ color: palette.text.termsdescColor }}
            >
              Our friendly team would love to hear from you.
            </Typography>
            <hr
              style={{
                margin: "10px 0px 10px 0px",
                height: "1px",
                color: "#D6D8DC",
              }}
            ></hr>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack
              direction={"column"}
              gap={2}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <ContactUsCard icon="emailIcon" title="support@zeeinvoices.com" />
              <ContactUsCard icon="PhoneIcon" title="+1 (480) 920-1123" />
              <ContactUsCard
                icon="navigationPinterIcon"
                title="11133 Shady Trail PMB 205, Dallas, TX 75229"
              />
            </Stack>
            <Box sx={{ display: "flex", alignContent: "center", mt: "6%" }}>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{
                  height: "85%",
                  borderRightWidth: 1,
                  color: "#D6D8DC",
                }}
              />
            </Box>

            {/* right section */}
            <Stack
              direction={"column"}
              gap={2}
              sx={{ width: "480px", mr: "1%" }}
            >
              <form onSubmit={handleSubmit}>
                <Stack direction={"column"} gap={2} sx={{}}>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <FormControl sx={{ width: "224px", height: "44px" }}>
                      <TextField
                        label="First Name"
                        labelColor="#344054"
                        size="large"
                        name="firstName"
                        sx={{
                          width: "224px",
                          height: "44px !important",
                          "& .MuiInputBase-input": {
                            height: "44px",
                            borderRadius: "8px",
                            "&::placeholder": {
                              color: palette.color.gray[740], // Change this to your desired placeholder color
                            },
                          },
                        }}
                        value={values.firstName}
                        onChange={handleChange}
                        helperText={touched.firstName && errors.firstName}
                        onBlur={handleBlur}
                        error={touched.firstName && Boolean(errors.firstName)}
                      />
                    </FormControl>
                    <FormControl sx={{ width: "224px" }}>
                      <TextField
                        label="Last Name"
                        labelColor="#344054"
                        size="large"
                        name="lastName"
                        sx={{
                          width: "224px",
                          "& .MuiInputBase-input": {
                            height: "44px",
                            borderRadius: "8px",
                            "&::placeholder": {
                              color: palette.color.gray[740], // Change this to your desired placeholder color
                            },
                          },
                        }}
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
                        labelColor="#344054"
                        size="large"
                        name="email"
                        sx={{
                          "& .MuiInputBase-input": {
                            height: "44px",
                            borderRadius: "8px",
                            "&::placeholder": {
                              color: palette.color.gray[740], // Change this to your desired placeholder color
                            },
                          },
                        }}
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
                      sx={{ marginBottom: "5px", color: "#344054" }}
                    >
                      Phone
                    </Typography>
                    <PhoneInput
                      style={{ width: "100%" }}
                      name="phoneNumber"
                      className="custom-phone-input"
                      defaultCountry="pk"
                      value={""}
                      onChange={(value) => {
                        handleChange({
                          target: {
                            name: "phoneNumber",
                            value: value,
                          },
                        });
                      }}
                      onBlur={() =>
                        handleBlur({ target: { name: "phoneNumber" } })
                      }
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
                      sx={{ marginBottom: "5px", color: "#344054" }}
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

          <Box sx={{ mt: "7%" }}></Box>
        </Container>
      </Box>

      <FooterSection />
    </>
  );
};
export default ContactUs;
