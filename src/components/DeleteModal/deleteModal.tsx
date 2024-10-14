"use client";
import { Backdrop, Box, Button, Modal, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
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
// Capitalize String
function capitalizeFirstLetter(title?: string) {
  if (!title) return "";
  return (
    title.charAt(0).toLocaleUpperCase() + title.slice(1).toLocaleLowerCase()
  );
}
interface DeleteModal {
  onDelete?: () => void;
  onClose: () => void;
  open: boolean;
  invoiceDelete: any;
  title?: string;
}
const DeleteModal: FC<DeleteModal> = ({
  onDelete,
  onClose,
  open,
  invoiceDelete,
  title,
}) => {
  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0, 0, 0, 0)",
        }}
        open={open}
      >
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            overflow: "auto",
            "& .MuiModal-backdrop": {
              backgroundColor: "rgba(35, 35, 35, 0.1)",
            },
          }}
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
                <Typography variant="text-lg-semibold">
                  Delete {capitalizeFirstLetter(title)}
                </Typography>
                <Typography variant="text-sm-regular">
                  Are you sure you want to delete this {title}?
                </Typography>
              </Stack>
              <Stack direction={"row"} gap={1.5}>
                <Button
                  variant="outlined"
                  sx={{
                    height: "40px",
                    width: "100%",
                    marginTop: "15px",
                    border: `1px solid #DADCE0`,
                    color: "#445164",
                  }}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    height: "40px",
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
      </Backdrop>
    </>
  );
};

export default DeleteModal;
