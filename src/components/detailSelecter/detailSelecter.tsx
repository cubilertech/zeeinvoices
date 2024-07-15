"use client";
import {
  Box,
  Button,
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
import { getRecipientDetail, getSenderDetail, setRecipientDetail, setSenderDetail } from "../../redux/features/invoiceSlice";

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
  const data= useSelector(getSenderDetail);
  const data1= useSelector(getRecipientDetail);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [detailsEntered, setDetailsEntered] = useState(false); // for modal details
  const [details, setDetails] = useState({
    name: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    city: "",
    state: "",
    address: "",
  });

  // {console.log(data,'redux')}
  // {console.log(data1,'redux1')}
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    // console.log(`The name (handleInputChange) is ${details.name}`);
  };

  const handleAddDetails = () => {
    setDetailsEntered(true);
    setOpen(false);
    detailsOf === "Sender" ? dispatch(setSenderDetail(details)) : dispatch(setRecipientDetail(details));
    // console.log(`The name (handleAddDetails) is ${details.name}`);
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
          <Typography variant="body1" color={palette.color.gray[750]}>
            {detailsOf} Details
          </Typography>
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
          <Typography variant="text-sm-medium" color={palette.color.gray[750]}>
            {title}
          </Typography>
          <Stack spacing={2} sx={{ marginTop: 2 }}>
            <Typography variant="text-xs-bold">
              {details.companyName}
            </Typography>
            <Stack direction={"column"}>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {details.name}
              </Typography>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {details.address}, {details.city}
              </Typography>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {details.state}
              </Typography>
            </Stack>
            <Stack direction={"column"}>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {details.email}
              </Typography>
              <Typography
                variant="text-xs-regular"
                color={palette.color.gray[720]}
              >
                {details.phoneNumber}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}

      {/* Model */}
      <Modal open={open} onClose={handleClose} disableAutoFocus>
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
            <IconButton onClick={handleClose}>
              <CloseIcon
                sx={{
                  width: "20px",
                  height: "20px",
                  color: palette.color.gray[300],
                }}
              />
            </IconButton>
          </Stack>

          <Stack direction={"row"} spacing={3} sx={{ marginTop: "20px" }}>
            <TextField
              label="Name"
              size="large" 
              name="name"
              value={details.name}
              onChange={handleInputChange}
              sx={{ width: "240px" }}
            />
            <TextField
              label="Company Name"
              size="large"
              name="companyName"
              onChange={handleInputChange}
              value={details.companyName}
              sx={{ width: "240px" }}
            ></TextField>
          </Stack>
          <Stack direction={"row"} spacing={3} sx={{ marginTop: "20px" }}>
            <TextField
              label="Email"
              size="large"
              name="email"
              onChange={handleInputChange}
              value={details.email}
              sx={{ width: "240px" }}
            ></TextField>
            <TextField
              label="Phone number"
              size="large"
              name="phoneNumber"
              onChange={handleInputChange}
              value={details.phoneNumber}
              sx={{ width: "240px" }}
            ></TextField>
          </Stack>
          <Stack direction={"row"} spacing={3} sx={{ marginTop: "20px" }}>
            <TextField
              label="City"
              size="large"
              name="city"
              onChange={handleInputChange}
              value={details.city}
              sx={{ width: "240px" }}
            ></TextField>
            <TextField
              label="State"
              size="large"
              name="state"
              onChange={handleInputChange}
              value={details.state}
              sx={{ width: "240px" }}
            ></TextField>
          </Stack>
          <Box sx={{ marginTop: "20px" }}>
            <TextField
              label="Address"
              size="large"
              name="address"
              onChange={handleInputChange}
              value={details.address}
              // sx={{ width: "100%" }}
            ></TextField>
          </Box>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            spacing={2}
            sx={{ marginTop: "20px" }}
          >
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ width: "243px", borderColor: palette.base.borderColor }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddDetails}
              variant="contained"
              sx={{ width: "243px" }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default DetailSelecter;
