"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { SelectInput } from "../SelectInput";
import { SwitchInput } from "../SwitchInput";
import { ColorPicker } from "../ColorPicker";
import { ColorPickerMenuButton } from "../ColorPickerMenuButton";
import { HexColorPicker } from "react-colorful";

interface InvoiceSettings {
  currencyMenuData?: string[];
}

const InvoiceSettings: FC<InvoiceSettings> = (currencyMenuData) => {
  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value);
  // };

  const initialColors = [
    { id: 1, color: "#2A2A2A", isSelected: true },
    { id: 2, color: "#444444", isSelected: false },
    { id: 3, color: "#1A1A21", isSelected: false },
    { id: 4, color: "#6183E4", isSelected: false },
    { id: 5, color: "#0286FF", isSelected: false },
    { id: 6, color: "#366AEF", isSelected: false },
    { id: 7, color: "#9747FF", isSelected: false },
    { id: 8, color: "#C69ED4", isSelected: false },
    { id: 9, color: "#70756A", isSelected: false },
    { id: 10, color: "#446043", isSelected: false },
    { id: 11, color: "#56607C", isSelected: false },
    { id: 12, color: "#AB5FB1", isSelected: false },
    { id: 13, color: "#5F319A", isSelected: false },
    { id: 14, color: "#E461C7", isSelected: false },
    { id: 15, color: "#FFCC02", isSelected: false },
    { id: 16, color: "#B2E461", isSelected: false },
  ];
  const [colors, setColors] = useState(initialColors);

  const [open, setOpen] = useState(false);   
  const [color, setColor] = useState("#2A2A2A");

  const handleClickOpen = () => {    
    setOpen(true);
  };

  const handleClose = () => {    
    setOpen(false);
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleSelectColor = (id: number | string) => {
    setColors((prevColors) =>
      prevColors.map((color) =>
        color.id === id
          ? { ...color, isSelected: true }
          : { ...color, isSelected: false }
      )
    );
  };

  // Popover state handling

  // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
  //   null
  // );

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  return (
    <Box
      borderRadius={3}
      sx={{
        width: 357,
        height: 776,
        backgroundColor: palette.base.white,
        padding: 2,
        boxShadow: palette.boxShadows[100],
      }}
    >
      <Stack direction={"column"}>
        <Typography variant="h6" sx={{ paddingBottom: 2, paddingTop: 1 }}>
          Invoice Settings
        </Typography>
        {/* Color palette for color selection */}
        <Typography variant="body1" sx={{ paddingBottom: 2, paddingTop: 2 }}>
          Color
        </Typography>
        <hr style={{ marginTop: -8 }} />
        <Box
          sx={{
            marginTop: "10px",
            width: "317px",
            // height: "154px",
          }}
        >
          <ColorPicker colors={colors} onSelectColor={handleSelectColor} />
          <ColorPickerMenuButton onClick={handleClickOpen} />

          {/* <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
          </Popover> */}

          <Dialog open={open} onClose={handleClose} sx={{color:palette.base.white}}>
            <DialogTitle>Pick a Color</DialogTitle>
            <DialogContent>
              <HexColorPicker color={color} onChange={handleColorChange} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Done
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
        {/* Currency selection */}
        <Typography variant="body1" sx={{ paddingBottom: 2, paddingTop: 2 }}>
          Currency
        </Typography>
        <hr style={{ marginTop: -8 }} />
        <Box sx={{ width: "100%", marginTop: 1 }}>
          <SelectInput
            width={"100%"}
            menuData={["$ USD", "RS", "ADE"]}
          ></SelectInput>
        </Box>
        <Typography variant="body1" sx={{ paddingBottom: 2, paddingTop: 0 }}>
          Invoice Detail
        </Typography>
        <hr></hr>
        <Box sx={{ px: 2 }}>
          <SwitchInput lable="Due date"></SwitchInput>
          <SwitchInput lable="Tax"></SwitchInput>
          <SwitchInput lable="Shipping details"></SwitchInput>
        </Box>
      </Stack>
    </Box>
  );
};

export default InvoiceSettings;
