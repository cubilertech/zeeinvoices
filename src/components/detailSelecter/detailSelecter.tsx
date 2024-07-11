"use client";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import { TextField } from "../TextField";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      <Box
        borderRadius={1}
        sx={{
          width: 316,
          height: 242,
          marginTop: 1.5,
          padding: 2,
          borderRadius: 2,
          cursor: "pointer",
          border: `1px solid ${palette.borderColor.borderColor}`,
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
          <Icon icon="addCircle" height={32} width={32}></Icon>
          <Typography variant="caption" color={palette.color.gray[750]}>
            Add New {detailsOf}
          </Typography>
        </Stack>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
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
          <Typography variant="text-lg-semibold">
            Add {detailsOf} Details
          </Typography>
          <Stack direction={"row"} spacing={3} sx={{ marginTop: "20px" }}>
            <TextField lable="Name" size="large"></TextField>
            <TextField lable="Company Name" size="large"></TextField>
          </Stack>
          <Stack direction={"row"} spacing={3} sx={{ marginTop: "20px" }}>
            <TextField lable="Email" size="large"></TextField>
            <TextField lable="Phone number" size="large"></TextField>
          </Stack>
          <Stack direction={"row"} spacing={3} sx={{ marginTop: "20px" }}>
            <TextField lable="City" size="large"></TextField>
            <TextField lable="State" size="large"></TextField>
          </Stack>
          <Box sx={{ marginTop: "20px" }}>
            <TextField
              lable="Address"
              size="large"
              // sx={{ width: "100%" }}
            ></TextField>
          </Box>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            spacing={2}
            sx={{ marginTop: "20px" }}
          >
            <Button variant="outlined" sx={{ width: "243px", borderColor:palette.borderColor.borderColor }}>
              Cancel
            </Button>
            <Button variant="contained" sx={{ width: "243px" }}>
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default DetailSelecter;
