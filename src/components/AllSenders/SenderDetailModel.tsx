import {
  Backdrop,
  Box,
  Button,
  FormControl,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { palette } from "@/theme/palette";
import { TextField } from "../TextField";
import CloseIcon from "@mui/icons-material/Close";
import "react-international-phone/style.css";
import "@/Styles/phoneNoStyle.css";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PhoneInputWithCode } from "../PhoneInputWithCode";
import { countryCodes } from "@/utils/data";

const alphaRegex = /[a-zA-Z]/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov)$/;
const validationSchema = Yup.object({
  name: Yup.string().min(3).max(35).required("Name is required"),
  companyName: Yup.string().min(3).max(35),
  email: Yup.string()
    .max(60)
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

interface SenderDetail {
  handleSubmitForm?: any;
  type?: string;
  senderModel?: any;
  setSenderModel?: any;
  editId?: any;
}
const SenderDetailModel: FC<SenderDetail> = ({
  handleSubmitForm,
  type,
  senderModel,
  setSenderModel,
  editId,
}) => {
  //close model
  const handleModelClose = () => {
    setSenderModel(false);
  };

  const initialValues = {
    name: editId?.name || "",
    companyName: editId?.company_name || "",
    email: editId?.email || "",
    phoneNumber: editId?.phone_number || "",
    city: editId?.city || "",
    state: editId?.state || "",
    address: editId?.address || "",
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
    setFieldValue,
    touched,
    errors,
    resetForm,
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

      return errors;
    },
    onSubmit: (values) => {
      handleModelClose();
      handleSubmitForm(values);
      resetForm();
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
      // Otherwise, update with the full value
      handleChange({
        target: {
          name: "phoneNumber",
          value: value,
        },
      });
    }
  };

  return (
    <Box
      borderRadius={1}
      sx={{
        width: 316,
      }}
    >
      {/* Modal */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0, 0, 0, 0)",
        }}
        open={senderModel}
      >
        <Modal
          open={senderModel}
          onClose={handleModelClose}
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
              borderRadius: "12px",
            }}
          >
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant="text-lg-semibold">
                {type === "add" ? "Add New" : "Edit"} Sender
              </Typography>
              <IconButton onClick={handleModelClose}>
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
                  height: { sm: "auto", xs: "400px" },
                  overflow: { sm: "inherit", xs: "auto" },
                }}
              >
                <Stack
                  justifyContent={"space-between"}
                  sx={{
                    marginTop: "10px",
                    flexDirection: { sm: "row", xs: "column" },
                  }}
                >
                  <FormControl sx={{ width: { sm: "240px", xs: "100%" } }}>
                    <TextField
                      isRequired={true}
                      label="Name"
                      size="large"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      sx={{ width: { sm: "240px", xs: "100%" } }}
                      helperText={touched.name && errors.name}
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
                    />
                  </FormControl>
                  <FormControl sx={{ width: { sm: "240px", xs: "100%" } }}>
                    <TextField
                      label="Company Name"
                      size="large"
                      name="companyName"
                      onChange={handleChange}
                      value={values.companyName}
                      sx={{ width: { sm: "240px", xs: "100%" } }}
                      helperText={touched.companyName && errors.companyName}
                      onBlur={handleBlur}
                      error={touched.companyName && Boolean(errors.companyName)}
                    ></TextField>
                  </FormControl>
                </Stack>
                <Stack
                  justifyContent={"space-between"}
                  sx={{
                    marginTop: "10px",
                    flexDirection: { sm: "row", xs: "column" },
                  }}
                >
                  <FormControl sx={{ width: { sm: "240px", xs: "100%" } }}>
                    <TextField
                      isRequired={true}
                      label="Email"
                      size="large"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      sx={{ width: { sm: "240px", xs: "100%" } }}
                      helperText={touched.email && errors.email}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                    ></TextField>
                  </FormControl>
                  <FormControl sx={{ width: { sm: "240px", xs: "100%" } }}>
                    <Typography
                      variant="text-sm-medium"
                      sx={{ marginBottom: "5px" }}
                    >
                      Phone
                    </Typography>

                    <PhoneInputWithCode
                      value={values.phoneNumber}
                      onChange={(value) => handlePhoneInputChange(value)}
                      onCountrySelect={(selectedCountry) => {}}
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
                  justifyContent={"space-between"}
                  sx={{
                    marginTop: "10px",
                    flexDirection: { sm: "row", xs: "column" },
                  }}
                >
                  <FormControl sx={{ width: { sm: "240px", xs: "100%" } }}>
                    <TextField
                      isRequired={true}
                      label="City"
                      size="large"
                      name="city"
                      onChange={handleChange}
                      value={values.city}
                      sx={{ width: { sm: "240px", xs: "100%" } }}
                      helperText={touched.city && errors.city}
                      onBlur={handleBlur}
                      error={touched.city && Boolean(errors.city)}
                    ></TextField>
                  </FormControl>
                  <FormControl sx={{ width: { sm: "240px", xs: "100%" } }}>
                    <TextField
                      isRequired={true}
                      label="Country/State"
                      size="large"
                      name="state"
                      onChange={handleChange}
                      value={values.state}
                      sx={{ width: { sm: "240px", xs: "100%" } }}
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
                      onChange={handleChange}
                      value={values.address}
                      helperText={touched.address && errors.address}
                      onBlur={handleBlur}
                      error={touched.address && Boolean(errors.address)}
                    ></TextField>
                  </FormControl>
                </Box>
              </Box>
              <Stack
                justifyContent={"space-between"}
                gap={2}
                sx={{
                  marginTop: "20px",
                  flexDirection: { sm: "row", xs: "column" },
                }}
              >
                <Button
                  onClick={handleModelClose}
                  variant="outlined"
                  sx={{
                    width: { sm: "243px", xs: "100%" },
                    height: "40px",
                    borderColor: palette.base.borderColor,
                    color: "#445164",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: { sm: "243px", xs: "100%" },
                    height: "40px",
                    m: 0,
                  }}
                >
                  {type === "add" ? "Add " : "Update"}
                </Button>
              </Stack>
            </form>
          </Box>
        </Modal>
      </Backdrop>
    </Box>
  );
};

export default SenderDetailModel;
