"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Icon } from "../Icon";
import { frontendUrl } from "@/utils/constants";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "540px",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 3,
};

interface ShareModal {
  onShare: () => void;
  onClose: () => void;
  open: boolean;
  shareUrlId:number;
}
const ShareModal: FC<ShareModal> = ({ onShare, onClose, open ,shareUrlId}) => {
  const value = `${frontendUrl}/preview/${shareUrlId}`;
  const handleCopyClick = () => {
    navigator.clipboard.writeText(value)
      .then(() => {
        toast.success('Text copied! Feel free to paste it into a new tab');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };
  return (
    <>
      <Modal
        disableAutoFocus
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction={"column"} gap={1}>
            <Stack direction={"column"} gap={0}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="text-lg-semibold">Share</Typography>
                <IconButton onClick={onClose}>
                  <CloseIcon
                    sx={{
                      width: "20px",
                      height: "20px",
                      color: palette.color.gray[300],
                    }}
                  />
                </IconButton>
              </Stack>
              <Typography variant="text-sm-regular" sx={{ color: "#445164" }}>
                Share this to one of the platforms below
              </Typography>
              <FormControl sx={{ my: 3 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  value={value}
                  sx={{
                    borderRadius: "8px",
                    height: "48px",
                    borderColor: "#D6DAE1",
                  }}
                  id="outlined-adornment-password"
                  type={"text"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        sx={{ borderRadius: "50px" }}
                        aria-label="toggle password visibility"
                        onClick={handleCopyClick}
                        edge="end"
                      >
                        {<Icon icon="copyIcon" width={16} height={16} />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Stack direction={"row"} gap={3}>
                <Box
                  sx={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#2AA81A",
                    borderRadius: 45,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <Icon icon="whatsappIcon" width={24} height={24} />
                </Box>
                <Box
                  sx={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#3B5998",
                    borderRadius: 45,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <Icon icon="facebookIcon" width={14} height={32} />
                </Box>
                <Box
                  sx={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 45,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <Icon icon="twitterIcon" width={48} height={48} />
                </Box>
              </Stack>
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
              onClick={onShare}
                variant="contained"
                sx={{
                  height: "40px",
                  width: "100%",
                  marginTop: "15px",
                }}
              >
                Share
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ShareModal;
