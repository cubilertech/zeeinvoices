"use client";
import {
  alpha,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { Icon } from "../Icon";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { setResetInvoice } from "@/redux/features/invoiceSlice";
import { palette } from "@/theme/palette";
import { saveAs } from "file-saver";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import JSZip from "jszip";
import {
  calculateAmount,
  calculateDiscount,
  calculateTax,
} from "@/common/common";
import PdfView from "@/appPages/PdfView/pdfView";
import { useSession } from "next-auth/react";
import { pdf } from "@react-pdf/renderer";
import { PdfToast } from "../PdfToast";

interface EnhancedTableToolbarProps {
  numSelected: number;
  search: any;
  handleChangeSearch: any;
  type?: number;
  filteredData?: any;
  selected?: any;
  handleDownloadClick?: () => void;
}

const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = (
  props: EnhancedTableToolbarProps
) => {
  const { data: session } = useSession();
  const { numSelected, search, handleChangeSearch } = props;
  const dispatch = useDispatch();
  const [isPdfToastOpen, setIsPdfToastOpen] = useState(false);
  const [pdfToastProgress, setPdfToastProgress] = useState(1);
  const route = useRouter();
  const handleCreate = () => {
    dispatch(setResetInvoiceSetting());
    dispatch(setResetInvoice());
    route.push("/create-new-invoice");
  };

  const handleDownloadInvoices = async (invoices: any) => {
    setIsPdfToastOpen(true);
    setPdfToastProgress(1); // Initialize progress to 1%

    const zip = new JSZip();
    const zipFolder = zip.folder("Invoices");

    // Filter invoices to only include those with IDs present in 'selectedIds'
    const filteredInvoices = invoices.filter((invoice: any) =>
      props.selected.includes(invoice?.id)
    );

    const totalInvoices = filteredInvoices.length;

    for (let i = 0; i < totalInvoices; i++) {
      const invoice = filteredInvoices[i];

      // Calculate and set progress
      const progress = Math.round(((i + 1) / totalInvoices) * 100);
      setPdfToastProgress(progress);

      const invDetails = {
        id: invoice?.id,
        logo: invoice?.image,
        invoiceType: invoice?.type,
        from: {
          ...invoice?.fromDetails,
          phoneNumber: invoice?.fromDetails?.phone_number,
          companyName: invoice?.fromDetails?.company_name,
        },
        to: {
          ...invoice?.toDetails,
          phoneNumber: invoice.toDetails?.phone_number,
          companyName: invoice.toDetails?.company_name,
        },
        invoiceDate: invoice?.invoiceDate,
        dueDate: invoice?.dueDate,
        addtionalNotes: invoice?.notes,
        invoiceItem: invoice?.items,
      };

      const invSettings = {
        colors: invoice?.settings.colors,
        color: invoice?.settings?.color,
        currency: invoice?.settings?.currency,
        watermarkText: invoice?.settings?.watermarkText,
        dueDate: invoice?.settings?.dueDate,
        discount: invoice?.settings?.discount,
        tax: invoice?.settings?.tax,
        terms: invoice?.settings?.terms,
        watermark: invoice?.settings?.watermark,
        detail: invoice?.settings?.detail,
      };

      const pdfFileName = invoice.toDetails?.companyName
        ? `${invoice.toDetails.companyName}-${invoice.id}.pdf`
        : `${invoice.toDetails.name}-${invoice.id}.pdf`;

      const totalAmount = calculateAmount(invoice.items);
      const totalDiscount = calculateDiscount(invoice.items);
      const totalTax = calculateTax(invoice.items);

      const invSummaryDetail = {
        total: totalAmount,
        taxAmount: totalTax,
        discountAmount: totalDiscount,
      };

      // Wrap the static markup in a PDF-friendly Document component
      const pdfDocument = (
        <PdfView
          invSetting={invSettings}
          invDetails={invDetails}
          Summary={invSummaryDetail}
          user={session?.user}
          itemDetail={invoice.items}
        />
      );

      const blobPdf = await pdf(pdfDocument);
      blobPdf.updateContainer(pdfDocument);
      const result = await blobPdf.toBlob();

      zipFolder?.file(pdfFileName, result);
    }

    // Generate and download the ZIP file
    await zip.generateAsync({ type: "blob" }).then((zipBlob) => {
      saveAs(zipBlob, "All_Invoices.zip");
    });

    // Call download click handler if it exists
    if (props.handleDownloadClick) {
      props.handleDownloadClick();
    }

    setTimeout(() => {
      setIsPdfToastOpen(false);
    }, 4000);
  };

  const handlePdfToastClose = () => {
    setIsPdfToastOpen(false);
  };

  return (
    <Toolbar
      sx={{
        minHeight: "44px !important",
        px: "0px",
        pl: "0px !important",
        pr: "0px !important",
        flexDirection: { sm: "row", xs: "column" },
        alignItems: { sm: "center", xs: "flex-start" },
        justifyContent: "space-between",
        gap: { sm: 0, xs: 2 },
        py: { sm: 0, xs: 0 },
        // ...(numSelected > 0 && {
        //   bgcolor: (theme) =>
        //     alpha(
        //       theme.palette.primary.main,
        //       theme.palette.action.activatedOpacity
        //     ),
        // }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          // sx={{ flex: "1 1 100%", color: "#1B2533" }}
          sx={{
            color: palette.color.gray[900],
            fontSize: { md: "24px !important", xs: "24px !important" },
            lineHeight: {
              md: "29px !important",
              xs: "29px !important",
            },
            fontWeight: 600,
          }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{
            color: palette.color.gray[900],
            fontSize: { md: "24px !important", xs: "24px !important" },
            lineHeight: {
              md: "29px !important",
              xs: "29px !important",
            },
            fontWeight: 600,
          }}
          variant="text-lg-semibold"
          id="tableTitle"
          component="div"
        >
          Invoices
        </Typography>
      )}

      <Stack
        direction={{ sm: "row", xs: "column-reverse" }}
        gap={{ sm: 0, xs: 1.5 }}
        sx={{ width: { sm: "auto", xs: "100%" } }}
      >
        {props.type === 2 ? (
          ""
        ) : (
          <Stack
            direction={"row"}
            sx={{
              height: "44px",
              backgroundColor: palette.base.white,
              borderRadius: "4px",
              width: { sm: "451px", xs: "100%" },
              px: "14px",
              py: "10px",
              flexDirection: { sm: "row", xs: "column" },
              alignItems: { sm: "center", xs: "flex-start" },
              justifyContent: { sm: "start", xs: "center" },
              border: "1px solid #CDD5DF",
              boxShadow: palette.boxShadows.shadowxs,
            }}
          >
            <TextField
              variant="standard"
              placeholder="Search"
              value={search}
              onChange={(e) => handleChangeSearch(e)}
              sx={{
                width: "100%",
                border: "none",
                textUnderlinePosition: "unset",
                "& .MuiInputBase-input": {
                  border: "none",
                  height: "30px",
                  pl: "0px",
                  pr: "0px",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: palette.color.gray[510],
                },
              }}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="searchIcon" width={20} height={20} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        )}
        <Stack
          direction={{ sm: "row", xs: "column-reverse" }}
          gap={1.5}
          sx={{
            marginLeft: { sm: "12px", xs: "0px" },
            width: { sm: "auto", xs: "100%" },
          }}
        >
          {props.type === 2 ? (
            ""
          ) : (
            <>
              <Button
                variant="outlined"
                disabled={props.numSelected <= 0 || !props.filteredData}
                onClick={() => handleDownloadInvoices(props.filteredData)}
                sx={{
                  height: `44px`,
                  px: "18px !important",
                  py: "12px !important",
                  borderRadius: "4px",
                  width: { sm: "144px", xs: "100%" },
                  fontSize: "16px !important",
                  lineHeight: "24px !important",
                  fontWeight: "600 !important",
                  color: palette.primary.main,
                }}
              >
                <FileDownloadOutlinedIcon
                  sx={{
                    color:
                      props.numSelected <= 0 ? "#BDBDBD" : palette.primary.main,
                  }}
                />
                Download
              </Button>

              <Tooltip title="Create a new invoice">
                <Button
                  variant="contained"
                  onClick={handleCreate}
                  startIcon={<Icon icon="plusIcon" width={15} />}
                  sx={{
                    height: `44px`,
                    px: "18px !important",
                    py: "12px !important",
                    borderRadius: "4px",
                    width: { sm: "157px", xs: "100%" },
                    fontSize: "16px !important",
                    lineHeight: "24px !important",
                    fontWeight: "600 !important",
                    backgroundColor: palette.primary.main,
                  }}
                >
                  Create New
                </Button>
              </Tooltip>
            </>
          )}
        </Stack>
      </Stack>
      <PdfToast
        isOpen={isPdfToastOpen}
        progress={pdfToastProgress}
        lable={"Invoices"}
        type="multi"
        handleClose={handlePdfToastClose}
      />
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
