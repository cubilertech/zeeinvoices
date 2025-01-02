import React from "react";
import {Autocomplete as MuiAutoComplete, Box, Stack, SxProps, TextField, Typography, CircularProgress} from "@mui/material";
import Image from "next/image";
import {palette} from "@/theme/palette";
import axios from "axios";

interface AutoCompleteProps {
    label?: string;
    labelColor?: string;
    size?: "small" | "medium" | "large";
    borderRadius?: string;
    sx?: SxProps;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: any) => void;
    helperText?: any;
    onBlur?: any;
    onKeyDown?: any;
    error?: any;
    disabled?: any;
    autoFocus?: boolean;
    isRequired?: boolean;
    optionsData?: any;
    setState?: any;
    dataAPI: string;
    apiBody?: any;
    method?: string;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
                                                       label,
                                                       labelColor,
                                                       name,
                                                       size = "medium",
                                                       borderRadius = "8px",
                                                       sx,
                                                       onChange,
                                                       value,
                                                       helperText,
                                                       onBlur,
                                                       onKeyDown,
                                                       error,
                                                       disabled,
                                                       autoFocus,
                                                       isRequired = false,
                                                       optionsData,
                                                       setState,
                                                       dataAPI,
                                                       apiBody,
                                                       method,
                                                       ...props
                                                   }) : React.JSX.Element => {

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    (async () => {
      setLoading(true);

      try {
      let data = null;
      if (method === "GET") {
        data = await axios.get(dataAPI);
      } else if (method === "POST") {
        data = await axios.post(dataAPI, apiBody);
      }
      
      if (data && data.data && data.data.data) {
        setState(data.data.data);
      } else {
        setState([]);
      }
    } catch (error) {
      console.log(error);
      setState([]);
    }

      setLoading(false);
    })();
  };

  const handleClose = () => {
    setOpen(false);
    setState([]);
  };

    return(
        <Stack direction={"column"}>
            <Stack direction={"row"} gap={0.2}>
                <Typography
                    variant="text-sm-medium"
                    sx={{ marginBottom: "5px", color: `${labelColor}` }}
                >
                    {label}
                </Typography>
                <Typography
                    variant="text-sm-medium"
                    sx={{ marginBottom: "5px", color: "red" }}
                >
                    {isRequired && "*"}
                </Typography>
            </Stack>
            <MuiAutoComplete
                autoComplete={false}
                value={value}
                onChange={onChange}
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
                isOptionEqualToValue={(option, value) => (option?.name ? option?.name : option) === value}
                getOptionLabel={(option) => option?.name ? option?.name : option}
                options={optionsData || []}
                loading={loading}
                renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                      <Box
                        key={key}
                        component="li"
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...optionProps}
                      >
                        {option?.iso2 &&
                        <Image
                          loading="lazy"
                          width="20"
                          height="20"
                          src={`https://flagcdn.com/w20/${option.iso2.toLowerCase()}.png`}
                          alt=""
                          style={{
                              width: '20px',
                              height: '20px',
                          }}
                        />
                        }
                        {option?.name ? option?.name : option}
                      </Box>
                    );
                  }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={`Select a ${label}`}
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={15} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                            sx: {
                                '& .MuiAutocomplete-endAdornment': {
                                    '& .MuiButtonBase-root': {
                                        width: 20, // Adjust icon width
                                        height: 20, // Adjust icon height
                                        padding: 0, // Remove extra padding
                                    },
                                    '& .MuiSvgIcon-root': {
                                        fontSize: '16px', // Adjust icon size
                                    },
                                },
                            },
                      },
                    }}

                    sx={
                        size === "large"
                          ? {
                              "& .MuiInputBase-input": {
                                height: "15px",
                                borderRadius: "8px",
                                "&::placeholder": {
                                  color: palette.color.gray[740], // Change this to your desired placeholder color
                                },
                                
                              },
                              
                              ...sx,
                            }
                          : size === "medium"
                          ? {
                              "& .MuiInputBase-input": {
                                height: "15px",
                                borderRadius: "2px",
                              },
                              ...sx,
                            }
                          : size === "small"
                          ? {
                              ...sx,
                            }
                          : {
                              ...sx,
                            }
                      }
                  />
                )}
            />
        </Stack>
    )
}

export default AutoComplete;