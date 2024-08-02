"use client";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceType, setInvoiceType } from "@/redux/features/invoiceSlice";
import { getCurrency, setCurrency } from "@/redux/features/invoiceSetting";

interface SelectInput {
  width?: string | number;
  type?: string;
  menuData?: string[];
}
const SelectInput: FC<SelectInput> = ({ type, menuData, width = 200 }) => {
  const dispatch = useDispatch();
  const selectedInvoiceType = useSelector(getInvoiceType);
  const selectedCurrency = useSelector(getCurrency);
  const handleSelectedItem = (item: string) => {
    type === "currency"
      ? dispatch(setCurrency(item))
      : dispatch(setInvoiceType(item));
  };

  return (
    <Box borderRadius={1} sx={{ height: 60 }}>
      <Stack direction={"column"} spacing={0.2}>
        <Typography variant="text-sm-medium">
          {type === "currency" ? "" : type}
        </Typography>
        <Select
          IconComponent={() => <Icon icon="arrowDownIcon" />}
          labelId="demo-simple-select-label"
          id="type-select"
          value={type === "currency" ? selectedCurrency : selectedInvoiceType}
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
              return <span style={{ color: "grey" }}>Select</span>; // Placeholder text styling
            }
            return <span style={{ color: "black" }}>{selected}</span>;
          }}
          sx={{
            width: { width },
            height: 36,
            // backgroundColor:"black",
            "& fieldset": {
              borderColor: "#D6DAE1",
              ":hover": { borderColor: "black !important" },
            },
            
            borderRadius: 2,
            paddingRight: 2,
            marginTop: 0,
            backgroundColor: palette.base.white,
          }}
        >
          {menuData &&
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
                value={10}
              >
                {item}
              </MenuItem>
            ))}
        </Select>
      </Stack>
    </Box>
  );
};

export default SelectInput;
