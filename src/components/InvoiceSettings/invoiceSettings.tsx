"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { SwitchInput } from "../SwitchInput";
import { ColorPicker } from "../ColorPicker";
import { ColorPickerMenuButton } from "../ColorPickerMenuButton";
import { HexColorPicker } from "react-colorful";
import { useSelector, useDispatch } from "react-redux";
import {
  ColorOption,
  getColors,
  getCurrency,
  getSignature,
  getWatermark,
  getWatermarkText,
  setColorsArray,
  setCurrency,
  setInvoiceColor,
  setWatermarkText,
} from "@/redux/features/invoiceSetting";
import { RootState } from "@/redux/store";
import { Close, DoneOutlined } from "@mui/icons-material";
import { SelectInputWithSearch } from "../SelectInputWithSearch";
import { Feedback } from "../Feedback";
import { DigitalSignature } from "../DigitalSignature";
import { getInvoiceWatermarkError } from "@/redux/features/validationSlice";
import { Icon } from "../Icon";

interface InvoiceSettings {
  InvSetting?: any;
  handleClose?: () => void;
  type?:any;
}
const InvoiceSettings: FC<InvoiceSettings> = ({ InvSetting, handleClose,type }) => {
  const dispatch = useDispatch();
  const reduxColors = useSelector((state: RootState) => getColors(state));
  const watermark = useSelector(getWatermark);
  const isSignature = useSelector(getSignature);
  const watermarkText = useSelector(getWatermarkText);
  const [color, setColor] = useState("#fffff");
  const [pickColor, setPickColor] = useState("");
  const [waterMarkInput, setWaterMarkInput] = useState(type ==='edit' ? true : !watermark);
  const [waterMarkInputError, setWaterMarkInputError] = useState("");
  const selectedCurrency = useSelector(getCurrency);
  const isInvoiceWatermarkError = useSelector(
    getInvoiceWatermarkError ?? false
  );
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

  const handleWatermarkChange = (val: string) => {
    if (val.length > 0) {
      setWaterMarkInputError("");
    }
    dispatch(setWatermarkText(val));
  };
  useEffect(()=>{
    setWaterMarkInput(!watermark);
  },[watermark])
  
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
          <SwitchInput type="discount" lable="Discount"></SwitchInput>
          <SwitchInput type="signature" lable="Signature"></SwitchInput>
          <SwitchInput type="tax" lable="Tax"></SwitchInput>
          <SwitchInput type="terms" lable="Terms & Conditions"></SwitchInput>
          <SwitchInput type="watermark" lable="Watermark"></SwitchInput>
          {watermark && (
            <Box>
              <TextField
                disabled={waterMarkInput}
                value={watermarkText}
                variant="standard"
                placeholder="Enter watermark text"
                sx={{
                  width: "100%",
                  py: "10px",
                  px: "16px",
                  border: `1px solid ${palette.color.gray[5]}`,
                  borderRadius: "8px",
                  "& .MuiInputBase-input": {
                    border: "none",
                    height: "20px",
                    pl: "0px",
                    pr: "0px",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: palette.color.gray[610],
                  },
                }}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <IconButton
                      sx={{
                        p: "0px !important",
                        height: "23px !important",
                        width: "23px !important",
                        mr: "0px !important",
                      }}
                      onClick={() => {
                        if (watermarkText.length > 0) {
                          setWaterMarkInput(!waterMarkInput);
                          setWaterMarkInputError("");
                        } else {
                          setWaterMarkInputError(
                            "Watermark cannot be empty."
                          );
                        }
                      }}
                      edge="end" // Optional, aligns the button properly
                    >
                      {waterMarkInput ? (
                        <Icon
                          icon="editInvoiceNumberIcon"
                          width={21}
                          height={21}
                        />
                      ) : (
                        <DoneOutlined sx={{ width: "21px", height: "21px" }} />
                      )}
                    </IconButton>
                  ),
                }}
                inputProps={{
                  maxLength: 21,
                }}
                onChange={(e) => handleWatermarkChange(e.target.value)}
                error={
                  (isInvoiceWatermarkError && watermarkText.length < 3) ||
                  watermarkText.length > 20
                    ? true
                    : false
                }
                helperText={
                  (isInvoiceWatermarkError && watermarkText.length < 3) ||
                  watermarkText.length > 20
                    ? "character length should be 3 - 20"
                    : ""
                }
                onKeyDown={(e: { key: string }) => {
                  if (e.key === "Enter") {
                    if (watermarkText.length > 0) {
                      setWaterMarkInput(!waterMarkInput);
                      setWaterMarkInputError("");
                    } else {
                      setWaterMarkInputError("Watermark cannot be empty.");
                    }
                  }
                }}
              />
              {waterMarkInputError && (
                <p style={{ color: "red", fontSize: "10px" }}>
                  {waterMarkInputError}
                </p>
              )}
            </Box>
          )}
        </Box>
      </Stack>
      {/* <Feedback title="Feedback" placeholder="Provide a valueable feedback" /> */}

      {isSignature && (
        <Stack gap={1.5}>
          <Typography
            variant="text-sm-semibold"
            sx={{ paddingTop: 2, color: palette.color.gray[610] }}
          >
            Signature
          </Typography>
          <DigitalSignature />
        </Stack>
      )}
    </Stack>
    // </Box>
  );
};

export default InvoiceSettings;
