"use client";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipientDetail,
  getSenderDetail,
  setRecipientDetail,
  setSenderDetail,
} from "@/redux/features/invoiceSlice";
import {
  getIsRecipientSelected,
  getIsSenderSelected,
  setRecipientSelected,
  setSenderSelected,
} from "@/redux/features/listSelected";
import CloseIcon from "@mui/icons-material/Close";

interface SelectSenderReceiver {
  name?: string;
  width?: string | number;
  height?: string | number;
  placeholder?: string;
  borderRadius?: string | number;
  type?: string;
  filteredData?: any;
  menuData?: string[];
  onItemSelected?: (type: any) => void;

  onSRModalClose: () => void;
  openSRModal: boolean;
  title?: string;
  InvDetails?: any;
  handleSubmitForm?: any;
  showData?: any;
  detailsOf: string;
}
const SelectSenderReceiver: FC<SelectSenderReceiver> = ({
  name,
  type,
  menuData,
  placeholder = "Select",
  width = 385,
  height = 44,
  filteredData,
  borderRadius = 2,
  onItemSelected,

  onSRModalClose,
  openSRModal,
  title,
  InvDetails,
  handleSubmitForm,
  showData,
  detailsOf,
}) => {
  const dispatch = useDispatch();
  const SelectedSenderDetail = useSelector(getSenderDetail);
  const SelectedRecipientDetail = useSelector(getRecipientDetail);
  const fromSelected = useSelector(getIsSenderSelected);
  const toSelected = useSelector(getIsRecipientSelected);

  const handleSelectedItem = (item: any) => {
    if (type === "Sender") {
      dispatch(setSenderSelected(true));
      dispatch(
        setSenderDetail({
          ...item,
          phoneNumber: item.phone_number,
          companyName: item.company_name,
        })
      );
    } else {
      dispatch(setRecipientSelected(true));
      dispatch(
        setRecipientDetail({
          ...item,
          phoneNumber: item.phone_number,
          companyName: item.company_name,
        })
      );
    }
    onSRModalClose();
  };

  return (
    <Box borderRadius={1}>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0, 0, 0, 0)",
        }}
        open={openSRModal}
      >
        <Modal
          open={openSRModal}
          onClose={onSRModalClose}
          disableAutoFocus
          sx={{
            overflow: "auto",
            "& .MuiModal-backdrop": {
              backgroundColor: "rgba(35, 35, 35, 0.1)",
            },
          }}
        >
          <Box
            sx={{
              overflow: "auto",
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { sm: "618px", xs: "90%" },
              height: "auto",
              bgcolor: palette.base.white,
              boxShadow: 1,
              p: "20px",
              borderRadius: "8px",
            }}
          >
            <Stack direction={"column"} sx={{ borderRadius: "8px" }}>
              {/* section 1: header */}
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack direction={"column"}>
                  <Typography
                    variant="text-xl-semibold"
                    sx={{ color: palette.color.gray[820] }}
                  >
                    Select {detailsOf}
                  </Typography>
                  <Typography
                    variant="text-sm-regular"
                    sx={{ color: palette.color.gray[725] }}
                  >
                    Kindly select the {detailsOf} for the invoice.
                  </Typography>
                </Stack>
                <IconButton onClick={onSRModalClose} sx={{}}>
                  <CloseIcon
                    sx={{
                      width: "20px",
                      height: "20px",
                      color: palette.color.gray[300],
                    }}
                  />
                </IconButton>
              </Stack>
              {/* section 2: search and create */}
              <Stack
                direction={{ sm: "row", xs: "column" }}
                gap={1}
                sx={{ mt: "24px" }}
              >
                <Stack
                  direction={"row"}
                  sx={{
                    height: "44px",
                    backgroundColor: palette.base.white,
                    borderRadius: "4px",
                    width: { sm: "451px", xs: "100%" },
                    px: "14px",
                    py: "10px",
                    flexDirection: { sm: "row", xs: "column" },
                    alignItems: { sm: "center", xs: "flex-start" },
                    justifyContent: { sm: "start", xs: "center" },
                    border: "1px solid #CDD5DF",
                    boxShadow: palette.boxShadows.shadowxs,
                  }}
                >
                  <TextField
                    variant="standard"
                    placeholder="Search"
                    // value={search}
                    // onChange={(e) => handleChangeSearch(e)}
                    sx={{
                      width: "100%",
                      border: "none",
                      textUnderlinePosition: "unset",
                      "& .MuiInputBase-input": {
                        border: "none",
                        height: "30px",
                        pl: "0px",
                        pr: "0px",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: palette.color.gray[510],
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon icon="searchIcon" width={20} height={20} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
                <Tooltip title={`Create new ${detailsOf}`}>
                  <Button
                    variant="contained"
                    // onClick={handleCreate}
                    sx={{
                      height: `44px`,
                      px: "18px !important",
                      py: "10px !important",
                      borderRadius: "4px",
                      width: { sm: "187px", xs: "100%" },
                      fontSize: "16px !important",
                      lineHeight: "24px !important",
                      fontWeight: "600 !important",
                      backgroundColor: palette.primary.main,
                    }}
                  >
                    Create {detailsOf}
                  </Button>
                </Tooltip>
              </Stack>
              {/* section 3: Existing SR list */}
              <Stack sx={{ mt: "16px" }} gap={0.5}>
                {filteredData && filteredData.length > 0 ? (
                  filteredData?.map((item: any, index: any) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        handleSelectedItem(item);
                        if (onItemSelected) {
                          onItemSelected(type);
                        }
                      }}
                      sx={{
                        color: palette.base.black,
                        backgroundColor: palette.base.white,
                        borderRadius: "6px",
                        px: "8px",
                        py: "12px",
                        border:
                          SelectedRecipientDetail?.email === item.email
                            ? `1px solid ${palette.primary.main}`
                            : "",
                        "&.Mui-selected": {
                          bgcolor: "#F9FAFB",
                          color: "darkblue",
                          "&:hover": {
                            bgcolor: "#F9FAFB",
                          },
                        },
                        "&:hover": {
                          bgcolor: "#F9FAFB",
                        },
                      }}
                      value={item.name}
                    >
                      <Stack
                        direction={"row"}
                        sx={{
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Avatar />
                        <Stack direction={"column"} sx={{ ml: "8px" }}>
                          <Typography
                            variant="text-md-medium"
                            sx={{
                              color: palette.color.gray[820],
                              lineHeight: "20px",
                            }}
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            variant="text-md-regular"
                            sx={{
                              color: palette.color.gray[725],
                              lineHeight: "20px",
                            }}
                          >
                            {item.email}
                          </Typography>
                        </Stack>
                      </Stack>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled sx={{ color: palette.base.black }}>
                    No {`${type}`} Found
                  </MenuItem>
                )}
              </Stack>
            </Stack>
          </Box>
        </Modal>
      </Backdrop>
    </Box>
  );
};

export default SelectSenderReceiver;
