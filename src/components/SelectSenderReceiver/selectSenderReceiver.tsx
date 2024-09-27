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
  width = 200,
  height = 36,
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
    if (type === "Sender") {
      dispatch(setSenderSelected(true));
      setSelectedSender(item.name);
      dispatch(
        setSenderDetail({
          ...item,
          phoneNumber: item.phone_number,
          companyName: item.company_name,
        })
      );
    } else {
      dispatch(setRecipientSelected(true));
      setSelectedReceiver(item.name);
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
    console.log(bottom, "bottom");
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
              console.log(selected, "Select");
              return <span style={{ color: "grey" }}>{`${placeholder}`}</span>; // Placeholder text styling
            }
            return <span style={{ color: "black" }}>{selected}</span>;
          }}
          sx={{
            width: { width },
            height: { height },
            "& fieldset": {
              borderColor: "#D6DAE1",
              ":hover": { borderColor: "black !important" },
            },
            borderRadius: borderRadius,
            marginTop: 0,
            backgroundColor: palette.base.white,
          }}
        >
          {filteredData && filteredData.length > 0 ? (
            filteredData?.map((item: any, index: any) => (
              <MenuItem
                key={index}
                onClick={() => {
                  console.log(item, "values12");
                  handleSelectedItem(item);
                  setSelectedIndex(index);
                  if (onItemSelected) {
                    onItemSelected(type);
                  }
                }}
                sx={{
                  color: palette.base.black,
                  backgroundColor: palette.base.white,
                  "&.Mui-selected": {
                    bgcolor: palette.color.gray[5], // Change background color of selected item
                    color: "darkblue", // Change text color of selected item
                    "&:hover": {
                      bgcolor: "lightgrey", // Keep background color on hover for selected item
                    },
                  },
                  "&:hover": {
                    bgcolor: "lightgrey", // Change background color on hover
                  },
                }}
                value={item.name}
              >
                {item.name}
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
