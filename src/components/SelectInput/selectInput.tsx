"use client";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceType, setInvoiceType } from "@/redux/features/invoiceSlice";
import { getCurrency, setCurrency } from "@/redux/features/invoiceSetting";
import { setInvoiceTypeError } from "@/redux/features/validationSlice";
import { Check } from "@mui/icons-material";

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
                py: "20px",
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
          {menuData &&
            menuData?.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => handleSelectedItem(item)}
                sx={{
                  color: palette.base.black,
                  px: "20px",
                  py: "10px",
                  backgroundColor: palette.base.white,
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
                value={item}
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
                  <Typography variant="text-md-medium">{item}</Typography>{" "}
                  {selectedInvoiceType === item && (
                    <Check
                      sx={{ width: "20px", height: "20px", color: "#7F56D9" }}
                    />
                  )}
                </Box>
              </MenuItem>
            ))}
        </Select>
      </Stack>
    </Box>
  );
};

export default SelectInput;
