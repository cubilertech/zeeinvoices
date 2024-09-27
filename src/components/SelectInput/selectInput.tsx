"use client";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceType, setInvoiceType } from "@/redux/features/invoiceSlice";
import { getCurrency, setCurrency } from "@/redux/features/invoiceSetting";

interface SelectInput {
  width?: string | number;
  height?: string | number;
  placeholder?: string;
  borderRadius?: string | number;
  type?: string;
  menuData?: string[];
}
const SelectInput: FC<SelectInput> = ({
  type,
  menuData,
  placeholder = "Select",
  width = 200,
  height = 36,
  borderRadius = 2,
}) => {
  const dispatch = useDispatch();
  const selectedInvoiceType = useSelector(getInvoiceType);
  const selectedCurrency = useSelector(getCurrency);
  const handleSelectedItem = (item: string) => {
    type === "currency"
      ? dispatch(setCurrency(item))
      : dispatch(setInvoiceType(item));
  };

  return (
    <Box borderRadius={1}>
      <Stack direction={"column"} spacing={0.2}>
        <Typography variant="text-sm-medium">
          {type === "currency" || type === "Select SR" ? "" : type}
        </Typography>
        <Select
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
          value={type === "currency" ? selectedCurrency : selectedInvoiceType}
          displayEmpty
          placeholder="Select"
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: "30%",
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
          {menuData &&
            menuData?.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => handleSelectedItem(item)}
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
                value={item}
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
