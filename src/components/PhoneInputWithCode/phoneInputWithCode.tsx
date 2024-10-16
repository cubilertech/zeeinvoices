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
import Image from "next/image";

interface PhoneInputWithCodeProps {
  width?: string | number;
  height?: string | number;
  value?: string;
  defaultCountryPhoneCode?: string;
  borderRadius?: string | number;
  placeholder?: string;
  borderColor?: string;
  onChange: (value: string) => void;
  onCountrySelect?: (selectedCountry: {
    code: string;
    label: string;
    phone: string;
  }) => void;
}

const PhoneInputWithCode: React.FC<PhoneInputWithCodeProps> = ({
  width = "100%",
  height = "36px",
  value,
  defaultCountryPhoneCode = "us",
  borderRadius = "8px",
  placeholder = "Phone",
  borderColor = palette.color.gray[120],
  onChange,
  onCountrySelect,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [selectedCountryCode, setSelectedCountryCode] = React.useState(
    defaultCountryPhoneCode
  );
  const [searchQuery, setSearchQuery] = React.useState(""); // State for search query
  const [filteredCountries, setFilteredCountries] = React.useState(countries); // State for filtered countries
  const [phoneInput, setPhoneInput] = React.useState(value || "+1"); // State for phone input

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilteredCountries(countries.filter((country) => country));
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
      countries.filter(
        (country) =>
          country.label.toLowerCase().includes(query) || // Search by country name
          country.phone.toLowerCase().includes(query) || // Search by phone code
          country.code.toLowerCase().includes(query) // Search by country code
      )
    );
  };

  const handleCountrySelect = (country: {
    code: string;
    label: string;
    phone: string;
  }) => {
    setSelectedCountryCode(country.code.toLowerCase());
    if (onChange) {
      onChange(`+${country.phone}`); // Call onChange if it's defined
    }
    setPhoneInput(`+${country.phone}`); // Pre-fill the input with the selected country code
    setAnchorEl(null);
    setSearchQuery("");

    if (onCountrySelect) {
      onCountrySelect(country); // Call the callback function with selected country data
    }
  };

  const handlePhoneInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;

    // Ensure the input always starts with the current country code
    const countryCode = `+${
      countries.find(
        (country) => country.code.toLowerCase() === selectedCountryCode
      )?.phone
    }`;

    // Allow only numbers and "+" in the input
    if (/^\+?\d*$/.test(input)) {
      // Ensure the country code remains intact
      if (!input.startsWith(countryCode)) {
        // If the user tries to delete or modify the country code, restore it
        const correctedInput =
          countryCode + input.slice(countryCode.length - 1);
        // console.log(correctedInput, "correct");
        setPhoneInput(correctedInput); // Update the state with valid input
        if (onChange) {
          onChange(correctedInput); // Call onChange with the corrected value
        }
      } else {
        // console.log(input, "-correct");
        // Update the input if the country code is intact
        setPhoneInput(input); // Update the state with valid input
        if (onChange) {
          onChange(input); // Call onChange with the valid input
        }
      }

      // Optional: Update the selected country flag based on the input (if needed)
      // const foundCountry = countries.find((country) => input.startsWith(`+${country.phone}`));
      // if (foundCountry) {
      //   setSelectedCountryCode(foundCountry.code.toLowerCase());
      //   if (onCountrySelect) {
      //     onCountrySelect(foundCountry); // Call the callback function with the detected country
      //   }
      // }
    }
  };

  React.useEffect(() => {
    const foundCountry = countries.find((country) =>
      phoneInput?.startsWith(`+${country.phone}`)
    );
    if (foundCountry) {
      setSelectedCountryCode(foundCountry.code.toLowerCase()); // Update flag based on typed code
    }
  }, [phoneInput]);
  console.log();
  return (
    <>
      <Stack direction={"row"} sx={{ width: { width }, height: { height } }}>
        <Stack
          direction={"row"}
          sx={{
            width: "30%",
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
            border: `1px solid ${borderColor}`,
            borderRight: "none",
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
              <Image
                loading="lazy"
                width={20}
                height={15}
                src={`https://flagcdn.com/w20/${selectedCountryCode}.png`}
                alt={`${defaultCountryPhoneCode} flag`}
              />
            </Box>
            <ArrowDropDownIcon sx={{ width: "20px" }} />
          </ButtonBase>
        </Stack>
        <TextField
          placeholder={placeholder}
          value={phoneInput} // Set the value of the input to phoneInput
          onChange={handlePhoneInputChange} // Handle input changes
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              height: { height },
            },
            "& .MuiOutlinedInput-root": {
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",

              borderTopRightRadius: borderRadius,
              borderBottomRightRadius: borderRadius,

              "& fieldset": {
                borderColor: { borderColor },
              },
            },
          }}
          inputProps={{
            inputMode: "numeric", // Hint to the browser for numeric input
            // pattern: "[0-9]*", // Pattern to restrict input to numbers
            maxLength: 16,
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
          "& .css-9qdm89-MuiPaper-root-MuiPopover-paper": {
            // width: "270px",
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
        <Box sx={{ width: "270px" }}>
          <Box
            sx={{
              padding: "10px",
            }}
          >
            <TextField
              placeholder="Search"
              value={searchQuery} // Search input value
              onChange={handleSearch} // Handle search input change
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
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <Stack
                  key={index}
                  direction={"row"}
                  gap={1}
                  sx={{
                    px: "10px",
                    py: "5px",
                    alignItems: "center",
                    cursor: "pointer", // Add pointer cursor for better UX
                    ":hover": { backgroundColor: "#e0e0e0" },
                  }}
                  onClick={() => handleCountrySelect(country)} // Handle country selection
                >
                  <Box>
                    <Image
                      loading="lazy"
                      width={20}
                      height={15}
                      src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                      alt={`${country.label} flag`}
                    />
                  </Box>
                  <Typography>{country.label}</Typography>
                  <Typography>+{country.phone}</Typography>
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

export default PhoneInputWithCode;
