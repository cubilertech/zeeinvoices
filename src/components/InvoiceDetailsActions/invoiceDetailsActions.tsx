"use client";
import PdfView from "@/appPages/PdfView/pdfView";
import { palette } from "@/theme/palette";
import { Box, Button, Tooltip } from "@mui/material";
import React, { FC, useState } from "react";
import DeleteModal from "../Modals/DeleteModal/deleteModal";
import { useDeleteDocument } from "@/utils/ApiHooks/common";
import { backendURL } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";

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

  const generatePDFDocument = async () => {
    const itemDetail = InvDetails?.invoiceItem;
    const doc = (
      <PdfView
        invSetting={{ ...InvSetting }}
        invDetails={{ ...InvDetails }}
        Summary={summaryDetail}
        user={session?.user}
        itemDetail={itemDetail}
      />
    );
    const blobPdf = await pdf(doc);
    blobPdf.updateContainer(doc);
    const result = await blobPdf.toBlob();
    saveAs(result, "ZeeInvoice");
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
      <Button
        variant="contained"
        sx={{
          height: "36px !important",
          width: "100%",
          py: "0px !important",
          borderRadius: "4px",
          fontFamily: "Product Sans, sans-serif !important",
          fontSize: "14px !important",
          fontWeight: "500 !important",
          backgroundColor: palette.primary.main,
        }}
        onClick={() => generatePDFDocument()}
      >
        Download PDF
      </Button>

      <Tooltip title="Delete invoice">
        <Button
          onClick={() => handleOpenDeleteModal()}
          variant="contained"
          sx={{
            width: "100%",
            backgroundColor: "#DD3409",
            marginTop: "15px",
            borderRadius: "4px",
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
