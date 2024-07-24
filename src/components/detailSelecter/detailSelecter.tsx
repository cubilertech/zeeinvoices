"use client";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import { TextField } from "../TextField";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  ContactDetail,
  getRecipientDetail,
  getSenderDetail,
  setRecipientDetail,
  setSenderDetail,
} from "../../redux/features/invoiceSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  companyName: Yup.string().required("Company Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  address: Yup.string().required("Address is required"),
});

interface DetailSelecter {
  title?: string;
  detailsOf: string;
  // addDetailsOf: string;
}
const DetailSelecter: FC<DetailSelecter> = ({
  title,
  detailsOf,
  // addDetailsOf,
}) => {
  const dispatch = useDispatch();
  const senderData = useSelector(getSenderDetail);
  const recipientData = useSelector(getRecipientDetail);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const [detailsEntered, setDetailsEntered] = useState(false); // for modal details
  const initialValues = {
    name: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    city: "",
    state: "",
    address: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setDetailsEntered(true);
      setOpen(false);
      detailsOf === "Sender"
        ? dispatch(setSenderDetail(values))
        : dispatch(setRecipientDetail(values));
    },
  });

  //close model
  const handleModelClose = () => {
    detailsOf === "Sender"
      ? dispatch(setSenderDetail(senderData))
      : dispatch(setRecipientDetail(recipientData));
    // setDetails(detailsOf === "Sender" ? senderData : recipientData);
    setOpen(false);
  };

  return (
    <Box
      borderRadius={1}
      sx={{
        width: 316,
        height: 242,
      }}
    >
      {title && (
        <Typography variant="body1" color={palette.color.gray[100]}>
          {title}
        </Typography>
      )}

      {!detailsEntered ? (
        <Box
          borderRadius={1}
          sx={{
            width: 316,
            height: 242,
            marginTop: 1.5,
            padding: 2,
            borderRadius: 2,
            cursor: "pointer",
            border: `1px solid ${palette.base.borderColor}`,
          }}
          onClick={handleOpen}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="body1" color={palette.color.gray[750]}>
              {detailsOf} Details
            </Typography>
            {/* <IconButton sx={{ padding: 1 }}>
              <Icon icon="editIcon" width={20} height={20} />
            </IconButton> */}
          </Stack>

          <Stack
            direction={"column"}
            spacing={1.5}
            sx={{
              height: "90%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Icon icon="addCircleIcon" height={32} width={32}></Icon>
            <Typography variant="caption" color={palette.color.gray[750]}>
              Add New {detailsOf}
            </Typography>
          </Stack>
        </Box>
      ) : (
        <Box
          borderRadius={1}
          sx={{
            width: 316,
            height: 242,
            marginTop: 1.5,
            padding: 2,
            borderRadius: 2,
            cursor: "pointer",
            border: `1px solid ${palette.base.borderColor}`,
          }}
          onClick={handleOpen}
        >
          <Stack direction={"row"} justifyContent={"space-between"} sx={{alignItems:"center"}}>
            <Typography
              variant="text-sm-medium"
              color={palette.color.gray[750]}
            >
              {title}
            </Typography>
            <IconButton sx={{ padding: 0 }}>
              <Icon icon="editIcon" width={20} height={20} />
            </IconButton>
          </Stack>

          {/* <Typography variant="text-sm-medium" color={palette.color.gray[750]}>
            {title}
          </Typography> */}
          <Stack spacing={2} sx={{ marginTop: 2 }}>
            <Typography variant="text-xs-bold">
              {detailsOf === "Sender"
                ? senderData.companyName
                : recipientData.companyName}
            </Typography>
            <Stack direction={"column"}>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {detailsOf === "Sender" ? senderData.name : recipientData.name}
              </Typography>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {detailsOf === "Sender"
                  ? senderData.address
                  : recipientData.address}
                ,{" "}
                {detailsOf === "Sender" ? senderData.city : recipientData.city}
              </Typography>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {detailsOf === "Sender"
                  ? senderData.state
                  : recipientData.state}
              </Typography>
            </Stack>
            <Stack direction={"column"}>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {detailsOf === "Sender"
                  ? senderData.email
                  : recipientData.email}
              </Typography>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {detailsOf === "Sender"
                  ? senderData.phoneNumber
                  : recipientData.phoneNumber}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}

      {/* Model */}
      <Modal open={open} onClose={handleModelClose} disableAutoFocus>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // width: "566px",
            // height: "524px",
            bgcolor: palette.base.white,
            // border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="text-lg-semibold">
              Add {detailsOf} Details
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
            <Stack direction={"row"} spacing={3} sx={{ marginTop: "20px" }}>
              <FormControl sx={{ width: "25ch" }} onBlur={handleBlur}>
                <TextField
                  label="Name"
                  size="large"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  sx={{ width: "240px" }}
                />
                {errors.name && (
                  <Box sx={{ color: "#D33131" }}>{errors.name}</Box>
                )}
              </FormControl>
              <FormControl sx={{ width: "25ch" }} onBlur={handleBlur}>
                <TextField
                  label="Company Name"
                  size="large"
                  name="companyName"
                  onChange={handleChange}
                  value={values.companyName}
                  sx={{ width: "240px" }}
                ></TextField>
                {errors.companyName && (
                  <Box sx={{ color: "#D33131" }}>{errors.companyName}</Box>
                )}
              </FormControl>
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{ marginTop: "20px" }}>
              <FormControl sx={{ width: "25ch" }} onBlur={handleBlur}>
                <TextField
                  label="Email"
                  size="large"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  sx={{ width: "240px" }}
                ></TextField>
                {errors.email && (
                  <Box sx={{ color: "#D33131" }}>{errors.email}</Box>
                )}
              </FormControl>
              <FormControl sx={{ width: "25ch" }} onBlur={handleBlur}>
                <TextField
                  label="Phone number"
                  size="large"
                  name="phoneNumber"
                  onChange={handleChange}
                  value={values.phoneNumber as string}
                  sx={{ width: "240px" }}
                ></TextField>
                {errors.phoneNumber && (
                  <Box sx={{ color: "#D33131" }}>{errors.phoneNumber}</Box>
                )}
              </FormControl>
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{ marginTop: "20px" }}>
              <FormControl sx={{ width: "25ch" }} onBlur={handleBlur}>
                <TextField
                  label="City"
                  size="large"
                  name="city"
                  onChange={handleChange}
                  value={values.city}
                  sx={{ width: "240px" }}
                ></TextField>
                {errors.city && (
                  <Box sx={{ color: "#D33131" }}>{errors.city}</Box>
                )}
              </FormControl>
              <FormControl sx={{ width: "25ch" }} onBlur={handleBlur}>
                <TextField
                  label="State"
                  size="large"
                  name="state"
                  onChange={handleChange}
                  value={values.state}
                  sx={{ width: "240px" }}
                ></TextField>
                {errors.state && (
                  <Box sx={{ color: "#D33131" }}>{errors.state}</Box>
                )}
              </FormControl>
            </Stack>
            <Box sx={{ marginTop: "20px" }}>
              <FormControl fullWidth onBlur={handleBlur}>
                <TextField
                  label="Address"
                  size="large"
                  name="address"
                  onChange={handleChange}
                  value={values.address}
                  // sx={{ width: "100%" }}
                ></TextField>
                {errors.address && (
                  <Box sx={{ color: "#D33131" }}>{errors.address}</Box>
                )}
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
                sx={{ width: "243px", borderColor: palette.base.borderColor }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                // onClick={handleSubmit}
                variant="contained"
                sx={{ width: "243px" }}
              >
                Add
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default DetailSelecter;
