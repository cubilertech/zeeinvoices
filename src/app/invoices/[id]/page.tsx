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
import { setFullInvoice, setResetInvoice } from "@/redux/features/invoiceSlice";
import {
  setInvoiceSettings,
  setResetInvoiceSetting,
} from "@/redux/features/invoiceSetting";
import { calculateAmount, calculateTax } from "@/common/common";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ReactToPrint from "react-to-print";
import ShareModal from "@/components/ShareModal/shareModal";

const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const componentRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const invoiceDetail = useSelector((state: any) => state.invoice);
  const invoiceSettings = useSelector((state: any) => state.invoiceSetting);
  const [shareModal, setShareModal] = useState(false);
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
    refetchSingleInvoice();
    if (singleInvoice) {
      dispatch(
        setFullInvoice({
          id: singleInvoice?.id,
          logo: singleInvoice?.image,
          invoiceType: singleInvoice?.type,
          from: {
            ...singleInvoice?.fromDetails,
            phoneNumber: singleInvoice?.fromDetails?.phone_number,
            companyName: singleInvoice?.fromDetails?.company_name,
          },
          to: {
            ...singleInvoice?.toDetails,
            phoneNumber: singleInvoice?.toDetails?.phone_number,
            companyName: singleInvoice?.toDetails?.company_name,
          },
          invoiceDate: singleInvoice?.invoiceDate,
          dueDate: singleInvoice?.dueDate,
          addtionalNotes: singleInvoice?.notes,
          invoiceItem: singleInvoice?.items,
        })
      );
      dispatch(
        setInvoiceSettings({
          color: singleInvoice?.settings?.color,
          currency: singleInvoice?.settings?.currency,
          dueDate: singleInvoice?.settings?.dueDate,
          tax: singleInvoice?.settings?.tax,
          detail: singleInvoice?.settings?.detail,
        })
      );
    }
  }, [refetchSingleInvoice, singleInvoice, dispatch]);
  // Edit Invoice
  const handleEditInvoice = (record: any) => {
    router.push(`/invoices/${id}/edit`);
    dispatch(
      setFullInvoice({
        id: singleInvoice?.id,
        logo: singleInvoice?.image,
        invoiceType: singleInvoice?.type,
        from: {
          ...singleInvoice?.fromDetails,
          phoneNumber: singleInvoice?.fromDetails?.phone_number,
          companyName: singleInvoice?.fromDetails?.company_name,
        },
        to: {
          ...singleInvoice?.toDetails,
          phoneNumber: singleInvoice?.toDetails?.phone_number,
          companyName: singleInvoice?.toDetails?.company_name,
        },
        invoiceDate: singleInvoice?.invoiceDate,
        dueDate: singleInvoice?.dueDate,
        addtionalNotes: singleInvoice?.notes,
        invoiceItem: singleInvoice?.items,
      })
    );
    dispatch(
      setInvoiceSettings({
        color: singleInvoice?.settings?.color,
        currency: singleInvoice?.settings?.currency,
        dueDate: record?.settings?.dueDate,
        tax: singleInvoice?.settings?.tax,
        detail: singleInvoice?.settings?.detail,
      })
    );
  };

  // Back Handle
  const handleBack = () => {
    router.back();
    setTimeout(() => {
      dispatch(setResetInvoiceSetting());
      dispatch(setResetInvoice());
    }, 500);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        overflowY: "auto",
        height: "100%",
        px: { md: "0.1%", lg: "0.1%", xs: "0%" },
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ py: 3, marginTop: "60px" }}
      >
        <Stack
          direction={"row"}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <IconButton
            sx={{ padding: 1, marginRight: "10px" }}
            onClick={handleBack}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="display-xs-medium">Invoices/</Typography>
          <Typography
            variant="display-xs-medium"
            sx={{ color: palette.color.gray[770] }}
          >
            {invoiceDetail?.id}
          </Typography>
        </Stack>
        <Stack direction={"row"}>
          <IconButton sx={{ padding: 1 }} onClick={handleEditInvoice}>
            <Icon icon="editIcon" width={20} height={20} />
          </IconButton>
          <IconButton sx={{ padding: 1 }} onClick={() => setShareModal(true)}>
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
            {/* <ReactToPrint
              trigger={() => (
                <IconButton sx={{ padding: 1 }} onClick={() => window.print()}>
                  <Icon icon="printIconIcon" width={20} height={20} />
                </IconButton>
              )}
              content={() =>
                componentRef.current ? componentRef.current : null
              }
            /> */}
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
      <ShareModal
        open={shareModal}
        onShare={() => setShareModal(false)}
        onClose={() => setShareModal(false)}
        shareUrlId={invoiceDetail?.id}
      />
    </Container>
  );
};

export default InvoiceDetail;
