import {
  Button,
  IconButton,
  Popover,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";

interface CustomPopOverProps {
  record: any;
  handleViewClient: (id: number) => void;
  handleOpenDeleteModal: (id: number) => void;
  handleEditClient: (id: number) => void;
  isPopoverOpen?: (isPopoverOpen: boolean) => void;
}

const ClientPopOver: React.FC<CustomPopOverProps> = ({
  record,
  handleViewClient,
  handleOpenDeleteModal,
  handleEditClient,
  isPopoverOpen,
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
      <IconButton
        sx={{
          zIndex: 2,
        }}
        onClick={(event) => {
          event.stopPropagation();
          handleClick(event);
        }}
      >
        <Icon icon="threeDotsIcon" width={16} height={16} />
      </IconButton>
      <Popover
        id={record?.id}
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
            onClick={() => handleViewClient(record._id)}
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
            onClick={() => {
              handleEditClient(record);
              handleClose();
            }}
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
              handleOpenDeleteModal(record._id);
              handleClose();
            }}
          >
            Delete
          </Button>
        </Stack>
      </Popover>
    </>
  );
};

export default ClientPopOver;
