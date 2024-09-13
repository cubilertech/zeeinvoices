"use client";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import { useDispatch } from "react-redux";
import {
  setRecipientDetail,
  setSenderDetail,
} from "@/redux/features/invoiceSlice";

interface SelectSenderReceiver {
  width?: string | number;
  height?: string | number;
  placeholder?: string;
  borderRadius?: string | number;
  type?: string;
  filteredData?: any;
  menuData?: string[];
}
const SelectSenderReceiver: FC<SelectSenderReceiver> = ({
  type,
  menuData,
  placeholder = "Select",
  width = 200,
  height = 36,
  filteredData,
  borderRadius = 2,
}) => {
  const dispatch = useDispatch();
  const [selectedSender, setSelectedSender] = useState("");
  const [selectedReceiver, setSelectedReceiver] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelectedItem = (item: any) => {
    if (type === "Sender") {
      setSelectedSender(item.name);
      dispatch(
        setSenderDetail({
          ...item,
          phoneNumber: item.phone_number,
          companyName: item.company_name,
        })
      );
    } else {
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
          value={type === "Sender" ? selectedSender : selectedReceiver}
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
          {filteredData &&
            filteredData?.map((item: any, index: any) => (
              <MenuItem
                key={index}
                onClick={() => {
                  console.log(item, "values12");
                  handleSelectedItem(item);
                  setSelectedIndex(index);
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
            ))}

          {/* {menuData &&
            menuData?.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => handleSelectedItem(item)}
                sx={{
                  color: palette.base.black,
                  backgroundColor: palette.base.white,
                  "&.Mui-selected": {
                    bgcolor: "lightgreen", // Change background color of selected item
                    color: "darkblue", // Change text color of selected item
                    "&:hover": {
                      bgcolor: "lightgreen", // Keep background color on hover for selected item
                    },
                  },
                  "&:hover": {
                    bgcolor: "lightgrey", // Change background color on hover
                  },
                }}
                value={item}
              >
                {item}
              </MenuItem>
            ))} */}
        </Select>
      </Stack>
    </Box>
  );
};

export default SelectSenderReceiver;
