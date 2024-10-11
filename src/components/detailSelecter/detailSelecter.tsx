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
import { backendURL } from "@/utils/constants";
import React, { FC, useState, useEffect } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import { TextField } from "../TextField";
import CloseIcon from "@mui/icons-material/Close";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import { useFormik } from "formik";
import * as Yup from "yup";
import "@/Styles/phoneNoStyle.css";
import {
  getSenderDetail,
  getRecipientDetail,
  setResetFromDetails,
  setResetToDetails,
} from "@/redux/features/invoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { SelectInput } from "../SelectInput";
import { SelectSenderReceiver } from "../SelectSenderReceiver";
import {
  useFetchAllDocument,
  useFetchSingleDocument,
} from "@/utils/ApiHooks/common";
import { useSession } from "next-auth/react";
import {
  getIsRecipientSelected,
  getIsSenderSelected,
  setRecipientSelected,
  setResetSelectedList,
  setSenderSelected,
} from "@/redux/features/listSelected";
import { PhoneInputWithCode } from "../PhoneInputWithCode";
import { countryCodes } from "@/utils/data";
import {
  getRecipientDetailsError,
  getSenderDetailsError,
  setRecipientDetailsError,
  setSenderDetailsError,
} from "@/redux/features/validationSlice";

const alphaRegex = /[a-zA-Z]/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov)$/;
const validationSchema = Yup.object({
  name: Yup.string().min(3).max(100).required("Name is required"),
  companyName: Yup.string(),
  // .required("Company Name is required"),
  email: Yup.string()
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),
  // phoneNumber: Yup.string().required("Phone number is required"),
  city: Yup.string()
    .min(3)
    .max(100)
    .matches(alphaRegex, "Invalid City")
    .required("City is required"),
  state: Yup.string()
    .min(3)
    .max(100)
    .matches(alphaRegex, "Invalid State")
    // .min(3, "City must be at least 3 characters long")
    .required("State is required"),
  address: Yup.string().min(3).max(400).matches(alphaRegex, "Invalid Address"),
  // .min(5, "Too short")
  // .required("Address is required"),
});
interface DetailSelecter {
  title?: string;
  detailsOf: string;
  showData?: any;
  InvDetails?: any;
  handleSubmitForm?: any;
  type?: any;
  isListSelected?: boolean;
}
const DetailSelecter: FC<DetailSelecter> = ({
  title,
  detailsOf,
  showData,
  InvDetails,
  handleSubmitForm,
  type,
  isListSelected,
}) => {
  const dispatch = useDispatch();
  // dispatch(setResetSelectedList());
  const isSenderError = useSelector(getSenderDetailsError);
  const isRecipientError = useSelector(getRecipientDetailsError);

  const apiRouteSender = `${backendURL}/senders/getAll`;
  const apiRouteClient = `${backendURL}/clients/getAll`;

  const [open, setOpen] = React.useState(false);
  const [isSelectedList, setIsSelectedList] = React.useState({
    isSender: false,
    isRecipient: false,
  });
  const [isSenderList, setIsSenderList] = useState("");
  const [isRecipientList, setIsRecipientList] = useState("");

  const handleItemSelected = (item: any) => {
    if (item === "Sender") {
      setIsSenderList(item);
      // dispatch(setSenderSelected(true));
      setIsSelectedList((prev) => ({
        ...prev,
        isSender: true,
      }));
    } else {
      setIsRecipientList(item);
      // dispatch(setRecipientSelected(true));
      setIsSelectedList((prev) => ({
        ...prev,
        isRecipient: true,
      }));
    }
  };
  const handleOpen = () => {
    setOpen(true), setOpenBd(true);
  };

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
  const senderDetail = useSelector(getSenderDetail);
  const recipientDetail = useSelector(getRecipientDetail);

  const fromSelected = useSelector(getIsSenderSelected);
  const toSelected = useSelector(getIsRecipientSelected);

  const { data: session } = useSession();
  const {
    data: senderList,
    refetch: refetchSenderList,
    isFetching: fetchingSenderList,
    isFetched: SenderFetched,
  } = useFetchAllDocument(apiRouteSender);
  const {
    data: clientList,
    refetch: refetchClientList,
    isFetching: fetchingClientList,
    isFetched: ClientFetched,
  } = useFetchAllDocument(apiRouteClient);

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    resetForm,
    setFieldValue,
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
      handleCloseBd();
      setOpen(false);
      handleSubmitForm(data);
      // Reset the form fields
      resetForm();
    },
  });

  // backdrop for modal
  const [openBd, setOpenBd] = React.useState(false);
  const handleCloseBd = () => {
    setOpenBd(false);
  };

  //close model
  const handleModelClose = () => {
    resetForm();
    handleCloseBd();
    setOpen(false);
  };

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

  const validateEmail = (email: string) => {
    if (title === "From") {
      if (email === recipientDetail.email && email !== "")
        return "Sender email must be different from recipient email";
    } else {
      if (email === senderDetail.email && email !== "")
        return "Recipient email must be different from sender email";
    }

    return "";
  };

  const filteredClientData = React.useMemo(() => {
    if (clientList && clientList?.clients?.length) {
      return clientList?.clients;
    } else {
      return [];
    }
  }, [clientList]);

  const filteredSenderData = React.useMemo(() => {
    if (senderList && senderList?.senders?.length) {
      return senderList?.senders;
    } else {
      return [];
    }
  }, [senderList]);

  useEffect(() => {
    if (session?.accessToken) {
      refetchClientList();
      refetchSenderList();
    }
  }, [refetchClientList, refetchSenderList, session?.accessToken]);

  const isMobile = useMediaQuery("(max-width: 500px)");

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Dispatch the reset action
      dispatch(setResetSelectedList());
    };

    if (showData) {
      if (detailsOf == "Sender") {
        dispatch(setSenderDetailsError(false));
      }
      if (detailsOf == "Recipient") {
        dispatch(setRecipientDetailsError(false));
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch, showData, detailsOf]);

  return (
    <Box sx={{ width: "100%" }}>
      {title && (
        <Typography
          variant="text-sm-medium"
          sx={{
            fontSize: { sm: "14px", xs: "14px" },
            lineHeight: { sm: "20px", xs: "20px" },
            fontWeight: { xs: 500 },
            pb: "6px",
            color: "#4B5565",
          }}
        >
          {title == "From" ? "Sender Details" : "Recipient Details"}
        </Typography>
      )}
      {session?.accessToken && type != "edit" && (
        <SelectSenderReceiver
          name={
            fromSelected ? InvDetails?.name : toSelected ? InvDetails?.name : ""
          }
          width={isMobile ? "100%" : "100%"}
          placeholder={`Add existing ${detailsOf}`}
          borderRadius={"4px"}
          type={`${detailsOf}`}
          filteredData={
            detailsOf === `Sender` ? filteredSenderData : filteredClientData
          }
          onItemSelected={handleItemSelected}
        />
      )}
      {!showData ? (
        <>
          <Box
            borderRadius={1}
            sx={{
              width: { sm: "100%", xs: "100%" },
              height: 222,
              marginTop: "16px",
              py: "10px",
              px: "14px",
              borderRadius: "4px",
              cursor: "pointer",
              border: `1px solid ${palette.color.gray[200]}`,
              boxShadow: palette.boxShadows.shadowxs,
            }}
            onClick={handleOpen}
          >
            <Stack direction={"row"} justifyContent={"space-between"}>
              {/* <Typography
                variant="text-xs-regular"
                color={palette.color.gray[770]}
              >
                {detailsOf} Details
              </Typography> */}
            </Stack>
            <Stack
              direction={"column"}
              // spacing={1.5}
              sx={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                gap: "8px",
              }}
            >
              <Icon icon="addCircleIcon" height={32} width={32}></Icon>
              <Typography
                variant="text-sm-medium"
                color={palette.color.gray[610]}
              >
                Add New {detailsOf}
              </Typography>
            </Stack>
          </Box>
          {(isSenderError || isRecipientError) && (
            <Typography
              variant="text-xxs-medium"
              sx={{ color: "red", position: "absolute" }}
            >
              {detailsOf} details are required
            </Typography>
          )}
        </>
      ) : (
        // After data populate
        <Box
          borderRadius={1}
          sx={{
            width: "100%",
            height: 222,
            marginTop: "16px",
            padding: 2,
            borderRadius: "4px",
            cursor: type != "edit" && !isListSelected ? "pointer" : "default",
            border: `1px solid ${palette.color.gray[120]}`,
          }}
          onClick={() => {
            if (type != "edit" && !isListSelected) {
              handleOpen();
            }
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ alignItems: "center" }}
          >
            <Typography
              variant="text-sm-medium"
              color={palette.color.gray[750]}
            >
              {title === "From" ? "Sender Details" : "Recipient Details"}
            </Typography>
            {type != "edit" && !isListSelected && (
              <IconButton sx={{ padding: 0 }}>
                <Icon icon="editIcon" width={20} height={20} />
              </IconButton>
            )}
            {isListSelected && (
              <IconButton
                sx={{ padding: 0 }}
                onClick={() => {
                  if (detailsOf == "Sender") {
                    dispatch(setResetFromDetails());
                    dispatch(setSenderSelected(false));
                  } else {
                    dispatch(setResetToDetails());
                    dispatch(setRecipientSelected(false));
                  }
                }}
              >
                <CloseIcon
                  sx={{
                    width: "20px",
                    height: "20px",
                    color: palette.color.gray[300],
                  }}
                />
              </IconButton>
            )}
          </Stack>
          <Stack spacing={2} sx={{ marginTop: 2 }}>
            <Typography variant="text-xs-bold">
              {InvDetails?.companyName}
            </Typography>
            <Stack direction={"column"}>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {InvDetails?.name}
              </Typography>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {InvDetails?.address}, {InvDetails?.city}
              </Typography>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {InvDetails?.state}
              </Typography>
            </Stack>
            <Stack direction={"column"}>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {InvDetails?.email}
              </Typography>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {InvDetails?.phoneNumber}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}

      {/* Modal */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0, 0, 0, 0)",
        }}
        open={openBd}
      >
        <Modal
          open={open}
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
                {type === "add" ? "Add" : "Edit"}{" "}
                {detailsOf === "Recipient" ? "Receiver" : detailsOf} Details
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
                direction={"row"}
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
                {/* <FormControl sx={{ width: { sm: "240px", xs: "100%" } }}>
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
                </FormControl> */}
                <FormControl sx={{ width: { sm: "240px", xs: "100%" } }}>
                  <Typography
                    variant="text-sm-medium"
                    sx={{ marginBottom: "5px" }}
                  >
                    Phone
                  </Typography>

                  <PhoneInputWithCode
                    value={values.phoneNumber} // Bind Formik's phoneNumber value
                    // defaultCountryPhoneCode={values.countryCode}
                    onChange={(value) => handlePhoneInputChange(value)} // Use Formik's setFieldValue to update the state
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
                      {/* {errors.phoneNumber || "Invalid phone number"} */}
                      {typeof errors.phoneNumber === "string"
                        ? errors.phoneNumber
                        : "Invalid phone number"}{" "}
                      {/* Ensure it's a string or fallback */}
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

              <Stack
                direction={"row"}
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
                    px: "24px !important",
                  }}
                >
                  Add
                </Button>
              </Stack>
            </form>
          </Box>
        </Modal>
      </Backdrop>
    </Box>
  );
};

export default DetailSelecter;
