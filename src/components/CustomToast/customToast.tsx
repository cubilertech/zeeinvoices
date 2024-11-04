import { toast } from "react-toastify";
import { ReactNode } from "react";
import { Icon } from "../Icon";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Box, Stack } from "@mui/material";

interface CustomToastProps {
  title: string;
  description?: string;
  icon?: any;
  status?: string;
}

const CustomToast = ({
  title,
  description,
  icon,
  status,
}: CustomToastProps) => (
  <div className="custom-toast">
    <Stack direction={"row"} gap={2} sx={{ alignItems: "center" }}>
      <Box
        sx={{
          minHeight: "48px",
          minWidth: "48px",
          backgroundColor: "#DCFAE6",
          borderRadius: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CheckCircleOutlineOutlinedIcon sx={{ color: "#079455" }} />
      </Box>
      <div>
        <div className="custom-toast-title">{title}</div>
        {description && (
          <div className="custom-toast-description">{description}</div>
        )}
      </div>
    </Stack>
  </div>
);

const ShowToast = (
  title: string,
  description: string,
  icon?: any,
  status?: string
) => {
  toast(<CustomToast title={title} description={description} icon={icon} />, {
    icon: false,
    className: "custom-toast",
    bodyClassName: "custom-toast-body",
  });
};

export default ShowToast;
