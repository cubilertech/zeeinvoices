"use client";
import {
  getCurrency,
  getDiscount,
  getTax,
} from "@/redux/features/invoiceSetting";
import { getInvoiceItem } from "@/redux/features/invoiceSlice";
import { palette } from "@/theme/palette";
import { isNearWhite, useSelectedColor } from "@/utils/common";
import { Box, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  calculateAmount,
  calculateDiscount,
  calculateTax,
} from "@/common/common";

const InvoiceSummary: FC = () => {
  const selectedTax = useSelector(getTax);
  const selectedDiscount = useSelector(getDiscount);
  const selectedCurrency = useSelector(getCurrency);
  const getAllInvoiceItems = useSelector(getInvoiceItem);
  const selectedColor = useSelectedColor();
  //Calculate Amount
  const [total, setTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  useEffect(() => {
    const totalAmount = calculateAmount(getAllInvoiceItems);
    const totalDiscount = calculateDiscount(getAllInvoiceItems);
    const totalTax = calculateTax(getAllInvoiceItems);
    setTotal(totalAmount);
    setTaxAmount(totalTax);
    setDiscountAmount(totalDiscount);
  }, [getAllInvoiceItems]);

  return (
    <Stack
      direction={"column"}
      sx={{
        borderRadius: "4px",
        minWidth: { sm: "240px", xs: "100%" },
        border: `1px solid ${palette.color.gray[200]}`,
      }}
    >
      {/* summary head */}
      <Box
        sx={{
          width: { sm: "100%", xs: "100%" },
          height: "42px",
          borderRadius: "4px 4px 0px 0px",
          backgroundColor: selectedColor,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          borderBottom: isNearWhite(selectedColor)
            ? `1px solid ${palette.color.gray[200]}`
            : "none",
        }}
      >
        <Typography
          variant="text-sm-semibold"
          sx={{
            color: isNearWhite(selectedColor)
              ? palette.base.black
              : palette.base.white,
            fontSize: "14px",
            lineHeight: "18px",
            fontWeight: 600,
          }}
        >
          Summary
        </Typography>
      </Box>

      {/* summary content */}

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        gap={2}
        sx={{
          height: "54px",
          borderBottom: `1px solid ${palette.color.gray[200]}`,
          alignItems: "center",
          px: "16px",
        }}
      >
        <Typography
          variant="text-sm-regular"
          sx={{
            color: palette.color.gray[610],
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 400,
          }}
        >
          Subtotal
        </Typography>
        <Typography
          variant="text-sm-semibold"
          sx={{
            maxWidth: { sm: "250px", xs: "203px" },
            color: palette.color.gray[900],
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 600,
            textAlign: "right",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600 }}>
            {(total + discountAmount - taxAmount).toFixed(2)}
          </span>{" "}
          {selectedCurrency === "USD" ? "USD" : selectedCurrency}
        </Typography>
      </Stack>

      {selectedDiscount ? (
        <>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            gap={2}
            sx={{
              height: "54px",
              borderBottom: `1px solid ${palette.color.gray[200]}`,
              alignItems: "center",
              px: "16px",
            }}
          >
            <Typography
              variant="text-sm-regular"
              sx={{
                width: "55px",
                color: palette.color.gray[610],
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 400,
              }}
            >
              Discount
            </Typography>
            <Typography
              variant="text-sm-semibold"
              sx={{
                maxWidth: { sm: "250px", xs: "203px" },
                color: palette.color.gray[900],
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 600,
                textAlign: "right",
              }}
            >
              {discountAmount > 0
                ? discountAmount.toFixed(2) +
                  " " +
                  (selectedCurrency === "USD" ? "USD" : selectedCurrency)
                : "--"}
            </Typography>
          </Stack>
        </>
      ) : (
        ""
      )}

      {selectedTax ? (
        <>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            gap={2}
            sx={{
              height: "54px",
              borderBottom: `1px solid ${palette.color.gray[200]}`,
              alignItems: "center",
              px: "16px",
            }}
          >
            <Typography
              variant="text-sm-regular"
              sx={{
                width: "55px",
                color: palette.color.gray[610],
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 400,
              }}
            >
              Tax
            </Typography>
            <Typography
              variant="text-sm-semibold"
              sx={{
                maxWidth: { sm: "250px", xs: "203px" },
                color: palette.color.gray[900],
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 600,
                textAlign: "right",
              }}
            >
              {taxAmount > 0
                ? taxAmount.toFixed(2) +
                  " " +
                  (selectedCurrency === "USD" ? "USD" : selectedCurrency)
                : "--"}
            </Typography>
          </Stack>
        </>
      ) : (
        ""
      )}

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        gap={2}
        sx={{ height: "54px", alignItems: "center", px: "16px" }}
      >
        <Typography
          variant="text-sm-regular"
          sx={{
            width: "55px",
            color: palette.color.gray[610],
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 400,
          }}
        >
          Total
        </Typography>
        <Typography
          variant="text-sm-semibold"
          sx={{
            maxWidth: { sm: "250px", xs: "203px" },
            color: palette.color.gray[900],
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 600,
            textAlign: "right",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600 }}>
            {(selectedTax ? total : total - taxAmount).toFixed(2)}
          </span>{" "}
          {selectedCurrency === "USD" ? "USD" : selectedCurrency}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default InvoiceSummary;
