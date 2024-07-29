"use client";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { FC, useEffect, useMemo } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfView from "@/appPages/PdfView/pdfView";
import { backendURL } from "@/utils/constants";
import {
  useCreateDocument,
  useEditDocument,
  useFetchSingleDocument,
} from "@/utils/ApiHooks/common";
import { useDispatch } from "react-redux";
import { setInvoiceId } from "@/redux/features/invoiceSlice";
import { useRouter } from "next/navigation";

interface InvoiceHeaderProps {
  InvSetting: any;
  InvDetails: any;
  summaryDetail: any;
  type: string;
}

const InvoiceHeader: FC<InvoiceHeaderProps> = ({
  InvSetting,
  InvDetails,
  summaryDetail,
  type,
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
  useEffect(() => {
    if (type === "add") {
      refetchRecord();
      if (record) {
        dispatch(setInvoiceId(record));
      }
    }
  }, [record, refetchRecord, dispatch, type]);

  const {
    mutateAsync: createInvoice,
    isLoading: createInvoiceLoading,
    isSuccess: createInvoiceSuccess,
  } = useCreateDocument();

  const {
    mutateAsync: updateInvoice,
    isLoading: updatLoading,
    isSuccess: updateSuccess,
  } = useEditDocument();

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

  const handleUpdateInvoice = async () => {
    const formData = new FormData();
    if (invoiceData.logo) {
      const blob = await fetchBlobData(invoiceData.logo);
      const file = new File([blob], "filename.jpg", { type: blob.type });
      formData.append("image", file);
    } else {
      formData.append("image", "no-image");
    }
    formData.append("type", invoiceData.type);
    formData.append("invoiceDate", invoiceData.invoiceDate);
    formData.append("dueDate", invoiceData.dueDate);
    formData.append("notes", invoiceData.notes);
    formData.append("from", JSON.stringify(invoiceData.from));
    formData.append("to", JSON.stringify(invoiceData.to));
    formData.append("settings", JSON.stringify(invoiceData.settings));
    formData.append("items", JSON.stringify(invoiceData.items));
    updateInvoice({
      data: formData,
      apiRoute: `${backendURL}/invoices/${invoiceData.id}`,
    })
      .then((res) => {
        router.push("/invoices");
      })
      .catch((err) => {
        throw new Error(`${err.response?.data?.message}`);
      });
  };

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
    createInvoice({ data: formData, apiRoute: `${backendURL}/invoices/save` })
      .then((res) => {
        router.push("/invoices");
      })
      .catch((err) => {
        throw new Error("An error occurred");
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
          sx={{ height: "36px", width: "73px" }}
          variant="outlined"
          disabled={!validateButton}
          onClick={type === "add" ? handleCreateInvoice : handleUpdateInvoice}
        >
          {createInvoiceLoading ? (
            <CircularProgress size={24} sx={{ color: "#8477DA" }} />
          ) : type === "add" ? (
            "Save"
          ) : (
            "Update"
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
                <Button variant="contained" sx={{height: "36px !important",}}>Download PDF</Button>
              )
            }
          </PDFDownloadLink>
        ) : (
          <Button
            variant="contained"
            disabled={true}
            sx={{
              background: "#36C2CE !important",
              color: "#fff",
              width: "138px",
              px:'12px !important'
            }}
          >
            Download PDF
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default InvoiceHeader;
