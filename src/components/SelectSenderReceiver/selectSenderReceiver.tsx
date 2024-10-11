"use client";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecipientDetail,
  setSenderDetail,
} from "@/redux/features/invoiceSlice";
import {
  getIsRecipientSelected,
  getIsSenderSelected,
  setRecipientSelected,
  setSenderSelected,
} from "@/redux/features/listSelected";
import { Check } from "@mui/icons-material";
// import {
//   // setRecipientSelected,
//   setSenderSelected,
// } from "@/redux/features/listSelected";

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
}) => {
  const dispatch = useDispatch();
  const [selectedSender, setSelectedSender] = useState("");
  const [selectedReceiver, setSelectedReceiver] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const fromSelected = useSelector(getIsSenderSelected);
  const toSelected = useSelector(getIsRecipientSelected);

  const handleSelectedItem = (item: any) => {
    console.log(item, "item");
    if (type === "Sender") {
      dispatch(setSenderSelected(true));
      setSelectedSender(item._id);
      dispatch(
        setSenderDetail({
          ...item,
          phoneNumber: item.phone_number,
          companyName: item.company_name,
        })
      );
    } else {
      dispatch(setRecipientSelected(true));
      setSelectedReceiver(item._id);
      dispatch(
        setRecipientDetail({
          ...item,
          phoneNumber: item.phone_number,
          companyName: item.company_name,
        })
      );
    }
  };

  const handleScroll = (event: any) => {
    const bottom =
      event.target.scrollHeight ===
      event.target.scrollTop + event.target.clientHeight;
    if (bottom) {
      //   loadMoreData();
    }
  };

  return (
    <Box borderRadius={1}>
      <Stack direction={"column"} spacing={0.2}>
        <Typography variant="text-sm-medium">
          {type === "Sender" || type === "Recipient" ? "" : type}
        </Typography>
        <Select
          onScroll={handleScroll}
          IconComponent={(props) => (
            <span
              {...props}
              style={{
                width: "16px",
                height: "16px",
                marginRight: "7px",
              }}
            >
              <Icon icon="arrowDownIcon" width={16} height={16} />
            </span>
          )}
          labelId="demo-simple-select-label"
          id="type-select"
          value={
            type === "Sender"
              ? fromSelected
                ? name
                : ""
              : toSelected
              ? name
              : ""
          }
          displayEmpty
          placeholder="Select"
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: palette.base.white, // Change dropdown background color
              },
            },
          }}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <Typography
                  variant="text-md-medium"
                  style={{ color: palette.color.gray[510] }}
                >{`${placeholder}`}</Typography>
              ); // Placeholder text styling
            }
            return (
              <Box
                sx={{
                  color: "black",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="text-md-medium">{selected}</Typography>{" "}
              </Box>
            );
          }}
          sx={{
            boxShadow: palette.boxShadows.shadowxs,
            width: { width },
            height: { height },
            "& fieldset": {
              borderColor: palette.color.gray[200],
              ":hover": { borderColor: "black !important" },
            },
            borderRadius: borderRadius,
            marginTop: 0,
            backgroundColor: palette.base.white,
            "& .MuiInputBase-input": {
              px: "14px !important",
              py: "10px !important",
            },
          }}
        >
          {filteredData && filteredData.length > 0 ? (
            filteredData?.map((item: any, index: any) => (
              <MenuItem
                key={index}
                onClick={() => {
                  handleSelectedItem(item);
                  setSelectedIndex(index);
                  if (onItemSelected) {
                    onItemSelected(type);
                  }
                }}
                sx={{
                  color: palette.base.black,
                  backgroundColor: palette.base.white,
                  px: "20px",
                  py: "10px",
                  "&.Mui-selected": {
                    bgcolor: "#F9FAFB", // Change background color of selected item
                    color: "darkblue", // Change text color of selected item
                    "&:hover": {
                      bgcolor: "#F9FAFB", // Keep background color on hover for selected item
                    },
                  },
                  "&:hover": {
                    bgcolor: "#F9FAFB", // Change background color on hover
                  },
                }}
                value={item.name}
              >
                <Box
                  sx={{
                    color: "black",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography variant="text-md-medium">{item.name}</Typography>{" "}
                  {selectedReceiver === item._id && type === "Recipient" && (
                    <Check
                      sx={{ width: "20px", height: "20px", color: "#7F56D9" }}
                    />
                  )}
                  {selectedSender === item._id && type === "Sender" && (
                    <Check
                      sx={{ width: "20px", height: "20px", color: "#7F56D9" }}
                    />
                  )}
                </Box>
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled sx={{ color: palette.base.black }}>
              No {`${type}`} Found
            </MenuItem>
          )}
        </Select>
      </Stack>
    </Box>
  );
};

export default SelectSenderReceiver;
