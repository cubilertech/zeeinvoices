"use client";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React, { FC } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 3,
};

interface SaveModal {
  onSave: () => void;
  onClose: () => void;
  open: boolean;
}
const SaveModal: FC<SaveModal> = ({ onSave, onClose, open }) => {
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={onClose}
      >
        <Box sx={style}>
          <Stack direction={"column"} gap={2}>
            <Stack direction={"column"} gap={1}>
              <Typography variant="text-lg-semibold">
                Please Login to save invoice.
              </Typography>
              <Typography variant="text-sm-regular">
                You can save and keep records of your invoices by just logging
                in with Google
              </Typography>
            </Stack>

            <Stack direction={"row"}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "8px",
                  width: "100%",
                  //   backgroundColor: "#DD3409",
                  marginTop: "15px",
                  "&:hover": {
                    // backgroundColor: "#BB3409",
                  },
                }}
                onClick={onSave}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default SaveModal;
