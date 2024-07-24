"use client";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { FC, useEffect, useMemo } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfView from "@/appPages/PdfView/pdfView";
import { backendURL } from "@/utils/constants";
import {
  useCreateDocument,
  useFetchSingleDocument,
} from "@/utils/ApiHooks/common";
import { useDispatch } from "react-redux";
import { setInvoiceId } from "@/redux/features/invoiceSlice";
import { useRouter } from "next/navigation";

interface InvoiceHeaderProps {
  InvSetting: any;
  InvDetails: any;
  summaryDetail: any;
}

const InvoiceHeader: FC<InvoiceHeaderProps> = ({
  InvSetting,
  InvDetails,
  summaryDetail,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const validateButton =
    InvDetails.from.name !== "" &&
    InvDetails.to.name !== "" &&
    InvDetails.invoiceType !== "";
  const {
    data: record,
    refetch: refetchRecord,
    isFetching: getFetching,
  } = useFetchSingleDocument(`${backendURL}/invoices/last-record`);
  // useEffect(() => {
  //   refetchRecord();
  // }, [refetchRecord]);
  useEffect(() => {
    refetchRecord();
    if (record) {
      dispatch(setInvoiceId(record));
    }
  }, [record,refetchRecord, dispatch]);

  const {
    mutateAsync: createInvoice,
    isLoading: createInvoiceLoading,
    isSuccess: createInvoiceSuccess,
  } = useCreateDocument();
  // useEffect(() => {
  //   if (createInvoiceSuccess) {
  //     router.push("/invoices");
  //   }
  // }, [createInvoiceSuccess, router]);

  async function fetchBlobData(blobUrl: string) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return blob;
  }

  const invoiceData = useMemo(() => {
    return {
      id: InvDetails.id,
      logo: InvDetails.logo,
      type: InvDetails.invoiceType,
      from: InvDetails.from,
      to: InvDetails.to,
      invoiceDate: InvDetails.invoiceDate,
      dueDate: InvDetails.dueDate,
      items: InvDetails.invoiceItem,
      settings: InvSetting,
      notes: InvDetails.addtionalNotes,
    };
  }, [InvDetails, InvSetting]);

  const handleCreateInvoice = async () => {
    const formData = new FormData();
    if (invoiceData.logo) {
      const blob = await fetchBlobData(invoiceData.logo);
      const file = new File([blob], "filename.jpg", { type: blob.type });
      formData.append("image", file);
    }
    formData.append("id", invoiceData.id);
    formData.append("type", invoiceData.type);
    formData.append("invoiceDate", invoiceData.invoiceDate);
    formData.append("dueDate", invoiceData.dueDate);
    formData.append("notes", invoiceData.notes);
    // Convert objects to JSON strings and append
    formData.append("from", JSON.stringify(invoiceData.from));
    formData.append("to", JSON.stringify(invoiceData.to));
    formData.append("settings", JSON.stringify(invoiceData.settings));
    formData.append("items", JSON.stringify(invoiceData.items));
    createInvoice({ data: formData, apiRoute: `${backendURL}/invoices/save` }).then((res)=>{
      router.push("/invoices");
    }).catch(err=>{

    });
  };
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      sx={{ marginTop: "5%" }}
    >
      <Typography variant="display-xs-medium">
        Invoice: {InvDetails.id > 0 ? InvDetails.id : ""}
      </Typography>
      <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
        <Button
          variant="outlined"
          disabled={!validateButton}
          onClick={handleCreateInvoice}
          
        >
          {createInvoiceLoading ? (
            <CircularProgress size={24} sx={{ color: "#8477DA" }} />
          ) : (
            "Save"
          )}
        </Button>

        {validateButton ? (
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
                <button>Loading Document...</button>
              ) : (
                <Button variant="contained">Download PDF</Button>
              )
            }
          </PDFDownloadLink>
        ) : (
          <Button
            variant="contained"
            disabled={true}
            sx={{ background: "#2C359D !important", color: "#fff" }}
          >
            Download PDF
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default InvoiceHeader;
