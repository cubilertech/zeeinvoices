"use client";
import { palette } from "@/theme/palette";
import { Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  addInvoiceItem,
  getInvoiceItem,
  setInvoiceItem,
} from "@/redux/features/invoiceSlice";
import { getCurrency, getTax } from "@/redux/features/invoiceSetting";
import "../../Styles/tableItemRow.css";

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
  // const [data, setData] = useState({
  //   id: id,
  //   name: "",
  //   quantity: null,
  //   rate: null,
  //   tax: null,
  //   subTotal: 0,
  // });

  const dispatch = useDispatch();
  const selectedCurrency = useSelector(getCurrency);
  const selectedTax = useSelector(getTax);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // setData((prev) => ({ ...prev, [name]: value }));
    dispatch(setInvoiceItem({ id: id, type: name, value: value }));
  };

  return (
    <Stack className="tableItemRow" direction={"column"}>
      {/* Input fields */}
      <Grid
        container
        sx={{
          backgroundColor: palette.base.white,
          borderRadius: 1,
          marginTop: 2,
        }}
        spacing={2}
      >
        <Grid sx={{ padding: "4px", paddingTop: "4px !important" }} item xs={4.8}>
          <TextField
            // size="small"
            sx={{
              color: palette.color.gray[700],
              width: "256px",
              height: "32px",
              "& .MuiOutlinedInput-root": {
                border: "0px !important",
                borderRadius: 0.5,
                borderColor: `${palette.color.gray[120]} !important`,
              },
            }}
            id="outlined-basic"
            name="name"
            placeholder="Name of your product or service"
            variant="outlined"
            value={data.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          sx={{ padding: "4px", paddingTop: "4px !important" }}
          item
          xs={1.8}
        >
          <TextField
            // size="small"
            sx={{
              // border: `1px solid ${palette.borderColor.borderColor}`,
              borderRadius: "3px",
              color: palette.color.gray[700],
              "& .MuiOutlinedInput-root": {
                border: "none !important",
                borderRadius: 0.5,
                borderColor: `${palette.color.gray[120]} !important`,
              },
            }}
            id="outlined-basic"
            name="quantity"
            type="number"
            placeholder="1"
            variant="outlined"
            value={data.quantity > 0 ? data.quantity : ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          sx={{ padding: "4px", paddingTop: "4px !important" }}
          item
          xs={1.8}
        >
          <TextField
            sx={{
              // border: `1px solid ${palette.borderColor.borderColor}`,
              borderRadius: 1,
              color: palette.color.gray[700],
              "& .MuiOutlinedInput-root": {
                border: "none !important",
                borderRadius: 0.5,
                borderColor: `${palette.color.gray[120]} !important`,
              },
            }}
            id="outlined-basic"
            name="rate"
            type="number"
            placeholder="$ 0.0"
            variant="outlined"
            value={data.rate > 0 ? data.rate : ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid
          sx={{ padding: "4px", paddingTop: "4px !important" }}
          item
          xs={1.8}
        >
          {selectedTax ? (
            <TextField
              InputProps={{
                inputProps: { min: 0, max: 100 },
              }}
              sx={{
                // border: `1px solid ${palette.borderColor.borderColor}`,
                borderRadius: 1,
                color: palette.color.gray[700],
                "& .MuiOutlinedInput-root": {
                  border: "none !important",
                  borderRadius: 0.5,
                  borderColor: `${palette.color.gray[120]} !important`,
                },
              }}
              name="tax"
              type="number"
              placeholder="% 0.0"
              variant="outlined"
              value={data.tax > 0 ? data.tax : ""}
              onChange={handleChange}
            />
          ) : (
            ""
          )}
        </Grid>

        <Grid
          sx={{ padding: "4px", paddingTop: "4px !important" }}
          item
          xs={1.8}
        >
          <Typography
            sx={{
              color: palette.base.black,
              display: "flex",
              justifyContent: "flex-end",
              margin: "7px 7px 7px 7px",
            }}
          >
            {selectedCurrency === "$ USD" ? "$" : selectedCurrency}{" "}
            {data.subTotal.toFixed(2)}
          </Typography>
        </Grid>
        {showRemoveButton && (
          <Grid
            sx={{
              paddingTop: "4px !important",
              paddingBottom: "6px !important",
              alignSelf: "center",
            }}
            item
            xs={0.8}
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
      </Grid>
    </Stack>
  );
};

export default ItemsTableRow;
