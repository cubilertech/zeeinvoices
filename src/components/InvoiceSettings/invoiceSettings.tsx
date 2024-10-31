"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { SwitchInput } from "../SwitchInput";
import { ColorPicker } from "../ColorPicker";
import { ColorPickerMenuButton } from "../ColorPickerMenuButton";
import { HexColorPicker } from "react-colorful";
import { useSelector, useDispatch } from "react-redux";
import {
  ColorOption,
  getColors,
  getCurrency,
  setColorsArray,
  setCurrency,
  setInvoiceColor,
} from "@/redux/features/invoiceSetting";
import { RootState } from "@/redux/store";
import { Close } from "@mui/icons-material";
import { SelectInputWithSearch } from "../SelectInputWithSearch";
import { Feedback } from "../Feedback";

interface InvoiceSettings {
  InvSetting?: any;
  handleClose?: () => void;
}
const InvoiceSettings: FC<InvoiceSettings> = ({ InvSetting, handleClose }) => {
  const dispatch = useDispatch();
  const reduxColors = useSelector((state: RootState) => getColors(state));

  const [color, setColor] = useState("#fffff");
  const [pickColor, setPickColor] = useState("");
  const selectedCurrency = useSelector(getCurrency);
  // Color Change
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

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

      // Dispatch the selected color to Redux
      dispatch(setInvoiceColor(selectedColor.color));
    }
  };
  // Popover state handling
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const handleColoredChanged = () => {
    setPickColor(color);
    if (!reduxColors.some((c) => c.color === color)) {
      // Create a copy of reduxColors
      const updatedColors: ColorOption[] = [...reduxColors];

      // Replace the last color with the new color
      updatedColors[reduxColors.length - 1] = {
        ...updatedColors[reduxColors.length - 1],
        color: color,
      };

      // Dispatch the updated array
      dispatch(setColorsArray(updatedColors));
    }

    setAnchorEl(null);
    dispatch(setInvoiceColor(color));
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  // open the color picker
  const handleColorPickerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSelectedItem = (item: string) => {
    dispatch(setCurrency(item));
  };

  return (
    // <Box
    //   borderRadius={"4px"}
    //   sx={{
    //     width: { sm: "411px", xs: "100%" },
    //     height: { sm: "auto", xs: "100%" },
    //     marginBottom: { sm: 0, xs: 0 },
    //     backgroundColor: palette.base.white,
    //     padding: "24px",
    //     boxShadow: palette.boxShadows[100],
    //   }}
    // >
    <Stack
      direction={"column"}
      justifyContent={"space-between"}
      borderRadius={"4px"}
      sx={{
        width: { sm: "411px", xs: "100%" },
        height: { sm: "auto", xs: "100%" },
        marginBottom: { sm: 0, xs: 0 },
        backgroundColor: palette.base.white,
        padding: "24px",
        boxShadow: palette.boxShadows[100],
      }}
    >
      <Stack direction={"column"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
          <Typography
            variant="text-xl-semibold"
            color={palette.color.gray[900]}
          >
            Customize Your Invoice
          </Typography>
          <IconButton
            sx={{
              display: { sm: "none", xs: "" },
              borderRadius: "100%",
              width: "24px",
              height: "24px",
            }}
            onClick={handleClose}
          >
            <Close sx={{ width: "24px", height: "24px" }} />
          </IconButton>
        </Box>

        {/* Color palette for color selection */}
        <Typography
          variant="text-sm-semibold"
          sx={{
            paddingTop: 2,
            color: palette.color.gray[610],
          }}
        >
          Colors
        </Typography>
        <Box
          sx={{
            marginTop: "10px",
            width: "100%",
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
            onClose={handleCloseMenu}
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end", // Align to the right
                padding: "10px",
                pr: "20px",
              }}
            >
              <Button
                onClick={handleColoredChanged}
                color="primary"
                variant="outlined"
              >
                Done
              </Button>
            </Box>
          </Popover>
        </Box>
        {/* Currency selection */}
        <Typography
          variant="text-sm-semibold"
          sx={{ paddingTop: 2, color: palette.color.gray[610] }}
        >
          Currency
        </Typography>

        <Box sx={{ width: "100%", marginTop: 1 }}>
          <SelectInputWithSearch
            onChange={(value) => handleSelectedItem(value)}
            value={selectedCurrency}
            height="40px"
          />
        </Box>
        <Typography
          variant="text-sm-semibold"
          sx={{ paddingTop: 2, color: palette.color.gray[610] }}
        >
          Invoice Detail
        </Typography>
        <Box>
          <SwitchInput type="due" lable="Due date"></SwitchInput>
          <SwitchInput type="tax" lable="Tax"></SwitchInput>
          <SwitchInput type="terms" lable="Terms & Conditions"></SwitchInput>
        </Box>
      </Stack>

      <Feedback title="Feedback" placeholder="Provide a valueable feedback" />
    </Stack>
    // </Box>
  );
};

export default InvoiceSettings;
