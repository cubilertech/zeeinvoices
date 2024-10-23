"use client";
import { Box, Stack, Typography } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDueDate,
  getInvoiceDate,
  setDueDate,
  setInvoiceDate,
} from "@/redux/features/invoiceSlice";
import { palette } from "@/theme/palette";

interface InvoiceDatePicker {
  title: string;
}
const InvoiceDatePicker: FC<InvoiceDatePicker> = ({ title }) => {
  const dispatch = useDispatch();
  const invoiceDate = useSelector(getInvoiceDate);
  const dueDate = useSelector(getDueDate);
  
  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const date = newDate?.toISOString();

      if (title === "Invoice Date") {
        dispatch(setInvoiceDate(date));

        // Adjust the due date if it's earlier than the invoice date
        if (dayjs(date).isAfter(dayjs(dueDate))) {
          dispatch(setDueDate(date));
        }
      } else if (title === "Due Date") {
        // Ensure the due date is not earlier than the invoice date
        if (dayjs(date).isBefore(dayjs(invoiceDate))) {
          dispatch(setDueDate(invoiceDate));
        } else {
          dispatch(setDueDate(date));
        }
      }
    }
  };
  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        justifyContent: { sm: "center", xs: "space-between" },
        alignItems: "start",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <Typography
        variant="text-xs0-semibold"
        color={"black"}
        sx={{ fontSize: 14, fontWeight: 500, color: palette.color.gray[610] }}
      >
        {title}:
      </Typography>
      <Box
        sx={{
          width: "100% !important",
          height: "44px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            value={
              title === "Invoice Date" ? dayjs(invoiceDate) : dayjs(dueDate)
            }
            onChange={handleDateChange}
            minDate={title === "Due Date" ? dayjs(invoiceDate) : undefined}
            format="MMM Do, YYYY"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderRadius: "4px",
                  width: "100% !important",
                },
              "& .MuiOutlinedInput-input": {
                padding: "0px !important",
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: 400,
                color: palette.color.gray[510],
              },

              padding: "0px !important",
              "& .MuiOutlinedInput-root": {
                height: "44px",
                borderRadius: "4px",
                width: "100% !important",
                px: "14px",
                py: "10px",
              },
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: palette.color.gray[200],
              },
            }}
          />
        </LocalizationProvider>
      </Box>
    </Stack>
  );
};

export default InvoiceDatePicker;
