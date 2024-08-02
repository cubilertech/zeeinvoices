"use client";
import PdfView from "@/appPages/PdfView/pdfView";
import { palette } from "@/theme/palette";
import { Box, Button, Tooltip } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { FC, useState } from "react";
import DeleteModal from "../DeleteModal/deleteModal";
import { useDeleteDocument } from "@/utils/ApiHooks/common";
import { backendURL } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const route = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    mutateAsync: deleteInvoice,
    isLoading: deleteInvoiceLoading,
    isSuccess: deleteSuccess,
  } = useDeleteDocument();
  const handleDelete = () => {
    setIsModalOpen(false);
  };
  const handleDeleteModalClose = () => {
    setIsModalOpen(false);
  };
  const invoiceDelete = async () => {
    await deleteInvoice({
      apiRoute: `${backendURL}/invoices/${InvDetails.id}`,
    }).then((res) => {
      route.push("/invoices");
    });
  };
  const handleOpenDeleteModal = () => {
    setIsModalOpen(true);
  };
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
            invSetting={{...InvSetting}}
            invDetails={{...InvDetails}}
            Summary={summaryDetail}
            user={session?.user}
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
            <Tooltip title="Download PDF">
              <Button variant="contained" sx={{ width: "100%" }}>
                Download PDF
              </Button>
            </Tooltip>
          )
        }
      </PDFDownloadLink>
      <Tooltip title="Delete invoice">
        <Button
          onClick={() => handleOpenDeleteModal()}
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
      </Tooltip>
      <DeleteModal
        open={isModalOpen}
        onDelete={handleDelete}
        onClose={handleDeleteModalClose}
        invoiceDelete={invoiceDelete}
        title="invoice"
      />
    </Box>
  );
};

export default InvoiceDetailsActions;
