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
  console.log(total, "total", taxAmount);

  return (
    <Stack
      direction={"column"}
      sx={{
        borderRadius: "3px",
        width: "240px",
        // height: "176px",
        border: `1px solid ${palette.base.borderColor}`,
      }}
    >
      {/* summary head */}
      <Box
        sx={{
          width: "239px",
          height: "30px",
          borderRadius: "2px 2px 0px 0px",
          backgroundColor: selectedColor,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography variant="text-xs-bold" sx={{ color: palette.base.white }}>
          Invoice Summary
        </Typography>
      </Box>

      {/* summary content */}

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ padding: "20px 10px 0px 10px" }}
      >
        <Typography
          variant="text-xs-regular"
          sx={{ color: palette.color.gray[760] }}
        >
          Subtotal
        </Typography>
        <Typography variant="text-xs-small" sx={{ color: palette.base.black }}>
          {" "}
          {selectedCurrency === "$ USD" ? "USD" : selectedCurrency}{" "}
          <span style={{ fontSize: 12, fontWeight: 500 }}>
            {(total - taxAmount).toFixed(2)}
          </span>
        </Typography>
      </Stack>
      <hr style={{ margin: "10px" }}></hr>

      {selectedTax ? (
        <>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ padding: "5px 10px 0px 10px" }}
          >
            <Typography
              variant="text-xs-regular"
              sx={{ color: palette.color.gray[760] }}
            >
              Tax
            </Typography>
            <Typography variant="text-xs-small" sx={{ color: palette.base.black }}>
              {taxAmount > 0
                ? (selectedCurrency === "$ USD" ? "USD" : selectedCurrency) +
                  " " +
                  taxAmount.toFixed(2)
                : "--"}
            </Typography>
          </Stack>
          <hr style={{ margin: "10px" }}></hr>
        </>
      ) : (
        ""
      )}

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ padding: "5px 10px 15px 10px" }}
      >
        <Typography
          variant="text-xs-regular"
          sx={{ color: palette.color.gray[760] }}
        >
          Total
        </Typography>
        <Typography variant="text-xs-small" sx={{ color: palette.base.black }}>
          {selectedCurrency === "$ USD" ? "USD" : selectedCurrency}{" "}
          <span style={{ fontSize: 12, fontWeight: 700 }}>
            {total.toFixed(2)}
          </span>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default InvoiceSummary;
