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

interface DownloadModal {
  onLogin: () => void;
  onDownload: () => void;
  onClose: () => void;
  open: boolean;
}
const DownloadModal: FC<DownloadModal> = ({ onLogin, onDownload, onClose, open }) => {
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
            {/* <Box
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
            </Box> */}
            <Stack direction={"column"} gap={1}>
              <Typography variant="text-lg-semibold">
                If you want to Download then watermark will be added, if you
                want to download without watermark click Login{" "}
              </Typography>
              <Typography variant="text-sm-regular">
                You can save and keep records of your invoices by just logging
                in with Google.
              </Typography>
            </Stack>

            <Stack direction={"row"} gap={1.5}>
              <Button
                variant="outlined"
                sx={{
                  width: "100%",
                  marginTop: "15px",
                  border: `1px solid #DADCE0`,
                  borderRadius: "8px",
                  color: "#445164",
                }}
                onClick={onDownload}
              >
                Download
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  //   backgroundColor: "#DD3409",
                  marginTop: "15px",
                  "&:hover": {
                    // backgroundColor: "#BB3409",
                  },
                }}
                onClick={onLogin}
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

export default DownloadModal;
