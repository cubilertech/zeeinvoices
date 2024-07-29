"use client";
import { palette } from "@/theme/palette";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { Icon } from "../Icon";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  borderRadius: "12px",
  boxShadow: 24,
  p: 3,
};

interface DeleteModal {
  onDelete: () => void;
  onClose: () => void;
  open: boolean;
  invoiceDelete:any
}
const DeleteModal: FC<DeleteModal> = ({ onDelete, onClose, open,invoiceDelete }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
          <Stack direction={"column"} gap={2}>
            <Box
              sx={{
                width: "48px",
                height: "48px",
                backgroundColor: "#FCEBE6",
                borderRadius: 45,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Icon icon="deleteRedIcon" />
            </Box>
            <Stack direction={"column"} gap={1}>
              <Typography variant="text-lg-semibold">Delete Client</Typography>
              <Typography variant="text-sm-regular">
                Are you sure you want to delete this client?
              </Typography>
            </Stack>

            <Stack direction={"row"} gap={1.5}>
              <Button
                variant="outlined"
                sx={{
                  height:"40px",
                  width: "100%",
                  marginTop: "15px",
                  border: `1px solid #DADCE0`,
                  color: "#445164",
                }}
                onClick={onDelete}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  height:"40px",
                  width: "100%",
                  backgroundColor: "#DD3409",
                  marginTop: "15px",
                  "&:hover": {
                    backgroundColor: "#BB3409",
                  },
                }}
                onClick={invoiceDelete}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteModal;
