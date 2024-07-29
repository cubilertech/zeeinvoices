import { Button, IconButton, Popover, Stack } from "@mui/material";
import { useState } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import DeleteModal from "../DeleteModal/deleteModal";
import { useDeleteDocument } from "@/utils/ApiHooks/common";
import { backendURL } from "@/utils/constants";
import { Route } from "@mui/icons-material";

interface CustomPopOverProps {
  record: any; // Assuming id is of type number
  handleViewInvoice: (id: number) => void;
  handleOpenDeleteModal: (id: number) => void;
  handleEditInvoice: (id: number) => void;
  handleShareInvoice: (id: number) => void;
}

const CustomPopOver: React.FC<CustomPopOverProps> = ({
  record,
  handleViewInvoice,
  handleOpenDeleteModal,
  handleEditInvoice,
  handleShareInvoice
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <Icon icon="threeDotsIcon" width={5} height={5} />
      </IconButton>
      <Popover
        id={record.id.toString()} // Ensure id is converted to string if necessary
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ borderRadius: "8px", transform: "translateX(-35px)" }}
      >
        <Stack direction={"column"} sx={{ display:"flex",  alignItems: "start" }}>
          <Button
            onClick={() => handleViewInvoice(record.id)}
            variant="outlined"
            startIcon={<Icon icon="viewIcon" />}
            sx={{
              justifyContent: "start",
              width:"100%",
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
              width:"100%",
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
          onClick={()=> handleShareInvoice(record)}
            variant="outlined"
            startIcon={<Icon icon="sendSqaureIcon" />}
            sx={{
              width:"100%",
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
          <Button
            variant="outlined"
            startIcon={<Icon icon="printIconIcon" />}
            sx={{
              width:"100%",
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
            Print
          </Button>
          <Button
            variant="outlined"
            startIcon={<Icon icon="deleteIcon" />}
            sx={{
              width:"100%",
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
