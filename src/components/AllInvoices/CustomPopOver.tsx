import { Button, IconButton, Popover, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import ReactToPrint from "react-to-print";
import PdfDownloadLink from "../PdfDownloadLink/PdfDownloadLink";
import { setFullInvoice } from "@/redux/features/invoiceSlice";
import { setInvoiceSettings } from "@/redux/features/invoiceSetting";
import { useDispatch } from "react-redux";
import PdfView from "@/appPages/PdfView/pdfView";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { useSession } from "next-auth/react";
import { useFetchSingleDocument } from "@/utils/ApiHooks/common";
import { backendURL } from "@/utils/constants";
import { useParams } from "next/navigation";
import { PhoneNumber } from "libphonenumber-js";

interface CustomPopOverProps {
  record: any; // Assuming id is of type number
  handleViewInvoice: (id: number) => void;
  handleOpenDeleteModal: (id: number) => void;
  handleEditInvoice: (id: number) => void;
  handleShareInvoice: (id: number) => void;
  handlePrintInvoice: (id: number) => void;
  componentRef: any;
  InvSetting?: any;
  InvDetails?: any;
  summaryDetail?: any;
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
}) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
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
      })
    );
    dispatch(
      setInvoiceSettings({
        color: record?.settings?.color,
        currency: record?.settings?.currency,
        dueDate: record?.settings?.dueDate,
        tax: record?.settings?.tax,
        terms: record?.settings?.terms,
        detail: record?.settings?.detail,
      })
    );
  };

  // Side effect to manage body overflow
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup to reset body overflow on component unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
    <>
      <IconButton onClick={handleClick}>
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
          <Button
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
          </Button>
          <Button
            onClick={() => handleEditInvoice(record)}
            variant="outlined"
            startIcon={<Icon icon="editIcon" />}
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
          {/* <Button // share option is currently disabled
            onClick={() => handleShareInvoice(record)}
            variant="outlined"
            startIcon={<Icon icon="sendSqaureIcon" />}
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
            Share
          </Button> */}
          {/* <PdfDownloadLink
            InvSetting={InvSetting}
            InvDetails={InvDetails}
            summaryDetail={summaryDetail}
          >
            <Button
              variant="outlined"
              startIcon={<Icon icon="printIconIcon" />}
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
              onClick={() => handlePrintInvoice(record)}
            >
              Download
            </Button>
          </PdfDownloadLink> */}

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
            onClick={() => generatePDFDocument()}
          >
            Download
          </Button>

          {/* <ReactToPrint
            trigger={() => (
              <Button
                variant="outlined"
                startIcon={<Icon icon="printIconIcon" />}
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
                Download
              </Button>
            )}
            content={() => (componentRef.current ? componentRef.current : null)}
            onBeforeGetContent={() => handlePrintInvoice(record)}
          /> */}
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
            onClick={() => handleOpenDeleteModal(record?.id)}
          >
            Delete
          </Button>
        </Stack>
      </Popover>
    </>
  );
};

export default CustomPopOver;
