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
import "@/Styles/phoneNoStyle.css";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";

const countryCodes = [
  "+1",
  "+7",
  "+20",
  "+27",
  "+30",
  "+31",
  "+32",
  "+33",
  "+34",
  "+36",
  "+39",
  "+40",
  "+41",
  "+43",
  "+44",
  "+45",
  "+46",
  "+47",
  "+48",
  "+49",
  "+51",
  "+52",
  "+53",
  "+54",
  "+55",
  "+56",
  "+57",
  "+58",
  "+60",
  "+61",
  "+62",
  "+63",
  "+64",
  "+65",
  "+66",
  "+81",
  "+82",
  "+84",
  "+86",
  "+90",
  "+91",
  "+92",
  "+93",
  "+94",
  "+95",
  "+98",
  "+211",
  "+212",
  "+213",
  "+216",
  "+218",
  "+220",
  "+221",
  "+222",
  "+223",
  "+224",
  "+225",
  "+226",
  "+227",
  "+228",
  "+229",
  "+230",
  "+231",
  "+232",
  "+233",
  "+234",
  "+235",
  "+236",
  "+237",
  "+238",
  "+239",
  "+240",
  "+241",
  "+242",
  "+243",
  "+244",
  "+245",
  "+246",
  "+248",
  "+249",
  "+250",
  "+251",
  "+252",
  "+253",
  "+254",
  "+255",
  "+256",
  "+257",
  "+258",
  "+260",
  "+261",
  "+262",
  "+263",
  "+264",
  "+265",
  "+266",
  "+267",
  "+268",
  "+269",
  "+290",
  "+291",
  "+297",
  "+298",
  "+299",
  "+350",
  "+351",
  "+352",
  "+353",
  "+354",
  "+355",
  "+356",
  "+357",
  "+358",
  "+359",
  "+370",
  "+371",
  "+372",
  "+373",
  "+374",
  "+375",
  "+376",
  "+377",
  "+378",
  "+379",
  "+380",
  "+381",
  "+382",
  "+383",
  "+385",
  "+386",
  "+387",
  "+389",
  "+420",
  "+421",
  "+423",
  "+500",
  "+501",
  "+502",
  "+503",
  "+504",
  "+505",
  "+506",
  "+507",
  "+508",
  "+509",
  "+590",
  "+591",
  "+592",
  "+593",
  "+594",
  "+595",
  "+596",
  "+597",
  "+598",
  "+599",
  "+670",
  "+672",
  "+673",
  "+674",
  "+675",
  "+676",
  "+677",
  "+678",
  "+679",
  "+680",
  "+681",
  "+682",
  "+683",
  "+685",
  "+686",
  "+687",
  "+688",
  "+689",
  "+690",
  "+691",
  "+692",
  "+850",
  "+852",
  "+853",
  "+855",
  "+856",
  "+880",
  "+886",
  "+960",
  "+961",
  "+962",
  "+963",
  "+964",
  "+965",
  "+966",
  "+967",
  "+968",
  "+970",
  "+971",
  "+972",
  "+973",
  "+974",
  "+975",
  "+976",
  "+977",
  "+992",
  "+993",
  "+994",
  "+995",
  "+996",
  "+998",
  "+1242",
  "+1246",
  "+1264",
  "+1268",
  "+1284",
  "+1340",
  "+1345",
  "+1441",
  "+1473",
  "+1649",
  "+1664",
  "+1670",
  "+1671",
  "+1684",
  "+1721",
  "+1758",
  "+1767",
  "+1784",
  "+1809",
  "+1868",
  "+1869",
  "+1876",
  "+1939",
];

const alphaRegex = /[a-zA-Z]/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov)$/;
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  companyName: Yup.string(),
  // .required("Company Name is required"),
  email: Yup.string()
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),
  // phoneNumber: Yup.string().required("Phone number is required"),
  city: Yup.string()
    .matches(alphaRegex, "Invalid City")
    .required("City is required"),
  state: Yup.string()
    .matches(alphaRegex, "Invalid State")
    // .min(3, "City must be at least 3 characters long")
    .required("State is required"),
  address: Yup.string().matches(alphaRegex, "Invalid Address"),
  // .min(5, "Too short")
  // .required("Address is required"),
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
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
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
        // height: 242,
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
                {type === "add" ? "Add New" : "Edit"} Recipient
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
                // direction={"row"}
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
                  <PhoneInput
                    name="phoneNumber"
                    className="custom-phone-input"
                    value={values.phoneNumber || ""}
                    onChange={(value) => handlePhoneInputChange(value)}
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
                    label="State"
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

              <Stack
                // direction={"row"}
                justifyContent={"space-between"}
                // spacing={2}
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

export default ClientDetailModel;
