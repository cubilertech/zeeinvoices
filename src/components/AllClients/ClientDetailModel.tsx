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
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
// import "./style.css";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";

const alphaRegex = /[a-zA-Z]/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov)$/;
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  companyName: Yup.string().required("Company Name is required"),
  email: Yup.string()
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  city: Yup.string()
    .matches(alphaRegex, "Invalid City")
    .required("City is required"),
  state: Yup.string()
    .matches(alphaRegex, "Invalid State")
    .min(3, "City must be at least 3 characters long")
    .required("State is required"),
  address: Yup.string()
    .matches(alphaRegex, "Invalid Address")
    .min(5, "Too short")
    .required("Address is required"),
});

interface ClientDetail {
  handleSubmitForm?: any;
  type?: string;
  clientModel?: any;
  setClientModel?: any;
  editId?: any;
}
const ClientDetailModel: FC<ClientDetail> = ({
  handleSubmitForm,
  type,
  clientModel,
  setClientModel,
  editId,
}) => {
  //close model
  const handleModelClose = () => {
    setClientModel(false);    
  };

    const initialValues = {
    name:editId?.name || "",
    companyName: editId?.company_name || "",
    email: editId?.email || "",
    phoneNumber: editId?.phone_number || "",
    city: editId?.city || "",
    state: editId?.state || "",
    address: editId?.address || "",
    countryCode: "PK",
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
  console.log(editId?.name, "editId");
  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
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
    const validCountryCode: CountryCode = countryCode as CountryCode;
    if (!phoneNumber) {
      return "Phone number is required";
    }
    const phoneNumberInstance = parsePhoneNumberFromString(
      phoneNumber,
      validCountryCode
    );
    if (!phoneNumberInstance) {
      return "Invalid phone number";
    }
    if (!phoneNumberInstance.isValid()) {
      return "Invalid phone number";
    }
    return "";
  };
  return (
    <Box
      borderRadius={1}
      sx={{
        width: 316,
        height: 242,
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
        open={clientModel}
      >
        <Modal
          open={clientModel}
          onClose={handleModelClose}
          disableAutoFocus
          sx={{
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
              width: "566px",
              height: "auto",
              bgcolor: palette.base.white,
              boxShadow: 1,
              p: "24px",
              borderRadius: "12px",
            }}
          >
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant="text-lg-semibold">
                {type === "add" ? "Add New" : "Edit"} Client
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
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{ marginTop: "10px" }}
              >
                <FormControl sx={{ width: "240px" }}>
                  <TextField
                    label="Name"
                    size="large"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    sx={{ width: "240px" }}
                    helperText={touched.name && errors.name}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                  />
                </FormControl>
                <FormControl sx={{ width: "240px" }}>
                  <TextField
                    label="Company Name"
                    size="large"
                    name="companyName"
                    onChange={handleChange}
                    value={values.companyName}
                    sx={{ width: "240px" }}
                    helperText={touched.companyName && errors.companyName}
                    onBlur={handleBlur}
                    error={touched.companyName && Boolean(errors.companyName)}
                  ></TextField>
                </FormControl>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{ marginTop: "10px" }}
              >
                <FormControl sx={{ width: "240px" }}>
                  <TextField
                    label="Email"
                    size="large"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    sx={{ width: "240px" }}
                    helperText={touched.email && errors.email}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                  ></TextField>
                </FormControl>
                <FormControl sx={{ width: "240px" }}>
                  <Typography
                    variant="text-sm-medium"
                    sx={{ marginBottom: "5px" }}
                  >
                    Phone
                  </Typography>
                  <PhoneInput
                    name="phoneNumber"
                    className="custom-phone-input"
                    defaultCountry="pk"
                    value={values.phoneNumber || ""}
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
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{ marginTop: "10px" }}
              >
                <FormControl sx={{ width: "240px" }}>
                  <TextField
                    label="City"
                    size="large"
                    name="city"
                    onChange={handleChange}
                    value={values.city}
                    sx={{ width: "240px" }}
                    helperText={touched.city && errors.city}
                    onBlur={handleBlur}
                    error={touched.city && Boolean(errors.city)}
                  ></TextField>
                </FormControl>
                <FormControl sx={{ width: "240px" }}>
                  <TextField
                    label="State"
                    size="large"
                    name="state"
                    onChange={handleChange}
                    value={values.state}
                    sx={{ width: "240px" }}
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

              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                spacing={2}
                sx={{ marginTop: "20px" }}
              >
                <Button
                  onClick={handleModelClose}
                  variant="outlined"
                  sx={{
                    width: "243px",
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
                  sx={{ width: "243px", height: "40px" }}
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

export default ClientDetailModel;