"use client";
import PdfView from "@/appPages/PdfView/pdfView";
import { palette } from "@/theme/palette";
import { Box, Button } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { FC } from "react";

interface InvoiceDetailProps {
  InvSetting: any;
  InvDetails: any;
  summaryDetail: any;
}

const InvoiceDetailsActions: FC<InvoiceDetailProps> = ({
  InvSetting,
  InvDetails,
  summaryDetail,
}) => {
  return (
    <Box
      borderRadius={3}
      sx={{
        width: 372,
        height: 232,
        backgroundColor: palette.base.white,
        py: "40px",
        px: "24px",
        borderRadius: "4px",
        border: `1px solid #E7EAEE`,
      }}
    >
      <PDFDownloadLink
        document={
          <PdfView
            invSetting={InvSetting}
            invDetails={InvDetails}
            Summary={summaryDetail}
          />
        }
        fileName="ZeeInvoices"
      >
        {({ loading }) =>
          loading ? (
            <Button variant="contained" sx={{ width: "100%" }}>
            Loading PDF....
          </Button>
          ) : (
            <Button variant="contained" sx={{ width: "100%" }}>
              Download PDF
            </Button>
          )
        }
      </PDFDownloadLink>

      <Button variant="outlined" sx={{ width: "100%", marginTop: "15px" }}>
        Save
      </Button>
      <Button
        variant="contained"
        sx={{
          width: "100%",
          backgroundColor: "#DD3409",
          marginTop: "15px",
          "&:hover": {
            backgroundColor: "#BB3409",
          },
        }}
      >
        Delete
      </Button>
    </Box>
  );
};

export default InvoiceDetailsActions;
