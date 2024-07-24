import { Button, IconButton, Popover, Stack } from "@mui/material";
import { useState } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import DeleteModal from "../DeleteModal/deleteModal";
import { useDeleteDocument } from "@/utils/ApiHooks/common";
import { backendURL } from "@/utils/constants";

interface CustomPopOverProps {
//   anchorEl: HTMLButtonElement | null;
//   open: boolean;
  id: number; // Assuming id is of type number
//   handleClose: () => void;
  handleViewInvoice: (id: number) => void;
  handleOpenDeleteModal: (id: number) => void;

}

const CustomPopOver: React.FC<CustomPopOverProps> = ({
  id,
  handleViewInvoice,
  handleOpenDeleteModal
}) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
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
      id={id.toString()} // Ensure id is converted to string if necessary
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      sx={{ borderRadius: "8px", transform: "translateX(-35px)" }}
    >
      <Stack direction={"column"} sx={{ alignItems: "start" }}>
        <Button
          onClick={() => handleViewInvoice(id)} // Pass id to handleViewInvoice
          variant="outlined"
          startIcon={<Icon icon="viewIcon" />}
          sx={{
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
          variant="outlined"
          startIcon={<Icon icon="editIcon" />}
          sx={{
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
          Edit
        </Button>
        <Button
          variant="outlined"
          startIcon={<Icon icon="sendSqaureIcon" />}
          sx={{
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
          Share
        </Button>
        <Button
          variant="outlined"
          startIcon={<Icon icon="printIconIcon" />}
          sx={{
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
          Print
        </Button>
        <Button
          variant="outlined"
          startIcon={<Icon icon="deleteIcon" />}
          sx={{
            border: "none",
            color: "#4B5563",
            "&:hover": {
              border: "none",
              color: "#4B5563",
              backgroundColor: palette.color.gray[10],
              borderRadius: 0,
            },
          }}
          onClick={() => handleOpenDeleteModal(id)}
        >
          Delete
        </Button>
        
      </Stack>
    </Popover>
    </>
    
  );
};

export default CustomPopOver;
