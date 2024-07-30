"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { palette } from "@/theme/palette";
import { Icon } from "@/components/Icon";
import InvoiceDetailsSection from "@/components/InvoiceDetailsSection/invoiceDetailsSection";
import InvoiceDetailsActions from "@/components/InvoiceDetailsActions/invoiceDetailsActions";
import { useFetchSingleDocument } from "@/utils/ApiHooks/common";
import { backendURL } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setFullInvoice,
  setResetInvoice,
} from "@/redux/features/invoiceSlice";
import {
  setInvoiceSettings,
  setResetInvoiceSetting,
} from "@/redux/features/invoiceSetting";
import { calculateAmount, calculateTax } from "@/common/common";
import ReactToPrint from "react-to-print";

const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const componentRef = useRef();
  const invoiceDetail = useSelector((state: any) => state.invoice);
  const invoiceSettings = useSelector((state: any) => state.invoiceSetting);
  const dispatch = useDispatch();
  const router = useRouter();
  //Total And Tax
  const [total, setTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  useEffect(() => {
    const totalAmount = calculateAmount(invoiceDetail.invoiceItem);
    const totalTax = calculateTax(invoiceDetail.invoiceItem);
    setTotal(totalAmount);
    setTaxAmount(totalTax);
  }, [invoiceDetail.invoiceItem]);
  const summaryDetail = {
    total: total,
    taxAmount: taxAmount,
  };
  const {
    data: singleInvoice,
    refetch: refetchSingleInvoice,
    isFetching: refetchingSingleInvoice,
  } = useFetchSingleDocument(`${backendURL}/invoices/${id}`);

  useEffect(() => {
    return () => {
      dispatch(setResetInvoiceSetting());
      dispatch(setResetInvoice());
    };
  }, [dispatch]);

  useEffect(() => {
    refetchSingleInvoice();
    if (singleInvoice) {
      dispatch(
        setFullInvoice({
          id: singleInvoice?.id,
          logo: singleInvoice?.image,
          invoiceType: singleInvoice?.type,
          from: singleInvoice?.from,
          to: singleInvoice?.to,
          invoiceDate: singleInvoice?.invoiceDate,
          dueDate: singleInvoice?.dueDate,
          addtionalNotes: singleInvoice?.notes,
          invoiceItem: singleInvoice?.items,
        })
      );
      dispatch(
        setInvoiceSettings({
          color: singleInvoice?.settings.color,
          currency: singleInvoice?.settings.currency,
          dueDate: singleInvoice?.settings.dueDate,
          tax: singleInvoice?.settings.tax,
          detail: singleInvoice?.settings.detail,
        })
      );
    }
  }, [refetchSingleInvoice, singleInvoice, dispatch]);

  return (
    <Container maxWidth="lg" sx={{ overflowY: "auto", height: "100%" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ py: 3, marginTop: "50px" }}
      >
        <Stack
          direction={"row"}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Typography variant="display-xs-medium">Invoices/</Typography>
          <Typography
            variant="display-xs-medium"
            sx={{ color: palette.color.gray[770] }}
          >
            {invoiceDetail?.id}
          </Typography>
        </Stack>

        <Stack direction={"row"}>
          <IconButton sx={{ padding: 1 }}>
            <Icon icon="editIcon" width={20} height={20} />
          </IconButton>
          <IconButton
            sx={{ padding: 1 }}
            onClick={() => router.push(`/preview/${invoiceDetail?.id}`)}
          >
            <Icon icon="sendSqaureIcon" width={20} height={20} />
          </IconButton>
          <Box>
            <Box style={{ display: "none" }}>
              <Box ref={componentRef}>
                <InvoiceDetailsSection
                  singleInvoice={{ ...invoiceDetail }}
                  invoiceSetting={{ ...invoiceSettings }}
                />
              </Box>
            </Box>
            <ReactToPrint
              trigger={() => (
                <IconButton sx={{ padding: 1 }} onClick={() => window.print()}>
                  <Icon icon="printIconIcon" width={20} height={20} />
                </IconButton>
              )}
              content={() =>
                componentRef.current ? componentRef.current : null
              }
            />
          </Box>
        </Stack>
      </Stack>

      <Stack direction={"row"} gap={3}>
        <InvoiceDetailsSection
          singleInvoice={{ ...invoiceDetail }}
          invoiceSetting={{ ...invoiceSettings }}
        />
        <InvoiceDetailsActions
          InvSetting={{ ...invoiceSettings }}
          InvDetails={{ ...invoiceDetail }}
          summaryDetail={summaryDetail}
        />
      </Stack>
    </Container>
  );
};

export default InvoiceDetail;
