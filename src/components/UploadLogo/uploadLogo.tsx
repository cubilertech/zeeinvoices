import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";

interface UploadLogoProps {
  logoDesc: string;
}
const UploadLogo: FC<UploadLogoProps> = ({ logoDesc }) => {
  return (
    <Box
      borderRadius={1}
      sx={{
        border: "1px dashed",
        padding: 1,
        width: 200,
        height: 56,
        cursor: "pointer",
        borderColor: palette.dashedBorderColor.borderColor,
      }}
    >
      <Stack direction={"row"} spacing={1}>
        <Icon icon="uploadLogo" height={31} width={34} />
        <Stack direction={"column"} spacing={1}>
          <Typography variant="caption" color={"gray"}>
            {logoDesc}
          </Typography>
          <Typography
            variant="caption"
            color={"black"}
            sx={{ textDecoration: "underline" }}
          >
            Select a file
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UploadLogo;
