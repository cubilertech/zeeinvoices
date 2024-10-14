"use client";
import {
  Box,
  Button,
  ButtonBase,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { Close, SaveAlt } from "@mui/icons-material";
import { Icon } from "../Icon";

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
        <Box sx={{ ...style, width: { sm: 400, xs: "90%" } }}>
          <Stack direction={"column"} gap={2}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #EAECF0",
                }}
              >
                <Icon icon="pdfPriviewIcon" width={18} height={18} />
              </Box>

              <ButtonBase
                onClick={onClose}
                sx={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid EAECF0",
                }}
              >
                <Close sx={{ width: 22, height: 22, color: "#98A2B3" }} />
              </ButtonBase>
            </Box>
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
                  height: "44px",
                  marginTop: "15px",
                  fontSize: "16px !important",
                  fontWeight: "600 !important",
                  "&:hover": {},
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
