"use client";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceType, setInvoiceType } from "@/redux/features/invoiceSlice";
import { getCurrency, setCurrency } from "@/redux/features/invoiceSetting";
import { setInvoiceTypeError } from "@/redux/features/validationSlice";

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
  borderRadius = 1,
}) => {
  const dispatch = useDispatch();
  const selectedInvoiceType = useSelector(getInvoiceType);
  const selectedCurrency = useSelector(getCurrency);
  const handleSelectedItem = (item: string) => {
    type === "currency"
      ? dispatch(setCurrency(item))
      : (dispatch(setInvoiceType(item)), dispatch(setInvoiceTypeError(false)));
  };

  return (
    <Box borderRadius={1}>
      <Stack direction={"column"} gap={"6px"}>
        <Typography
          variant="text-sm-medium"
          sx={{
            fontSize: { sm: "14px", xs: "14px" },
            lineHeight: { sm: "20px", xs: "20px" },
            fontWeight: { xs: 500 },
            color: palette.color.gray[610],
          }}
        >
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
              return (
                <span
                  style={{ color: palette.color.gray[510] }}
                >{`${placeholder}`}</span>
              ); // Placeholder text styling
            }
            return <span style={{ color: "black" }}>{selected}</span>;
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
