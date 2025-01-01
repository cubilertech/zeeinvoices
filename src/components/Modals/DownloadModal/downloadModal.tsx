"use client";
import {
  Backdrop,
  Box,
  Button,
  ButtonBase,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { Close, SaveAlt } from "@mui/icons-material";
import PdfDownloadLink from "@/components/PdfDownloadLink/PdfDownloadLink";
import PdfView from "@/appPages/PdfView/pdfView";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { PdfToast } from "@/components/PdfToast";
import { backendURL, senderEmailTemplate } from "@/utils/constants";
import { useCreateDocument } from "@/utils/ApiHooks/common";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 3,
};

interface DownloadModal {
  onLogin: () => void;
  onClose: () => void;
  open: boolean;
  InvSetting?: any;
  InvDetails?: any;
  summaryDetail?: any;
}
const DownloadModal: FC<DownloadModal> = ({
  onLogin,
  onClose,
  open,
  InvSetting,
  InvDetails,
  summaryDetail,
}) => {
  const pdfFileName = InvDetails.to?.companyName
  ? InvDetails.to?.companyName + "-" + InvDetails.id
  : InvDetails.to?.name + "-" + InvDetails.id;
  const [isPdfToastOpen, setIsPdfToastOpen] = useState(false); 
  const {mutateAsync : sendReceipentEmail,isSuccess} = useCreateDocument(false, false, false);
  const generatePDFDocument = async () => {
    const itemDetail = InvDetails?.invoiceItem;
    const doc = (
      <PdfView
        invSetting={{ ...InvSetting }}
        invDetails={{ ...InvDetails }}
        Summary={summaryDetail}
        // user={session?.user}
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
        const mimeType = result.type; // `result` is the PDF Blob
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
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0, 0, 0, 0)",
        }}
        open={open}
      >
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            overflow: "auto",
            "& .MuiModal-backdrop": {
              backgroundColor: "rgba(35, 35, 35, 0.1)",
            },
          }}
        >
          <Box sx={{ ...style, width: { sm: 400, xs: "90%" } }}>
            <Stack direction={"column"} gap={2}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #EAECF0",
                  }}
                >
                  <SaveAlt sx={{ width: 22, height: 22, color: "#5E5E62" }} />
                </Box>

                <ButtonBase
                  onClick={onClose}
                  sx={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid EAECF0",
                  }}
                >
                  <Close sx={{ width: 22, height: 22, color: "#98A2B3" }} />
                </ButtonBase>
              </Box>

              <Stack direction={"column"} gap={1}>
                <Typography variant="text-lg-semibold">Download</Typography>
                <Typography variant="text-sm-regular">
                  You can save and keep records of your invoices by just logging
                  in with Google.
                </Typography>
              </Stack>
              <Stack direction={"row"} gap={1.5}>
                <Box sx={{ width: "50%" }}>
                  {/* <PdfDownloadLink
                    InvSetting={InvSetting}
                    InvDetails={InvDetails}
                    summaryDetail={summaryDetail}
                  > */}
                  <Button
                    variant="outlined"
                    onClick={() => generatePDFDocument()}
                    sx={{
                      width: "100%",
                      marginTop: "15px",
                      border: `1px solid #D0D5DD`,
                      borderRadius: "8px",
                      color: "#344054",
                      height: "44px",
                      fontSize: "16px !important",
                      fontWeight: "600 !important",
                    }}
                  >
                    Download
                  </Button>
                  {/* </PdfDownloadLink> */}
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    width: "50%",
                    borderRadius: "8px",
                    marginTop: "15px",
                    height: "44px",
                    fontSize: "16px !important",
                    fontWeight: "600 !important",
                    "&:hover": {},
                  }}
                  onClick={onLogin}
                >
                  Login
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Modal>
      </Backdrop>
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

export default DownloadModal;
