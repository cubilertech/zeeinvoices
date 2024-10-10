"use client";
import { getCurrency, getTax } from "@/redux/features/invoiceSetting";
import { getInvoiceItem } from "@/redux/features/invoiceSlice";
import { palette } from "@/theme/palette";
import { useSelectedColor } from "@/utils/common";
import { Box, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calculateAmount, calculateTax } from "@/common/common";

const InvoiceSummary: FC = () => {
  const selectedTax = useSelector(getTax);
  const selectedCurrency = useSelector(getCurrency);
  const getAllInvoiceItems = useSelector(getInvoiceItem);
  const selectedColor = useSelectedColor();
  //Calculate Amount
  const [total, setTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  useEffect(() => {
    const totalAmount = calculateAmount(getAllInvoiceItems);
    const totalTax = calculateTax(getAllInvoiceItems);
    setTotal(totalAmount);
    setTaxAmount(totalTax);
  }, [getAllInvoiceItems]);

  return (
    <Stack
      direction={"column"}
      sx={{
        borderRadius: "4px",
        width: { sm: "240px", xs: "100%" },
        border: `1px solid ${palette.base.borderColor}`,
      }}
    >
      {/* summary head */}
      <Box
        sx={{
          width: { sm: "239px", xs: "100%" },
          height: "42px",
          borderRadius: "4px 4px 0px 0px",
          backgroundColor: selectedColor,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          variant="text-sm-semibold"
          sx={{ color: palette.base.white }}
        >
          Invoice Summary
        </Typography>
      </Box>

      {/* summary content */}

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{
          height: "54px",
          borderBottom: `1px solid ${palette.base.borderColor}`,
          alignItems: "center",
          px: "16px",
        }}
      >
        <Typography
          variant="text-sm-regular"
          sx={{ color: palette.color.gray[610], fontWeight: 600 }}
        >
          Subtotal
        </Typography>
        <Typography
          variant="text-sm-semibold"
          sx={{ color: palette.color.gray[900], lineHeight: "14px" }}
        >
          {" "}
          {selectedCurrency === "USD" ? "USD" : selectedCurrency}{" "}
          <span style={{ fontSize: 14, fontWeight: 600 }}>
            {(total - taxAmount).toFixed(2)}
          </span>
        </Typography>
      </Stack>
      {/* <hr style={{ margin: "10px" }}></hr> */}

      {selectedTax ? (
        <>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{
              height: "54px",
              borderBottom: `1px solid ${palette.base.borderColor}`,
              alignItems: "center",
              px: "16px",
            }}
          >
            <Typography
              variant="text-sm-regular"
              sx={{ color: palette.color.gray[610], fontWeight: 600 }}
            >
              Tax
            </Typography>
            <Typography
              variant="text-sm-semibold"
              sx={{ color: palette.color.gray[900] }}
            >
              {taxAmount > 0
                ? (selectedCurrency === "USD" ? "USD" : selectedCurrency) +
                  " " +
                  taxAmount.toFixed(2)
                : "--"}
            </Typography>
          </Stack>
          {/* <hr style={{ margin: "10px" }}></hr> */}
        </>
      ) : (
        ""
      )}

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ height: "54px", alignItems: "center", px: "16px" }}
      >
        <Typography
          variant="text-sm-regular"
          sx={{ color: palette.color.gray[610], fontWeight: 600 }}
        >
          Total
        </Typography>
        <Typography
          variant="text-sm-semibold"
          sx={{ color: palette.color.gray[900] }}
        >
          {selectedCurrency === "USD" ? "USD" : selectedCurrency}{" "}
          <span style={{ fontSize: 14, fontWeight: 600 }}>
            {/* {total.toFixed(2)} */}
            {(selectedTax ? total : total - taxAmount).toFixed(2)}
          </span>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default InvoiceSummary;
