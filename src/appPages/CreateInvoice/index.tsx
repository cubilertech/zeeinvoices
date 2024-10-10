"use client";
import { calculateAmount, calculateTax } from "@/common/common";
import { InvoiceHeader } from "@/components/InvoiceHeader";
import { InvoiceSection } from "@/components/InvoiceSection";
import { InvoiceSettings } from "@/components/InvoiceSettings";
import {
  getInvoiceItem,
  getDueDate as date,
} from "@/redux/features/invoiceSlice";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Popover,
  Stack,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "@/Styles/sectionStyle.css";

interface CreateInvoiceProps {
  type: string;
}
const CreateInvoice: FC<CreateInvoiceProps> = ({ type }) => {
  const allInvoiceItems = useSelector(getInvoiceItem);
  const invoiceDetail = useSelector((state: any) => state.invoice);
  const invoiceSetting = useSelector((state: any) => state.invoiceSetting);
  const isModile = useMediaQuery("(max-width: 500px)");
  // Get Total Amount And Tax
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [total, setTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);

  const handleClose = () => {
    setAnchorEl(null);
  };
  // open the color picker
  const handleColorPickerClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    const totalAmount = calculateAmount(allInvoiceItems);
    const totalTax = calculateTax(allInvoiceItems);
    setTotal(totalAmount);
    setTaxAmount(totalTax);
  }, [allInvoiceItems]);
  const summaryDetail = {
    total: total,
    taxAmount: taxAmount,
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Container
      className="mainContainer"
      sx={{
        overflowY: "auto",
        height: "100%",
        mt: { sm: 0, xs: 6 },
        px: { md: "0.1%", lg: "0.1%", xs: "0%" },
      }}
    >
      <Box sx={{ pt: 3, pb: {sm:2, xs: 1}, px: 0 }}>
        <InvoiceHeader
          InvSetting={{ ...invoiceSetting }}
          InvDetails={{ ...invoiceDetail }}
          summaryDetail={summaryDetail}
          handleColorPickerClick={handleColorPickerClick}
          type={type}
        />
      </Box>

      <Stack direction={"row"} gap={3} sx={{ mt: { sm: 0, xs: 2 } }}>
        <InvoiceSection
          InvDetails={invoiceDetail}
          type={type}
          InvSetting={{ ...invoiceSetting }}
        />
        {isModile ? (
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "12px",
              },
            }}
          >
            <InvoiceSettings
              InvSetting={{ ...invoiceSetting }}
              handleClose={handleClose}
            />
          </Popover>
        ) : (
          <InvoiceSettings InvSetting={{ ...invoiceSetting }} />
        )}
      </Stack>
    </Container>
  );
};
export default CreateInvoice;
