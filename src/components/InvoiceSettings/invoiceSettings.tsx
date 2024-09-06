"use client";
import { palette } from "@/theme/palette";
import { Box, Button, Popover, Stack, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { SelectInput } from "../SelectInput";
import { SwitchInput } from "../SwitchInput";
import { ColorPicker } from "../ColorPicker";
import { ColorPickerMenuButton } from "../ColorPickerMenuButton";
import { HexColorPicker } from "react-colorful";
import { useSelector, useDispatch } from "react-redux";
import { getColors, setInvoiceColor } from "@/redux/features/invoiceSetting";
import { RootState } from "@/redux/store";

interface InvoiceSettings {
  InvSetting?: any;
}
const InvoiceSettings: FC<InvoiceSettings> = ({ InvSetting }) => {
  const dispatch = useDispatch();
  const reduxColors = useSelector((state: RootState) => getColors(state));
  console.log(`Invoice Settings, redux colors: ${reduxColors}`);
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
  const [color, setColor] = useState("");
  const [pickColor, setPickColor] = useState("");
  // Color Change
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };
  // Custom Color Change
  // const handleSelectColor = (id: number | string) => {
  //   setPickColor("");
  //   const selectedColor = initialColors.filter((data) => data.id === id);
  //   console.log(selectedColor[0].color);
  //   setColors((prevColors) =>
  //     prevColors.map((color) =>
  //       color.id === id
  //         ? { ...color, isSelected: true }
  //         : { ...color, isSelected: false }
  //     )
  //   );
  //   dispatch(setInvoiceColor(selectedColor[0].color));
  // };
  const handleSelectColor = (id: number | string) => {
    setPickColor(""); // Clear any temporary color

    // Find the selected color based on the provided id
    const selectedColor = reduxColors.find((color) => color.id === id);

    if (selectedColor) {
      // Update the colors in Redux with the new selection
      const updatedColors = reduxColors.map((color) =>
        color.id === id
          ? { ...color, isSelected: true }
          : { ...color, isSelected: false }
      );

      // Dispatch the updated colors to Redux
      // dispatch(setColors(updatedColors));

      // Dispatch the selected color to Redux
      dispatch(setInvoiceColor(selectedColor.color));
    }
  };
  // Popover state handling
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const handleColoredChanged = () => {
    setPickColor(color);
    if (color !== "") {
      setColors((prevColors) =>
        prevColors.map((color) => ({ ...color, isSelected: false }))
      );
    }
    setAnchorEl(null);
    dispatch(setInvoiceColor(color));
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // open the color picker
  const handleColorPickerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
          Customize Your Invoice
        </Typography>
        {/* Color palette for color selection */}
        <Typography
          variant="text-sm-regular"
          sx={{ paddingBottom: 2, paddingTop: 2 }}
        >
          Color
        </Typography>
        <hr style={{ marginTop: -8 }} />
        <Box
          sx={{
            marginTop: "10px",
            width: "317px",
          }}
        >
          <ColorPicker
            colors={reduxColors}
            onSelectColor={handleSelectColor}
            InvSetting={InvSetting}
          />
          <ColorPickerMenuButton
            title={pickColor !== "" && color === "" ? "" : InvSetting.color}
            onClick={handleColorPickerClick}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            sx={{
              "& .MuiPopover-paper": {
                backgroundColor: palette.base.white,
              },
            }}
          >
            <Typography sx={{ p: 2, color: palette.base.black }}>
              Choose Color
            </Typography>
            <HexColorPicker
              style={{
                width: "315px",
                padding: "20px",
              }}
              color={color}
              onChange={handleColorChange}
            />
            <Button
              sx={{
                display: "flex",
                alignSelf: "center",
                alignItems: "center",
                margin: "10px",
              }}
              onClick={handleColoredChanged}
              color="primary"
              variant="outlined"
            >
              Done
            </Button>
          </Popover>
        </Box>
        {/* Currency selection */}
        <Typography
          variant="text-sm-regular"
          sx={{ paddingBottom: 2, paddingTop: 2 }}
        >
          Currency
        </Typography>
        <hr style={{ marginTop: -8 }} />
        <Box sx={{ width: "100%", marginTop: 1 }}>
          <SelectInput
            width={"100%"}
            type="currency"
            menuData={["$ Usd", "Rs", "Aed"]}
          ></SelectInput>
        </Box>
        <Typography
          variant="text-sm-regular"
          sx={{ paddingBottom: 2, paddingTop: 2 }}
        >
          Invoice Detail
        </Typography>
        <hr style={{ marginTop: -8 }} />
        <Box sx={{ px: "20px" }}>
          <SwitchInput type="due" lable="Due date"></SwitchInput>
          <SwitchInput type="tax" lable="Tax"></SwitchInput>
          <SwitchInput type="shipping" lable="Shipping details"></SwitchInput>
        </Box>
      </Stack>
    </Box>
  );
};

export default InvoiceSettings;
