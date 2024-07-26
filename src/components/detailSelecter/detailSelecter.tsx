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
  showData?: any;
  InvDetails?: any;
  handleSubmitForm?: any;
  type?: any;
}
const DetailSelecter: FC<DetailSelecter> = ({
  title,
  detailsOf,
  showData,
  InvDetails,
  handleSubmitForm,
  type,
}) => {
  const dispatch = useDispatch();
  const senderData = useSelector(getSenderDetail);
  const recipientData = useSelector(getRecipientDetail);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true), setOpenBd(true);
  };

  const [detailsEntered, setDetailsEntered] = useState(false); // for modal details
  const initialValues = {
    name: InvDetails?.name,
    companyName: InvDetails?.companyName,
    email: InvDetails?.email,
    phoneNumber: InvDetails?.phoneNumber,
    city: InvDetails?.city,
    state: InvDetails?.state,
    address: InvDetails?.address,
  };
  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: (values) => {
        handleCloseBd();
        console.log(values);
        // setDetailsEntered(true);
        setOpen(false);
        handleSubmitForm(values);
      },
    });
  console.log(initialValues, "valuesss");
  //close model
  const handleModelClose = () => {
    handleCloseBd();
    setOpen(false);
  };

  // backdrop for modal
  const [openBd, setOpenBd] = React.useState(false);
  const handleCloseBd = () => {
    setOpenBd(false);
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
        <Typography variant="text-sm-regular" color={palette.color.gray[110]}>
          {title}
        </Typography>
      )}

      {!showData ? (
        <Box
          borderRadius={1}
          sx={{
            width: 316,
            height: 242,
            marginTop: 1.5,
            padding: 2,
            borderRadius: 2,
            cursor: "pointer",
            border: `1px solid ${palette.color.gray[120]}`,
          }}
          onClick={handleOpen}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography
              variant="text-xs-regular"
              color={palette.color.gray[770]}
            >
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
            <Typography
              variant="text-xs-regular"
              color={palette.color.gray[810]}
            >
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
            border: `1px solid ${palette.color.gray[120]}`,
          }}
          onClick={handleOpen}
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
              {InvDetails.companyName}
            </Typography>
            <Stack direction={"column"}>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {InvDetails.name}
              </Typography>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {InvDetails.address}, {InvDetails.city}
              </Typography>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {InvDetails.state}
              </Typography>
            </Stack>
            <Stack direction={"column"}>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {InvDetails.email}
              </Typography>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {InvDetails.phoneNumber}
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
        // onClick={handleCloseBd}
      >
        <Modal
          open={open}
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
              // boxShadow: `rgba(16, 24, 40, 0.1)`,
              overflow: "auto",
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "566px",
              height: "524px",
              bgcolor: palette.base.white,
              // border: "2px solid #000",
              boxShadow: 1,
              p: "24px",
              borderRadius: "12px",
            }}
          >
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant="text-lg-semibold">
                {type === "add" ? "Add" : "Edit"} {detailsOf} Details
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
                sx={{ marginTop: "20px" }}
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
                sx={{ marginTop: "20px" }}
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
                  <TextField
                    label="Phone number"
                    size="large"
                    name="phoneNumber"
                    onChange={handleChange}
                    value={values.phoneNumber as string}
                    sx={{ width: "240px" }}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    onBlur={handleBlur}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  ></TextField>
                </FormControl>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{ marginTop: "20px" }}
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
              <Box sx={{ marginTop: "20px" }}>
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
                    // sx={{ width: "100%" }}
                  ></TextField>
                </FormControl>
              </Box>
              {/* <Stack
              direction={"row"}
              justifyContent={"space-between"}
              spacing={2}
              sx={{ marginTop: "20px" }}
            >
              <Button
                onClick={handleModelClose}
                variant="outlined"
                sx={{ width: "243px", borderColor: palette.base.borderColor, color:"#445164"}}
              >
                <FormControl sx={{ width: "240px" }} onBlur={handleBlur}>
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
                <FormControl sx={{ width: "240px" }} onBlur={handleBlur}>
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
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{ marginTop: "20px" }}
              >
                <FormControl sx={{ width: "240px" }} onBlur={handleBlur}>
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
                <FormControl sx={{ width: "240px" }} onBlur={handleBlur}>
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
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{ marginTop: "20px" }}
              >
                <FormControl sx={{ width: "240px" }} onBlur={handleBlur}>
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
                <FormControl sx={{ width: "240px" }} onBlur={handleBlur}>
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
                    sx={{ width: "100%" }}
                  ></TextField>
                  {errors.address && (
                    <Box sx={{ color: "#D33131" }}>{errors.address}</Box>
                  )}
                </FormControl>
              </Box> */}
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
                  // onClick={handleCloseBd}
                  variant="contained"
                  sx={{ width: "243px", height: "40px" }}
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
