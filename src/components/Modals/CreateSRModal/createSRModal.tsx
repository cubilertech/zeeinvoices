"use client";
import {
  Backdrop,
  Box,
  Button,
  FormControl,
  IconButton,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { palette } from "@/theme/palette";
import { TextField } from "@/components/TextField";
import { PhoneInputWithCode } from "@/components/PhoneInputWithCode";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { backendURL } from "@/utils/constants";
import {
  getRecipientDetail,
  getSenderDetail,
} from "@/redux/features/invoiceSlice";
import { useFormik } from "formik";
import { countryCodes } from "@/utils/data";
import parsePhoneNumberFromString, { CountryCode } from "libphonenumber-js";

const alphaRegex = /[a-zA-Z]/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov)$/;
const validationSchema = Yup.object({
  name: Yup.string().min(3).max(35).required("Name is required"),
  companyName: Yup.string().min(3).max(35),
  email: Yup.string()
    .min(3)
    .max(50)
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),
  city: Yup.string()
    .min(3)
    .max(20)
    .matches(alphaRegex, "Invalid City")
    .required("City is required"),
  state: Yup.string()
    .min(2)
    .max(20)
    .matches(alphaRegex, "Invalid State")
    .required("State is required"),
  address: Yup.string().min(3).max(255).matches(alphaRegex, "Invalid Address"),
});

interface CreateSRModal {
  onClose: () => void;
  openModal: boolean;
  title?: string;
  InvDetails?: any;
  handleSubmitForm?: any;
  showData?: any;
  detailsOf: string;
  filteredData?: any;
}
const CreateSRModal: FC<CreateSRModal> = ({
  onClose,
  openModal,
  title,
  InvDetails,
  handleSubmitForm,
  showData,
  detailsOf,
  filteredData,
}) => {
  const isMobile = useMediaQuery("(max-width: 500px)");
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [filteredSR, setFilteredSR] = useState(filteredData);
  const senderDetail = useSelector(getSenderDetail);
  const recipientDetail = useSelector(getRecipientDetail);

  const initialValues = {
    name: InvDetails?.name || "",
    companyName: InvDetails?.companyName || "",
    email: InvDetails?.email || "",
    phoneNumber: InvDetails?.phoneNumber || "",
    city: InvDetails?.city || "",
    state: InvDetails?.state || "",
    address: InvDetails?.address || "",
    countryCode: "",
  };
  interface FormErrors {
    name?: string;
    companyName?: string;
    email?: string;
    phoneNumber?: string;
    city?: string;
    state?: string;
    address?: string;
  }

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    resetForm,
    setFieldValue,
    setFieldError,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validate: (values) => {
      const errors: FormErrors = {};

      const phoneError = validatePhoneNumber(
        values.phoneNumber,
        values.countryCode
      );
      if (phoneError) {
        errors.phoneNumber = phoneError;
      }

      const emailError = validateEmail(values.email);
      if (emailError) {
        errors.email = emailError;
      }

      return errors;
    },

    onSubmit: (values) => {
      const data = {
        ...values,
        email: values.email.toLowerCase(),
      };
      onClose();
      setOpen(false);
      handleSubmitForm(data);
      resetForm();
    },
  });

  const validatePhoneNumber = (
    phoneNumber: string,
    countryCode: string
  ): string => {
    // Ensure countryCode is a valid CountryCode
    const validCountryCode = countryCode as CountryCode;

    if (!phoneNumber) {
      return ""; // No phone number entered
    }

    // Parse phone number based on the country code
    const phoneNumberInstance = parsePhoneNumberFromString(
      phoneNumber,
      validCountryCode
    );

    // Check if only the country code is entered
    const isCountryCodeOnly =
      phoneNumber && phoneNumberInstance
        ? phoneNumberInstance.nationalNumber === ""
        : false;

    if (isCountryCodeOnly) {
      return ""; // No number entered, keep the field empty
    }

    if (!phoneNumberInstance || !phoneNumberInstance.isValid()) {
      return "Enter valid number"; // Invalid number
    }

    return ""; // Valid phone number
  };

  const handlePhoneInputChange = (value: string) => {
    const isCountryCodeOnly = countryCodes.some(
      (code) => value === code || value === `${code} `
    );

    if (isCountryCodeOnly) {
      // Clear the phone number field if only country code is entered

      handleChange({
        target: {
          name: "phoneNumber",
          value: "",
        },
      });
    } else {
      handleChange({
        target: {
          name: "phoneNumber",
          value: value,
        },
      });
    }
  };

  const validateEmail = (email: string) => {
    if (filteredSR) {
      const emailExists = filteredSR.some((item: any) => item.email === email);
      console.log(emailExists, "emailExists");
      if (emailExists) {
        return `${detailsOf} email already exists`;
      }
    }

    if (detailsOf === "Sender") {
      if (email === recipientDetail.email && email !== "")
        return "Sender email must be different from recipient email";
    } else {
      if (email === senderDetail.email && email !== "")
        return "Recipient email must be different from sender email";
    }

    return "";
  };

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0, 0, 0, 0)",
        }}
        open={openModal}
      >
        <Modal
          open={openModal}
          onClose={onClose}
          disableAutoFocus
          sx={{
            overflow: "auto",
            "& .MuiModal-backdrop": {
              backgroundColor: "rgba(35, 35, 35, 0.1)",
            },
          }}
        >
          <Box
            sx={{
              overflow: "auto",
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { sm: "566px", xs: "90%" },
              height: "auto",
              bgcolor: palette.base.white,
              boxShadow: 1,
              p: "24px",
              borderRadius: "8px",
            }}
          >
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant="display-xs-semibold">
                {showData ? "Edit " : "Add New "}
                {detailsOf === "Recipient" ? "Recipient" : detailsOf}
              </Typography>
              <IconButton onClick={onClose}>
                <CloseIcon
                  sx={{
                    width: "20px",
                    height: "20px",
                    color: palette.color.gray[300],
                  }}
                />
              </IconButton>
            </Stack>

            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  overflow: { sm: "initial", xs: "auto" },
                  height: { sm: "auto", xs: "400px" },
                }}
              >
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  sx={{
                    marginTop: "32px",
                    flexDirection: { sm: "row", xs: "column" },
                    gap: "16px",
                  }}
                >
                  <FormControl sx={{ width: { sm: "50%", xs: "100%" } }}>
                    <TextField
                      isRequired={true}
                      label="Name"
                      size="large"
                      name="name"
                      borderRadius="4px"
                      value={values.name}
                      onChange={handleChange}
                      sx={{
                        width: { sm: "100%", xs: "100%" },
                        "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                      }}
                      helperText={touched.name && errors.name}
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
                    />
                  </FormControl>
                  <FormControl sx={{ width: { sm: "50%", xs: "100%" } }}>
                    <TextField
                      label="Company Name"
                      size="large"
                      name="companyName"
                      borderRadius="4px"
                      onChange={handleChange}
                      value={values.companyName}
                      sx={{
                        width: { sm: "100%", xs: "100%" },
                        "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                      }}
                      helperText={touched.companyName && errors.companyName}
                      onBlur={handleBlur}
                      error={touched.companyName && Boolean(errors.companyName)}
                    ></TextField>
                  </FormControl>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  sx={{
                    marginTop: "10px",
                    flexDirection: { sm: "row", xs: "column" },
                    gap: "16px",
                  }}
                >
                  <FormControl sx={{ width: { sm: "50%", xs: "100%" } }}>
                    <TextField
                      isRequired={true}
                      label="Email"
                      size="large"
                      name="email"
                      borderRadius="4px"
                      onChange={handleChange}
                      value={values.email}
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                      }}
                      helperText={touched.email && errors.email}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                    ></TextField>
                  </FormControl>
                  <FormControl sx={{ width: { sm: "50%", xs: "100%" } }}>
                    <Typography
                      variant="text-sm-medium"
                      sx={{ marginBottom: "5px" }}
                    >
                      Phone
                    </Typography>

                    <PhoneInputWithCode
                      borderRadius="4px"
                      value={values.phoneNumber}
                      onChange={(value) => handlePhoneInputChange(value)}
                      onCountrySelect={(selectedCountry) => {
                        setFieldValue("countryCode", selectedCountry.code);
                      }}
                      height="48px"
                    />

                    {touched.phoneNumber && Boolean(errors.phoneNumber) && (
                      <Typography
                        color="error"
                        variant="text-xs-regular"
                        sx={{ marginTop: "5px", marginLeft: "15px" }}
                      >
                        {typeof errors.phoneNumber === "string"
                          ? errors.phoneNumber
                          : "Invalid phone number"}{" "}
                      </Typography>
                    )}
                  </FormControl>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  sx={{
                    marginTop: "10px",
                    flexDirection: { sm: "row", xs: "column" },
                    gap: "16px",
                  }}
                >
                  <FormControl sx={{ width: { sm: "50%", xs: "100%" } }}>
                    <TextField
                      isRequired={true}
                      label="City"
                      size="large"
                      borderRadius="4px"
                      name="city"
                      onChange={handleChange}
                      value={values.city}
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                      }}
                      helperText={touched.city && errors.city}
                      onBlur={handleBlur}
                      error={touched.city && Boolean(errors.city)}
                    ></TextField>
                  </FormControl>
                  <FormControl sx={{ width: { sm: "50%", xs: "100%" } }}>
                    <TextField
                      isRequired={true}
                      label="Country/State"
                      size="large"
                      name="state"
                      borderRadius="4px"
                      onChange={handleChange}
                      value={values.state}
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                      }}
                      helperText={touched.state && errors.state}
                      onBlur={handleBlur}
                      error={touched.state && Boolean(errors.state)}
                    ></TextField>
                  </FormControl>
                </Stack>
                <Box sx={{ marginTop: "10px" }}>
                  <FormControl fullWidth>
                    <TextField
                      label="Address"
                      size="large"
                      name="address"
                      borderRadius="4px"
                      onChange={handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                      }}
                      value={values.address}
                      helperText={touched.address && errors.address}
                      onBlur={handleBlur}
                      error={touched.address && Boolean(errors.address)}
                    ></TextField>
                  </FormControl>
                </Box>
              </Box>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                gap={"12px"}
                sx={{
                  marginTop: "32px",
                  flexDirection: { sm: "row", xs: "column" },
                }}
              >
                <Button
                  onClick={onClose}
                  variant="outlined"
                  sx={{
                    width: { sm: "50%", xs: "100%" },
                    height: "40px",
                    borderColor: palette.base.borderColor,
                    color: "#445164",
                    borderRadius: "4px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: { sm: "50%", xs: "100%" },
                    height: "40px",
                    px: "24px !important",
                    borderRadius: "4px",
                  }}
                >
                  {showData ? "Update" : "Add"}
                </Button>
              </Stack>
            </form>
          </Box>
        </Modal>
      </Backdrop>
    </>
  );
};

export default CreateSRModal;
