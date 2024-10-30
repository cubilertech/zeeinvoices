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
import { CreateSRModal } from "../Modals/CreateSRModal";

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
  const isSenderError = useSelector(getSenderDetailsError);
  const isRecipientError = useSelector(getRecipientDetailsError);

  const apiRouteSender = `${backendURL}/senders/getAll`;
  const apiRouteClient = `${backendURL}/clients/getAll`;

  const [openBd, setOpenBd] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [openSR, setOpenSR] = React.useState(false);

  const [isSelectedList, setIsSelectedList] = React.useState({
    isSender: false,
    isRecipient: false,
  });
  const [isSenderList, setIsSenderList] = useState("");
  const [isRecipientList, setIsRecipientList] = useState("");

  const handleItemSelected = (item: any) => {
    if (item === "Sender") {
      setIsSenderList(item);
      setIsSelectedList((prev) => ({
        ...prev,
        isSender: true,
      }));
    } else {
      setIsRecipientList(item);
      setIsSelectedList((prev) => ({
        ...prev,
        isRecipient: true,
      }));
    }
  };
  const handleOpen = () => {
    setOpen(true), setOpenBd(true);
  };

  const handleOpenSR = () => {
    setOpenSR(true);
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
      handleCloseBd();
      setOpen(false);
      handleSubmitForm(data);
      resetForm();
    },
  });

  // backdrop for modal

  const handleCloseBd = () => {
    setOpenBd(false);
  };

  //close model
  const handleModelClose = () => {
    resetForm();
    handleCloseBd();
    setOpen(false);
  };

  const handleSRModelClose = () => {
    setOpenSR(false);
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
    <Box
      sx={{
        width: "100%",
        height: "auto",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
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
          detailsOf={detailsOf}
          openSRModal={openSR}
          onSRModalClose={handleSRModelClose}
        />
      )}
      {!showData ? (
        <>
          <Box
            borderRadius={1}
            sx={{
              flexGrow: 1,
              width: { sm: "100%", xs: "100%" },
              height: 184,
              maxHeight: "100%",
              marginTop: "16px",
              py: "10px",
              px: "14px",
              borderRadius: "4px",
              cursor: "pointer",
              border: `1px solid ${palette.color.gray[200]}`,
              boxShadow: palette.boxShadows.shadowxs,
            }}
            onClick={session?.accessToken ? handleOpenSR : handleOpen}
          >
            <Stack direction={"row"} justifyContent={"space-between"}></Stack>
            <Stack
              direction={"column"}
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
              sx={{ color: "red", position: "absolute", bottom: -14 }}
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
            flexGrow: 1,
            width: "100%",
            minHeight: 184,
            marginTop: "16px",
            padding: 2,
            borderRadius: "4px",
            cursor: type != "edit" && !isListSelected ? "pointer" : "default",
            border: `1px solid ${palette.color.gray[200]}`,
            boxShadow: palette.boxShadows.shadowxs,
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
              sx={{
                mt: "8px",
                fontSize: "14px",
                lineHeight: "17px",
                fontWeight: 400,
                color: palette.color.gray[510],
              }}
            >
              {/* {title === "From" ? "Sender Details" : "Recipient Details"} */}
            </Typography>
            {type != "edit" && !isListSelected && (
              <IconButton
                sx={{
                  padding: "0px !important",
                  height: "25px !important",
                  width: "25px !important",
                }}
              >
                <Icon icon="editIcon" width={20} height={20} />
              </IconButton>
            )}
            {isListSelected && (
              <IconButton
                sx={{
                  padding: "0px !important",
                  height: "20px !important",
                  width: "20px !important",
                }}
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
          <Stack sx={{ marginTop: 1 }}>
            <Typography
              variant="text-xs-bold"
              sx={{
                fontSize: "14px",
                lineHeight: "17px",
                fontWeight: 600,
                color: palette.color.gray[900],
              }}
            >
              {InvDetails?.companyName}
            </Typography>
            <Stack direction={"column"}>
              <Typography
                variant="text-xs-regular"
                sx={{
                  mt: "8px",
                  fontSize: "14px",
                  lineHeight: "17px",
                  fontWeight: 500,
                  color: palette.color.gray[610],
                }}
              >
                {InvDetails?.name}
              </Typography>
              <Typography
                variant="text-xs-regular"
                sx={{
                  fontSize: "14px",
                  lineHeight: "17px",
                  fontWeight: 400,
                  color: palette.color.gray[610],
                }}
              >
                {InvDetails?.address}
                {InvDetails?.address != "" ? "," : ""} {InvDetails?.city}
              </Typography>
              <Typography
                variant="text-xs-regular"
                sx={{
                  fontSize: "14px",
                  lineHeight: "17px",
                  fontWeight: 500,
                  color: palette.color.gray[610],
                }}
              >
                {InvDetails?.state}
              </Typography>
            </Stack>
            <Stack direction={"column"}>
              <Typography
                variant="text-xs-regular"
                sx={{
                  fontSize: "14px",
                  lineHeight: "17px",
                  fontWeight: 500,
                  color: palette.color.gray[610],
                }}
              >
                {InvDetails?.email}
              </Typography>
              <Typography
                variant="text-xs-regular"
                sx={{
                  fontSize: "14px",
                  lineHeight: "17px",
                  fontWeight: 500,
                  color: palette.color.gray[610],
                }}
              >
                {InvDetails?.phoneNumber}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}

      {/* Modal */}

      <CreateSRModal
        detailsOf={detailsOf}
        InvDetails={InvDetails}
        handleSubmitForm={handleSubmitForm}
        showData={showData}
        onClose={handleModelClose}
        openModal={open}
      />
    </Box>
  );
};

export default DetailSelecter;
