"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setInvoiceItem } from "@/redux/features/invoiceSlice";
import { getCurrency, getTax } from "@/redux/features/invoiceSetting";
import "../../Styles/tableItemRow.css";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { getInvoiceItemsValidation } from "@/redux/features/validationSlice";

interface ItemsTableRowProps {
  id: number;
  onRemove: (id: number) => void;
  data: any;
  showRemoveButton: boolean;
}

const ItemsTableRow: FC<ItemsTableRowProps> = ({
  id,
  onRemove,
  data,
  showRemoveButton,
}) => {
  const dispatch = useDispatch();
  const InvoiceItemValidation = useSelector(getInvoiceItemsValidation);
  // const [taxValue, setTaxValue] = useState("");
  const selectedCurrency = useSelector(getCurrency);
  const selectedTax = useSelector(getTax);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // setData((prev) => ({ ...prev, [name]: value }));
    dispatch(setInvoiceItem({ id: id, type: name, value: value }));
  };

  const itemValidation = useMemo(() => {
    return (
      InvoiceItemValidation?.find((item) => item.id === id.toString()) || null
    );
  }, [InvoiceItemValidation, id]);

  console.log(InvoiceItemValidation, "InvoiceItemValidation");

  return (
    <Stack className="tableItemRow" direction={"column"}>
      {/* Input fields */}
      <Grid
        container
        sx={{
          backgroundColor: palette.base.white,
          borderRadius: 1,
          marginTop: 2,
          px: 1,
          gap: "8px",
        }}
        // spacing={2}
      >
        <Grid
          sx={{
            // padding: "4px",
            paddingTop: "4px !important",
          }}
          item
          sm={4.5}
          xs={12}
        >
          <TextField
            // size="small"
            sx={{
              color: palette.color.gray[700],
              width: "100%",
              "& .MuiInputBase-input": {
                borderRadius: "4px !important",
                height: "40px !important",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px !important",
              },
              "& .MuiInputBase-input::placeholder": {
                color: palette.color.gray[800],
                opacity: 0.7,
              },
            }}
            error={itemValidation?.name?.isError}
            helperText={itemValidation?.name?.message ?? ""}
            id="outlined-basic"
            name="name"
            placeholder="Item name"
            variant="outlined"
            value={data.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          sx={{
            // padding: "4px",
            paddingTop: "4px !important",
            // paddingLeft: "8px !important",
          }}
          item
          sm={selectedTax ? 1.4 : 2.2}
          xs={12}
        >
          <TextField
            // size="small"
            sx={{
              width: "100%",
              color: palette.color.gray[700],
              "& .MuiInputBase-input": {
                borderRadius: "4px !important",
                height: "40px !important",
                pr: "0px !important",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px !important",
                pr: "7px !important",
              },
              "& .MuiInputBase-input::placeholder": {
                color: palette.color.gray[800],
                opacity: 0.7,
              },
              "& input[type=number]": {
                MozAppearance: "textfield",
                "&::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "&::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                textAlign: "left",
              },
            }}
            id="outlined-basic"
            name="quantity"
            type="number"
            placeholder="Qty"
            error={itemValidation?.quantity?.isError}
            helperText={itemValidation?.quantity?.message ?? ""}
            variant="outlined"
            value={data.quantity > 0 ? data.quantity : ""}
            inputProps={{
              min: 0,
              inputMode: "numeric", // For numeric input on mobile
              pattern: "[0-9]*", // Restrict to digits
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = parseInt(e.target.value, 10);
              if (value >= 0 || e.target.value === "") {
                handleChange(e); // Now the type should match
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography
                    sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}
                  >
                    <KeyboardArrowUp
                      onClick={() =>
                        dispatch(
                          setInvoiceItem({
                            id: id,
                            type: "quantity",
                            value: parseInt(data.quantity, 10) + 1,
                          })
                        )
                      }
                      sx={{ width: "12px", height: "12px", cursor: "pointer" }}
                    />
                    <KeyboardArrowDown
                      onClick={() => {
                        if (data.quantity >= 0 || data.quantity !== "") {
                          dispatch(
                            setInvoiceItem({
                              id: id,
                              type: "quantity",
                              value: parseInt(data.quantity, 10) - 1,
                            })
                          );
                        }
                      }}
                      sx={{
                        width: "12px",
                        height: "12px",
                        mt: -0.8,
                        cursor: "pointer",
                      }}
                    />
                  </Typography>
                </InputAdornment>
              ),
            }}
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "e") {
                e.preventDefault(); // Prevent entering the minus sign or 'e'
              }
            }}
          />
        </Grid>
        <Grid
          sx={{
            // padding: "4px",
            paddingTop: "4px !important",
            // paddingLeft: "8px !important",
          }}
          item
          sm={selectedTax ? 1.4 : 2.0}
          xs={12}
        >
          <TextField
            sx={{
              borderRadius: "4px",
              width: "100%",
              color: palette.color.gray[700],
              "& .MuiInputBase-input": {
                borderRadius: "4px !important",
                height: "40px !important",
                pr: "0px",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px !important",
                pr: "5px",
              },
              "& .MuiInputBase-input::placeholder": {
                color: palette.color.gray[800],
                opacity: 0.7,
              },
              "& input[type=number]": {
                MozAppearance: "textfield",
                "&::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "&::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                textAlign: "left",
              },
            }}
            id="outlined-basic"
            name="rate"
            error={itemValidation?.rate?.isError}
            helperText={itemValidation?.rate?.message ?? ""}
            type="number"
            placeholder={selectedTax ? `Rate` : `Rate`}
            variant="outlined"
            value={data.rate > 0 ? data.rate : ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = parseInt(e.target.value, 10);
              if (value >= 0 || e.target.value === "") {
                handleChange(e); // Now the type should match
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "e") {
                e.preventDefault(); // Prevent entering the minus sign or 'e'
              }
            }}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end" sx={{ pl: "0px" }}>
            //       <Typography pr={1.2}>{selectedCurrency}</Typography>
            //     </InputAdornment>
            //   ),
            // }}
            inputProps={{
              inputMode: "numeric", // For numeric input on mobile
              pattern: "[0-9]*", // Restrict to digits
            }}
          />
        </Grid>

        {selectedTax ? (
          <Grid
            sx={{
              // padding: "4px",
              paddingTop: "4px !important",
              // paddingLeft: "8px !important",
            }}
            item
            xs={12}
            sm={1.4}
          >
            {selectedTax ? (
              <TextField
                sx={{
                  width: "100%",
                  color: palette.color.gray[700],
                  "& .MuiInputBase-input": {
                    borderRadius: "4px !important",
                    height: "40px !important",
                    pr: "0px",
                  },
                  "& .MuiOutlinedInput-root": {
                    pr: "8px !important",
                    borderRadius: "4px !important",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: palette.color.gray[800],
                    opacity: 0.7,
                  },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                    "&::-webkit-outer-spin-button": {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                    "&::-webkit-inner-spin-button": {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                    textAlign: "left",
                  },
                }}
                name="tax"
                type="number"
                placeholder="Tax             "
                variant="outlined"
                value={data.tax > 0 ? data.tax : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  // Ensure that only up to 4 digits can be entered
                  if (/^\d{0,4}$/.test(value)) {
                    handleChange(e);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "e") {
                    e.preventDefault(); // Prevent entering the minus sign or 'e'
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography>%</Typography>
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 4, // Max length of 4 digits
                  inputMode: "numeric", // For numeric input on mobile
                  pattern: "[0-9]*", // Restrict to digits
                }}
              />
            ) : (
              ""
            )}
          </Grid>
        ) : (
          <></>
        )}

        <Grid
          sx={{
            // padding: "4px",
            paddingTop: "4px !important",
            // paddingLeft: "8px !important",
            justifyContent: { sm: "end", xs: "space-between" },
          }}
          item
          sm={selectedTax ? 2.3 : 2.4}
          xs={11}
        >
          <Box
            sx={{
              display: { sm: "initial", xs: "flex" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="text-md-regular"
              sx={{
                display: { sm: "none", xs: "initial" },
                color: palette.color.gray[610],
              }}
            >
              SubTotal
            </Typography>
            <Typography
              // variant="text-md-semibold"
              sx={{
                fontSize: "14px !important",
                fontWeight: "600 !important",
                pt: "2px",
                // ml: "20%",
                width: selectedTax
                  ? { sm: "100%", xs: "100px" }
                  : { sm: "100%", xs: "100px" }, // Set width to ensure there's space to scroll
                color: palette.base.black,
                display: "block",
                // justifyContent: "flex-end",
                margin: selectedTax ? "7px 7px 7px 7px" : "7px 7px 7px 7px",
                whiteSpace: "nowrap", // Prevent line break
                overflow: "hidden", // Hide vertical overflow
                textOverflow: "ellipsis", // Add ellipsis if text overflows
                // scrollbarWidth: "none", // Hide scrollbar in Firefox
                // "&::-webkit-scrollbar": {
                //   display: "none", // Hide scrollbar in WebKit browsers (Chrome, Safari)
                // },
                cursor: "pointer",
                textAlign: "end",
                mr: showRemoveButton ? "" : "-23px",
              }}
              title={`${
                selectedCurrency === "USD" ? "$" : selectedCurrency
              } ${(selectedTax
                ? data?.subTotal
                : data?.subTotal - data?.taxAmount
              )?.toFixed(2)}`} // Optional: Show full value on hover
            >
              {selectedCurrency}{" "}
              {(selectedTax
                ? data?.subTotal
                : data?.subTotal - data?.taxAmount
              )?.toFixed(2)}
              {/* {id} */}
            </Typography>
          </Box>
        </Grid>
        {showRemoveButton && (
          <Grid
            sx={{
              paddingTop: "4px !important",
              paddingBottom: "6px !important",
              alignSelf: "center",
            }}
            item
            sm={0.3}
            xs={0.5}
          >
            <IconButton
              className="deleteIconButton"
              onClick={() => onRemove(id)}
              aria-label="delete"
              sx={{
                alignItems: "center",
                width: "15px !important",
                height: "15px !important",
                borderRadius: 1,
                mt: { sm: 0, xs: 1 },
              }}
            >
              <CloseIcon
                sx={{
                  width: "15px",
                  height: "15px",
                  color: palette.color.gray[300],
                  ":hover": {
                    color: "#009E74",
                  },
                }}
              />
            </IconButton>
          </Grid>
        )}
        {/* for description */}
        <Grid
          sx={{
            // padding: "4px",
            paddingTop: "8px !important",
          }}
          item
          xs={12}
        >
          <TextField
            // size="small"
            sx={{
              color: palette.color.gray[700],
              width: "100%",
              height: "40px !important",
              "& .MuiInputBase-input": {
                borderRadius: "4px !important",
                height: "20px !important",
                // p: 2,
                py: "10px",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px !important",
                padding: "0px !important",
              },
              "& .MuiInputBase-input::placeholder": {
                color: palette.color.gray[800],
                opacity: 0.7,
              },
            }}
            multiline
            maxRows={3}
            id="outlined-basic"
            name="description"
            placeholder="Enter Description"
            variant="outlined"
            value={data.description}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ItemsTableRow;
