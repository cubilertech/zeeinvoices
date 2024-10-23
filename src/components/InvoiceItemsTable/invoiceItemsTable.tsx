"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  ButtonBase,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, useState } from "react";
import { Icon } from "../Icon";
import { ItemsTableRow } from "../ItemsTableRow";
import { isNearWhite, useSelectedColor } from "@/utils/common";
import { useDispatch, useSelector } from "react-redux";
import {
  addInvoiceItem,
  getInvoiceItem,
  removeInvoiceItem,
} from "@/redux/features/invoiceSlice";
import { getCurrency, getTax } from "@/redux/features/invoiceSetting";

const InvoiceItemsTable: FC = () => {
  const getAllInvoiceItems = useSelector(getInvoiceItem);
  const selectedColor = useSelectedColor();
  const selectedCurrency = useSelector(getCurrency);
  const dispatch = useDispatch();
  const selectedTax = useSelector(getTax);
  const isModile = useMediaQuery("(max-width: 700px)");
  const handleAddItem = () => {
    const rowId = Math.floor(Math.random() * 1000);
    dispatch(
      addInvoiceItem({
        id: rowId,
        name: "",
        description: "",
        quantity: 0,
        rate: 0,
        tax: 0,
        subTotal: 0,
        taxAmount: 0,
      })
    );
  };
  // Remove Item
  const handleRemoveItem = (id: number) => {
    dispatch(removeInvoiceItem(id));
  };

  return (
    <Stack direction={"column"}>
      {/* Table header */}
      <Box
        sx={{
          width: "100%",
          overflow: { sm: "visible", xs: "auto" },
        }}
      >
        <Box sx={{ width: { sm: "100%", xs: "100%" } }}>
          {!isModile && (
            <Grid
              container
              sx={{
                width: "100%",
                backgroundColor: selectedColor,
                borderRadius: "4px",
                ml: "0px",
                height: "42px",
                mt: "24px",
                alignItems: "center",
                border: isNearWhite(selectedColor)
                  ? `1px solid ${palette.color.gray[200]}`
                  : "none",
              }}
              spacing={2}
            >
              <Grid
                sx={{
                  padding: "8px",
                  paddingTop: "8px !important",
                  paddingLeft: "12px !important",
                  display: "flex",
                  alignItems: "center",
                }}
                item
                xs={4.56}
              >
                <Typography
                  variant="text-xs-semibold"
                  sx={{
                    color: isNearWhite(selectedColor)
                      ? palette.base.black
                      : palette.base.white,
                  }}
                >
                  Items
                </Typography>
              </Grid>
              <Grid
                sx={{
                  padding: "8px",
                  paddingTop: "8px !important",
                  paddingLeft: "8px !important",
                  display: "flex",
                  alignItems: "center",
                }}
                item
                xs={selectedTax ? 1.5 : 2.3}
              >
                <Typography
                  variant="text-xs-semibold"
                  sx={{
                    color: isNearWhite(selectedColor)
                      ? palette.base.black
                      : palette.base.white,
                  }}
                >
                  Qty
                </Typography>
              </Grid>
              <Grid
                sx={{
                  padding: "8px",
                  paddingTop: "8px !important",
                  paddingLeft: "8px !important",
                  display: "flex",
                  alignItems: "center",
                }}
                item
                xs={selectedTax ? 1.5 : 2.5}
              >
                <Typography
                  variant="text-xs-semibold"
                  sx={{
                    color: isNearWhite(selectedColor)
                      ? palette.base.black
                      : palette.base.white,
                  }}
                >
                  Rate <span>{`(${selectedCurrency})`}</span>
                </Typography>
              </Grid>

              {selectedTax ? (
                <Grid
                  sx={{
                    padding: "8px",
                    paddingTop: "8px !important",
                    paddingLeft: "8px !important",
                    display: "flex",
                    alignItems: "center",
                  }}
                  item
                  xs={1.5}
                >
                  {selectedTax ? (
                    <Typography
                      variant="text-xs-semibold"
                      sx={{
                        color: isNearWhite(selectedColor)
                          ? palette.base.black
                          : palette.base.white,
                      }}
                    >
                      Tax {`(%)`}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Grid>
              ) : (
                <></>
              )}

              <Grid
                sx={{
                  padding: "8px",
                  paddingTop: "8px !important",
                  paddingLeft: "8px !important",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
                item
                xs={selectedTax ? 2.55 : 2.24}
              >
                <Typography
                  variant="text-xs-semibold"
                  sx={{
                    color: isNearWhite(selectedColor)
                      ? palette.base.black
                      : palette.base.white,
                    mr: "0px",
                  }}
                >
                  Subtotal {`(${selectedCurrency})`}
                </Typography>
              </Grid>
            </Grid>
          )}

          {getAllInvoiceItems?.map((item: any, index: number) => (
            <>
              {isModile && (
                <Box
                  sx={{
                    height: "42px",
                    px: "16px",
                    borderRadius: "4px",
                    backgroundColor: selectedColor,
                    display: "flex",
                    alignItems: "center",
                    mt: "24px",
                    border: isNearWhite(selectedColor)
                      ? `1px solid ${palette.color.gray[200]}`
                      : "none",
                  }}
                >
                  <Typography
                    variant="text-xs-semibold"
                    sx={{
                      color: isNearWhite(selectedColor)
                        ? palette.base.black
                        : palette.base.white,
                    }}
                  >
                    Item {index + 1}
                  </Typography>
                </Box>
              )}

              <ItemsTableRow
                key={item.id}
                id={item.id}
                data={item}
                onRemove={handleRemoveItem}
                showRemoveButton={
                  getAllInvoiceItems.length === 1 ? false : true
                } // Show remove button only if there's more than one item
              />
            </>
          ))}
        </Box>
      </Box>
      {/* add items button */}
      <ButtonBase
        onClick={handleAddItem}
        sx={{
          mx: "auto",
          height: "40px",
          width: "98%",
          marginTop: "15px",
          border: "1px dashed",
          borderRadius: 1,
          cursor: "pointer",
          backgroundColor: "#F8FAFC",
          marginBottom: "24px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          borderColor: palette.primary.main,
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Box sx={{ padding: 1 }}>
            <Icon icon="addBlueCircleIcon" width={15} height={15} />
          </Box>
          <Typography
            variant="text-md-semibold"
            sx={{ color: palette.primary.main }}
          >
            Add New Invoice Item
          </Typography>
        </Stack>
      </ButtonBase>
    </Stack>
  );
};

export default InvoiceItemsTable;
