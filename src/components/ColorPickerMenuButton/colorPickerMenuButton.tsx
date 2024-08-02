"use client";
import { palette } from "@/theme/palette";
import { Box, Stack, Typography } from "@mui/material";
import { FC, MouseEvent } from "react";
import { Icon } from "../Icon";

interface ColorPickerMenuButton {
  title:string;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}
const ColorPickerMenuButton: FC<ColorPickerMenuButton> = ({title,onClick}) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      onClick={onClick}
      sx={{
        border: `1px solid ${palette.base.borderColor}`,
        height:"40px",
        borderRadius: 2,
        alignItems: "center",
        display: "flex",
        marginTop: "15px",
        cursor:"pointer"
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Box sx={{ margin: "5px", marginLeft:"10px" }}>
          <Icon icon="colorPickerPaletteIcon" width={24} height={24} />
        </Box>
        <Typography variant="body1" sx={{alignSelf:"center", color:palette.base.textGreyColor }}>
       { title  ? title : 'Custom Color'}
        </Typography>
      </Stack>
      <Box sx={{ margin: "15px" }}>
        <Icon icon="arrowDownIcon" width={16} height={16} />
      </Box>
    </Stack>
  );
};

export default ColorPickerMenuButton;
