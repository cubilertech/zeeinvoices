import { Button, IconButton, Popover, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import { setFullInvoice } from "@/redux/features/invoiceSlice";
import { setInvoiceSettings } from "@/redux/features/invoiceSetting";
import { useDispatch } from "react-redux";
import PdfView from "@/appPages/PdfView/pdfView";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { useSession } from "next-auth/react";
import { PdfToast } from "../PdfToast";
import { backendURL, senderEmailTemplate } from "@/utils/constants";
import { useCreateDocument } from "@/utils/ApiHooks/common";

interface CustomPopOverProps {
  record: any;
  handleViewInvoice: (id: number) => void;
  handleOpenDeleteModal: (id: number) => void;
  handleEditInvoice: (id: number) => void;
  handleShareInvoice: (id: number) => void;
  handlePrintInvoice: (id: number) => void;
  componentRef: any;
  InvSetting?: any;
  InvDetails?: any;
  summaryDetail?: any;
  isPopoverOpen?: (isPopoverOpen: boolean) => void;
}

const CustomPopOver: React.FC<CustomPopOverProps> = ({
  record,
  handleViewInvoice,
  handleOpenDeleteModal,
  handleEditInvoice,
  handleShareInvoice,
  handlePrintInvoice,
  componentRef,
  InvSetting,
  InvDetails,
  summaryDetail,
  isPopoverOpen,
}) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const {mutateAsync : sendReceipentEmail} = useCreateDocument(false,false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isPdfToastOpen, setIsPdfToastOpen] = useState(false);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const pdfFileName = InvDetails.to?.companyName
    ? InvDetails.to?.companyName + "-" + InvDetails.id
    : InvDetails.to?.name + "-" + InvDetails.id;
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    dispatch(
      setFullInvoice({
        id: record?.id,
        logo: record?.image,
        invoiceType: record?.type,
        from: {
          ...record?.fromDetails,
          phoneNumber: record?.fromDetails?.phone_number,
          companyName: record?.fromDetails?.company_name,
        },
        to: {
          ...record?.toDetails,
          phoneNumber: record.toDetails?.phone_number,
          companyName: record.toDetails?.company_name,
        },
        invoiceDate: record?.invoiceDate,
        dueDate: record?.dueDate,
        addtionalNotes: record?.notes,
        invoiceItem: record?.items,
        signature: {
          image: record?.signature?.image,
          designation: record?.signature?.designation,
        },
      })
    );
    dispatch(
      setInvoiceSettings({
        colors: record?.settings.colors,
        color: record?.settings?.color,
        currency: record?.settings?.currency,
        watermarkText: record?.settings.watermarkText,
        dueDate: record?.settings?.dueDate,
        discount: record?.settings?.discount,
        signature: record?.settings?.signature,
        tax: record?.settings?.tax,
        terms: record?.settings?.terms,
        watermark: record?.settings.watermark,
        detail: record?.settings?.detail,
      })
    );
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
    const apiUrl = `${backendURL}/clients/send-promotional-email`

    // Convert PDF Blob to Base64
    const reader = new FileReader();
    reader.readAsDataURL(result);
    reader.onloadend = async () => {
      if (reader.result && typeof reader.result === "string") {
        const pdfBase64 = reader.result.split(",")[1]; // Get Base64 part

        // Extract MIME type from the Blob
        const mimeType = result.type; 
        const extension = mimeType.split("/")[1] || "pdf"; // Fallback to 'pdf' if not found

        fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: "Your Invoice Has Been Created",
            toEmail: InvDetails?.from?.email, // Replace with the sender's email
            html: senderEmailTemplate,
            fileAttachment: [
              {
                filename: `${pdfFileName}.${extension}`, // Use dynamically extracted extension
                content: pdfBase64,
                encoding: "base64",
              },
            ],
          }),
        })
          .then((response) => {
            if (response.status === 200) {
              console.log('Email sent successfully!')
              // toast.success("Email sent successfully!");
            } else {
              console.log('Failed to send email!')
              // alert("Failed to send email.");
            }
          })
          .catch(() => {
            alert("An error occurred while sending the email.");
          });
        // Send Email to Recipent
         const data = {
          name:InvDetails?.to?.name,
          email:InvDetails?.to?.email
         }
        await sendReceipentEmail({data,apiRoute:apiUrl})
      } else {
        console.error("Error: FileReader result is null or not a string");
      }
    };

    saveAs(result, pdfFileName);

    setIsPdfToastOpen(true);
    setTimeout(() => {
      setIsPdfToastOpen(false);
    }, 3000);
  };

  const handlePdfToastClose = () => {
    setIsPdfToastOpen(false);
  };
  return (
    <>
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          handleClick(event);
        }}
      >
        <Icon icon="threeDotsIcon" width={16} height={16} />
      </IconButton>
      <Popover
        id={record?.id?.toString()}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ borderRadius: "8px", transform: "translateX(-35px)" }}
      >
        <Stack
          direction={"column"}
          sx={{ display: "flex", alignItems: "start" }}
        >
          {/* <Button
            onClick={() => {
              setAnchorEl(null);
              handleViewInvoice(record?.id);
            }}
            variant="outlined"
            startIcon={<Icon icon="viewIcon" />}
            sx={{
              justifyContent: "start",
              width: "100%",
              border: "none",
              color: "#121926",
              "&:hover": {
                border: "none",
                color: "#121926",
                backgroundColor: palette.color.gray[10],
                borderRadius: 0,
              },
            }}
          >
            View
          </Button> */}
          <Button
            onClick={() => {
              setAnchorEl(null);
              handleEditInvoice(record);
            }}
            variant="outlined"
            startIcon={<Icon icon="editIcon2" />}
            sx={{
              width: "100%",
              border: "none",
              justifyContent: "start",
              color: "#121926",
              "&:hover": {
                border: "none",
                color: "#121926",
                backgroundColor: palette.color.gray[10],
                borderRadius: 0,
              },
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            startIcon={<Icon icon="downloadIcon" />}
            sx={{
              width: "100%",
              border: "none",
              justifyContent: "start",
              color: "#121926",
              "&:hover": {
                border: "none",
                color: "#121926",
                backgroundColor: palette.color.gray[10],
                borderRadius: 0,
              },
            }}
            onClick={() => {
              setAnchorEl(null);
              generatePDFDocument();
            }}
          >
            Download
          </Button>
          <Button
            variant="outlined"
            startIcon={<Icon icon="deleteRedIcon" />}
            sx={{
              width: "100%",
              border: "none",
              justifyContent: "start",
              color: "#EF4444",
              "&:hover": {
                border: "none",
                color: "#EF4444",
                backgroundColor: palette.color.gray[10],
                borderRadius: 0,
              },
            }}
            onClick={() => {
              setAnchorEl(null);
              handleOpenDeleteModal(record?.id);
            }}
          >
            Delete
          </Button>
        </Stack>
      </Popover>
      <PdfToast
        isOpen={isPdfToastOpen}
        progress={100}
        lable={pdfFileName}
        type="single"
        handleClose={handlePdfToastClose}
      />
    </>
  );
};

export default CustomPopOver;
