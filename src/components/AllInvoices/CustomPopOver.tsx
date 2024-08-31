import { Button, IconButton, Popover, Stack } from "@mui/material";
import { useState } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import ReactToPrint from "react-to-print";
import PdfDownloadLink from "../PdfDownloadLink/PdfDownloadLink";
import { setFullInvoice } from "@/redux/features/invoiceSlice";
import { setInvoiceSettings } from "@/redux/features/invoiceSetting";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch()
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
        from: record?.from,
        to: record?.to,
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
        detail: record?.settings?.detail,
      })
    );
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <Icon icon="threeDotsIcon" width={5} height={5} />
      </IconButton>
      <Popover
        id={record.id.toString()}
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
            onClick={() => handleViewInvoice(record.id)}
            variant="outlined"
            startIcon={<Icon icon="viewIcon" />}
            sx={{
              justifyContent: "start",
              width: "100%",
              border: "none",
              color: "#4B5563",
              "&:hover": {
                border: "none",
                color: "#4B5563",
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
              color: "#4B5563",
              "&:hover": {
                border: "none",
                color: "#4B5563",
                backgroundColor: palette.color.gray[10],
                borderRadius: 0,
              },
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleShareInvoice(record)}
            variant="outlined"
            startIcon={<Icon icon="sendSqaureIcon" />}
            sx={{
              width: "100%",
              border: "none",
              justifyContent: "start",
              color: "#4B5563",
              "&:hover": {
                border: "none",
                color: "#4B5563",
                backgroundColor: palette.color.gray[10],
                borderRadius: 0,
              },
            }}
          >
            Share
          </Button>
          <PdfDownloadLink
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
                color: "#4B5563",
                "&:hover": {
                  border: "none",
                  color: "#4B5563",
                  backgroundColor: palette.color.gray[10],
                  borderRadius: 0,
                },
              }}
              onClick={() => handlePrintInvoice(record)}
            >
              Download
            </Button>
          </PdfDownloadLink>
          {/* <ReactToPrint
            trigger={() => (
              <Button
                variant="outlined"
                startIcon={<Icon icon="printIconIcon" />}
                sx={{
                  width: "100%",
                  border: "none",
                  justifyContent: "start",
                  color: "#4B5563",
                  "&:hover": {
                    border: "none",
                    color: "#4B5563",
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
            startIcon={<Icon icon="deleteIcon" />}
            sx={{
              width: "100%",
              border: "none",
              justifyContent: "start",
              color: "#4B5563",
              "&:hover": {
                border: "none",
                color: "#4B5563",
                backgroundColor: palette.color.gray[10],
                borderRadius: 0,
              },
            }}
            onClick={() => handleOpenDeleteModal(record.id)}
          >
            Delete
          </Button>
        </Stack>
      </Popover>
    </>
  );
};

export default CustomPopOver;
