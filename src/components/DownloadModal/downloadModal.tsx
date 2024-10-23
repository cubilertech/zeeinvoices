"use client";
import {
  Backdrop,
  Box,
  Button,
  ButtonBase,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import PdfDownloadLink from "../PdfDownloadLink/PdfDownloadLink";
import { Close, SaveAlt } from "@mui/icons-material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 3,
};

interface DownloadModal {
  onLogin: () => void;
  onClose: () => void;
  open: boolean;
  InvSetting?: any;
  InvDetails?: any;
  summaryDetail?: any;
}
const DownloadModal: FC<DownloadModal> = ({
  onLogin,
  onClose,
  open,
  InvSetting,
  InvDetails,
  summaryDetail,
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
                  <SaveAlt sx={{ width: 22, height: 22, color: "#5E5E62" }} />
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
                <Typography variant="text-lg-semibold">Download</Typography>
                <Typography variant="text-sm-regular">
                  You can save and keep records of your invoices by just logging
                  in with Google.
                </Typography>
              </Stack>
              <Stack direction={"row"} gap={1.5}>
                <Box sx={{ width: "50%" }}>
                  <PdfDownloadLink
                    InvSetting={InvSetting}
                    InvDetails={InvDetails}
                    summaryDetail={summaryDetail}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        width: "100%",
                        marginTop: "15px",
                        border: `1px solid #D0D5DD`,
                        borderRadius: "8px",
                        color: "#344054",
                        height: "44px",
                        fontSize: "16px !important",
                        fontWeight: "600 !important",
                      }}
                    >
                      Download
                    </Button>
                  </PdfDownloadLink>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    width: "50%",
                    borderRadius: "8px",
                    marginTop: "15px",
                    height: "44px",
                    fontSize: "16px !important",
                    fontWeight: "600 !important",
                    "&:hover": {
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
      </Backdrop>
    </>
  );
};

export default DownloadModal;
