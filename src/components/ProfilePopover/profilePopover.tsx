import { palette } from "@/theme/palette";
import { imageConvertion } from "@/utils/common";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { Icon } from "../Icon";
import { useState } from "react";

interface ProfilePopoverProps {
  isOpen: boolean;
  profileData: any;
  handleOpenProfile: () => void;
  handleLogout: () => void;
}

const ProfilePopover: React.FC<ProfilePopoverProps> = ({
  isOpen,
  profileData,
  handleOpenProfile,
  handleLogout,
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ position: "absolute", right: 0, top: 40, borderRadius: "8px" }}>
      <Box
        sx={{
          backgroundColor: palette.base.white,
          boxShadow: palette.boxShadows.shadowlg,
          borderRadius: "8px",
          display: isOpen ? "block" : "none",
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            justifyContent: "left",
            border: `1px solid #EAECF0`,
            borderRadius: "8px",
          }}
        >
          <Stack direction={"row"} gap={1.5} sx={{ py: "12px", px: "16px" }}>
            {profileData?.image ? (
              <Avatar
                sx={{ width: "40px", height: "40px" }}
                alt="Avatar"
                src={imageConvertion(profileData?.image)}
              />
            ) : (
              <Avatar sx={{ width: "40px", height: "40px" }} alt="Bvatar" />
            )}
            <Stack direction={"column"}>
              {" "}
              <Typography
                sx={{
                  maxWidth: "225px",
                  maxHeight: "20px",
                  overflow: "hidden",
                  color: palette.color.gray[900],
                  fontSize: {
                    md: "14px !important",
                    xs: "14px !important",
                  },
                  lineHeight: {
                    md: "20px !important",
                    xs: "20px !important",
                  },
                  fontWeight: {
                    sm: "600 !important",
                    xs: "600 !important",
                  },
                }}
              >
                {profileData?.name}
              </Typography>
              <Typography
                sx={{
                  color: palette.color.gray[610],
                  fontSize: {
                    md: "12px !important",
                    xs: "12px !important",
                  },
                  lineHeight: {
                    md: "18px !important",
                    xs: "18px !important",
                  },
                  fontWeight: {
                    sm: "400 !important",
                    xs: "400 !important",
                  },
                }}
              >
                {profileData?.email}
              </Typography>
            </Stack>
          </Stack>
          <hr />
          <Button
            variant="outlined"
            onClick={handleOpenProfile}
            startIcon={<Icon icon="profileIcon" width={16} height={16} />}
            sx={{
              height: "40px",
              justifyContent: "left",
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
            Profile
          </Button>
          <hr />
          <Button
            variant="outlined"
            onClick={handleLogout}
            startIcon={<Icon icon="logoutIcon" width={16} height={16} />}
            sx={{
              height: "40px",
              justifyContent: "left",
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
            Logout
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfilePopover;
