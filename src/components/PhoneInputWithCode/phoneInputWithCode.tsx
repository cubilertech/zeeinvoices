import * as React from "react";
import { countries } from "@/utils/data";
import {
  Box,
  ButtonBase,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { palette } from "@/theme/palette";

interface PhoneInputWithCode {
  width?: string | number;
  height?: string | number;
  defaultCountryPhoneCode?: string;
  borderRadius?: string | number;
  placeholder?: string;
}
const PhoneInputWithCode: React.FC<PhoneInputWithCode> = ({
  width = "100%",
  height = "36px",
  defaultCountryPhoneCode = "us",
  borderRadius = "8px",
  placeholder = "Phone",
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <Stack direction={"row"} sx={{ width: { width }, height: { height } }}>
        <Stack
          direction={"row"}
          sx={{
            width: "25%",
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
            border: `1px solid ${palette.base.borderColor}`,
          }}
        >
          <ButtonBase
            sx={{
              width: "100%",
              borderTopLeftRadius: borderRadius,
              borderBottomLeftRadius: borderRadius,
            }}
            onClick={handleClick}
          >
            <Box sx={{ margin: "5px" }}>
              {/* <img
                loading="lazy"
                width="20"
                srcSet={`https://flagcdn.com/w40/${defaultCountryPhoneCode.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${defaultCountryPhoneCode.toLowerCase()}.png`}
                alt=""
              /> */}
            </Box>
            <ArrowDropDownIcon />
          </ButtonBase>
          {/* <Divider orientation="vertical" flexItem /> */}
        </Stack>
        <TextField
          placeholder={placeholder}
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              height: { height },
            },
            "& .MuiOutlinedInput-root": {
              borderTopLeftRadius: "0px ",
              borderBottomLeftRadius: "0px ",
            },
          }}
        />
      </Stack>
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
          padding: "10px",
          "& .css-9qdm89-MuiPaper-root-MuiPopover-paper": {
            width: "300px",
          },
          "& .MuiInputBase-input": {
            height: { height },
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "4px",
          },
        }}
      >
        <TextField placeholder="Search" sx={{ width: "100%" }} />
        <Box sx={{ maxHeight: "180px", overflow: "auto" }}>
          {countries.map((country, index) => (
            <Stack
              key={index}
              direction={"row"}
              gap={2}
              sx={{
                px: "10px",
                py: "5px",
                alignItems: "center",
              }}
            >
              <Box sx={{}}>
                {/* <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                  alt=""
                /> */}
              </Box>
              <Typography>{country.label}</Typography>
              <Typography>+{country.phone}</Typography>
            </Stack>
          ))}
        </Box>
      </Popover>
    </>
  );
};

export default PhoneInputWithCode;
