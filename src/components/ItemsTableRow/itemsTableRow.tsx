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
  useMediaQuery,
} from "@mui/material";
import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setInvoiceItem } from "@/redux/features/invoiceSlice";
import {
  getCurrency,
  getDiscount,
  getTax,
} from "@/redux/features/invoiceSetting";
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
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const InvoiceItemValidation = useSelector(getInvoiceItemsValidation);
  const selectedCurrency = useSelector(getCurrency);
  const selectedTax = useSelector(getTax);
  const selectedDiscount = useSelector(getDiscount);
  const [currentDiscount, setCurrentDiscount] = useState(
    data.discount && data.discount !== 0 ? data.discount : 0
  );
  const rateTextFieldRef = useRef<HTMLInputElement>(null); // to scroll
  const qtyTextFieldRef = useRef<HTMLInputElement>(null); // to scroll
  const nameTextFieldRef = useRef<HTMLInputElement>(null); // to scroll

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "discount") {
      setCurrentDiscount(value);
    }
    dispatch(setInvoiceItem({ id: id, type: name, value: value }));
  };

  const itemValidation = useMemo(() => {
    return (
      InvoiceItemValidation?.find((item) => item.id === id.toString()) || null
    );
  }, [InvoiceItemValidation, id]);

  useEffect(() => {
    if (itemValidation?.rate?.isError && rateTextFieldRef.current) {
      rateTextFieldRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (itemValidation?.quantity?.isError && qtyTextFieldRef.current) {
      qtyTextFieldRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (itemValidation?.name?.isError && nameTextFieldRef.current) {
      nameTextFieldRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [itemValidation]);

  useEffect(() => {
    if (selectedDiscount) {
      dispatch(
        setInvoiceItem({
          id: id,
          type: "discount",
          value: currentDiscount == 0 ? data.discount : currentDiscount,
        })
      );
    } else {
      dispatch(setInvoiceItem({ id: id, type: "discount", value: 0 }));
    }
  }, [selectedDiscount, currentDiscount, data.discount, dispatch, id]);

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
      >
        <Grid
          sx={{
            paddingTop: "4px !important",
          }}
          item
          sm={
            selectedTax
              ? selectedDiscount
                ? 3.16
                : 4.1
              : selectedDiscount
              ? 4.1
              : 4.1
          }
          xs={12}
        >
          <TextField
            inputRef={nameTextFieldRef}
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
            error={
              data.name === ""
                ? itemValidation?.name?.isError
                : data.name.length > 40 || data.name.length < 3
                ? itemValidation?.name?.isError
                : false
            }
            helperText={
              data.name === "" || data.name.length > 40 || data.name.length < 3
                ? itemValidation?.name?.message
                : ""
            }
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
            paddingTop: "4px !important",
          }}
          item
          // sm={selectedTax ? 1.4 : 2.2}
          sm={
            selectedTax
              ? selectedDiscount
                ? 1.4
                : 1.4
              : selectedDiscount
              ? 1.4
              : 2.2
          }
          xs={12}
        >
          <TextField
            inputRef={qtyTextFieldRef}
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
            error={
              data.quantity === "" || data.quantity == 0
                ? itemValidation?.quantity?.isError
                : false
            }
            helperText={
              data.quantity === "" || data.quantity == 0
                ? itemValidation?.quantity?.message
                : ""
            }
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
            paddingTop: "4px !important",
          }}
          item
          // sm={selectedTax ? 1.4 : 2.0}
          sm={
            selectedTax
              ? selectedDiscount
                ? 1.4
                : 1.4
              : selectedDiscount
              ? 1.4
              : 2.2
          }
          xs={12}
        >
          <TextField
            inputRef={rateTextFieldRef}
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
            error={
              data.rate === "" || data.rate == 0
                ? itemValidation?.rate?.isError
                : false
            }
            helperText={
              data.rate === "" || data.rate == 0
                ? itemValidation?.rate?.message
                : ""
            }
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ pl: "0px" }}>
                  {isMobile && (
                    <Typography pr={1.2}>{selectedCurrency}</Typography>
                  )}
                </InputAdornment>
              ),
            }}
            inputProps={{
              inputMode: "numeric", // For numeric input on mobile
              pattern: "[0-9]*", // Restrict to digits
            }}
          />
        </Grid>

        {/* discount field */}
        {selectedDiscount ? (
          <Grid
            sx={{
              paddingTop: "4px !important",
            }}
            item
            xs={12}
            sm={1.4}
          >
            {selectedDiscount ? (
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
                name="discount"
                type="number"
                placeholder="Discount"
                variant="outlined"
                value={data.discount > 0 ? data.discount : ""}
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

        {selectedTax ? (
          <Grid
            sx={{
              paddingTop: "4px !important",
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
            paddingTop: "4px !important",
            justifyContent: { sm: "end", xs: "space-between" },
          }}
          item
          // sm={selectedTax ? 2.3 : 2.4}
          sm={
            selectedTax
              ? selectedDiscount
                ? 2.1
                : 2.7
              : selectedDiscount
              ? 2.7
              : 2.6
          }
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
              Subtotal
            </Typography>
            <Typography
              sx={{
                fontSize: "14px !important",
                fontWeight: "600 !important",
                pt: "2px",
                width: selectedTax
                  ? { sm: "100%", xs: "150px" }
                  : { sm: "100%", xs: "150px" }, // Set width to ensure there's space to scroll
                color: palette.base.black,
                display: "block",
                margin: selectedTax ? "7px 7px 7px 7px" : "7px 7px 7px 7px",
                whiteSpace: "nowrap", // Prevent line break
                overflow: "hidden", // Hide vertical overflow
                textOverflow: "ellipsis", // Add ellipsis if text overflows
                cursor: "pointer",
                textAlign: "end",
                mr: showRemoveButton ? "" : "-23px",
              }}
              title={`${
                selectedCurrency === "USD" ? "$" : selectedCurrency
              } ${(selectedTax
                ? selectedDiscount
                  ? data?.subTotal // Both tax and discount applied
                  : data?.subTotalWithoutDiscount +
                    data?.taxAmountWithoutDiscount // Only tax applied, no discount
                : selectedDiscount
                ? data?.subTotal - data?.taxAmount // Only discount applied, no tax
                : data?.subTotalWithoutDiscount
              ) // Neither tax nor discount applied
                ?.toFixed(2)}`}
            >
              {(selectedTax
                ? selectedDiscount
                  ? data?.subTotal // Both tax and discount applied
                  : data?.subTotalWithoutDiscount +
                    data?.taxAmountWithoutDiscount // Only tax applied, no discount
                : selectedDiscount
                ? data?.subTotal - data?.taxAmount // Only discount applied, no tax
                : data?.subTotalWithoutDiscount
              ) // Neither tax nor discount applied
                ?.toFixed(2)}{" "}
              {selectedCurrency}
            </Typography>
          </Box>
        </Grid>
        {showRemoveButton && (
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
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
                ml: { xs: "0px", sm: "5px" },
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
            paddingTop: "8px !important",
          }}
          item
          xs={12}
        >
          <TextField
            sx={{
              color: palette.color.gray[700],
              width: "100%",
              height: "40px !important",
              "& .MuiInputBase-input": {
                borderRadius: "4px !important",
                height: "20px !important",
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
