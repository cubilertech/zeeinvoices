import * as React from "react";
import { currencies } from "@/utils/data";
import {
  Box,
  ButtonBase,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { palette } from "@/theme/palette";
import { Icon } from "../Icon";

interface SelectInputWithSearchProps {
  width?: string | number;
  height?: string | number;
  value?: string;
  defaultCountryPhoneCode?: string;
  borderRadius?: string | number;
  placeholder?: string;
  borderColor?: string;
  menuData?: string[];
  onChange?: (value: string) => void;
  onCountrySelect?: (selectedCountry: {
    code: string;
    label: string;
    phone: string;
  }) => void;
}

const SelectInputWithSearch: React.FC<SelectInputWithSearchProps> = ({
  width = "100%",
  height = "36px",
  value,
  defaultCountryPhoneCode = "us",
  borderRadius = "4px",
  placeholder = "Phone",
  borderColor = palette.color.gray[200],
  menuData,
  onChange,
  onCountrySelect,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [searchQuery, setSearchQuery] = React.useState(""); // State for search query
  const [filteredCurrencies, setFilteredCountries] = React.useState(currencies); // State for filtered countries

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilteredCountries(currencies.filter((currency) => currency));
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredCountries(
      currencies.filter(
        (currency) => currency.toLowerCase().includes(query) // Search by currency
      )
    );
  };

  const handleCountrySelect = (currency: string) => {
    if (onChange) {
      onChange(`${currency}`); // Call onChange if it's defined
    }
    setAnchorEl(null);
    setSearchQuery("");
  };

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          width: { width },
          height: { height },
          borderRadius: borderRadius,
          border: `1px solid ${borderColor}`,
        }}
      >
        <ButtonBase
          sx={{
            width: "100%",
            pl: "14px",
            pr: "18px",

            borderRadius: borderRadius,
          }}
          onClick={handleClick}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
            }}
          >
            <Typography variant="text-sm-regular">{value}</Typography>
            <Icon icon="arrowDownIcon" width={16} height={16} />
          </Stack>
        </ButtonBase>
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
          "& .css-9qdm89-MuiPaper-root-MuiPopover-paper": {
            borderRadius: { borderRadius },
          },
          "& .MuiInputBase-input": {
            height: "32px",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "4px",
          },
        }}
      >
        <Box sx={{ width: { sm: "356px", xs: "293px" }, pb: "10px" }}>
          <Box
            sx={{
              padding: "10px",
            }}
          >
            <TextField
              placeholder="Search"
              value={searchQuery} 
              onChange={handleSearch} 
              sx={{ width: "100%" }}
            />
          </Box>
          <Box
            sx={{
              maxHeight: "180px",
              overflow: "auto",
              scrollbarWidth: "thin",
            }}
          >
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((currency, index) => (
                <Stack
                  key={index}
                  direction={"row"}
                  gap={1}
                  sx={{
                    px: "15px",
                    py: "5px",
                    alignItems: "center",
                    cursor: "pointer", 
                    ":hover": { backgroundColor: "#e0e0e0" },
                  }}
                  onClick={() => {
                    handleCountrySelect(currency);
                  }} 
                >
                  <Typography>{currency}</Typography>
                </Stack>
              ))
            ) : (
              <Typography
                sx={{ width: "100%", p: "10px", textAlign: "center" }}
              >
                Not found
              </Typography>
            )}
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default SelectInputWithSearch;
