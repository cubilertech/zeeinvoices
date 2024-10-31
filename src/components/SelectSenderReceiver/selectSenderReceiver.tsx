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
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipientDetail,
  setRecipientDetail,
  setSenderDetail,
} from "@/redux/features/invoiceSlice";
import {
  setRecipientSelected,
  setSenderSelected,
} from "@/redux/features/listSelected";
import CloseIcon from "@mui/icons-material/Close";
import { CreateSRModal } from "../Modals/CreateSRModal";

interface SelectSenderReceiver {
  type?: string;
  filteredData?: any;
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
  type,
  filteredData,
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
  const SelectedRecipientDetail = useSelector(getRecipientDetail);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredItems, setFilteredItems] = useState(filteredData); // State for filtered countries
  console.log(filteredData, "fd", filteredItems);
  const [openCreateSRModal, setOpenCreateSRModal] = useState(false);

  const handleSelectedItem = (item: any) => {
    if (detailsOf === "Sender") {
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
    setSearchQuery("");
    onSRModalClose();
    setFilteredItems(filteredData);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredItems(
      filteredData.filter(
        (item: any) =>
          item.name.toLowerCase().includes(query) || // Search by country name
          item.email.toLowerCase().includes(query) // Search by phone email
      )
    );
  };

  const handleOpenCreateModel = () => {
    onSRModalClose();
    setOpenCreateSRModal(true);
  };

  const handleCreateModelClose = () => {
    setOpenCreateSRModal(false);
  };

  useEffect(() => {
    setFilteredItems(filteredData);
  }, [filteredData]);

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
                <IconButton onClick={onSRModalClose}>
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
                    value={searchQuery} // Search input value
                    onChange={handleSearch}
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
                {type !== "edit" && (
                  <Tooltip title={`Create new ${detailsOf}`}>
                    <Button
                      variant="contained"
                      onClick={handleOpenCreateModel}
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
                )}
              </Stack>
              {/* section 3: Existing SR list */}
              <Box
                sx={{
                  mt: "16px",
                  height: "335px",
                  overflow: "auto",
                  scrollbarWidth: "thin",
                }}
              >
                <Stack gap={0.5}>
                  {filteredItems.length > 0 ? (
                    filteredItems?.map((item: any, index: any) => (
                      <MenuItem
                        key={index}
                        onClick={() => {
                          handleSelectedItem(item);
                          if (onItemSelected) {
                            onItemSelected(detailsOf);
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
                          <Avatar
                            sx={{
                              bgcolor: palette.primary.main,
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {item.name?.charAt(0).toUpperCase()}
                          </Avatar>
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
                      No {`${detailsOf}`} found. Please add a {`${detailsOf}`}{" "}
                      to proceed.
                    </MenuItem>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Modal>
      </Backdrop>
      <CreateSRModal
        detailsOf={detailsOf}
        InvDetails={InvDetails}
        handleSubmitForm={handleSubmitForm}
        showData={showData}
        onClose={handleCreateModelClose}
        openModal={openCreateSRModal}
      />
    </Box>
  );
};

export default SelectSenderReceiver;
