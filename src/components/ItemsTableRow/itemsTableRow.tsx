"use client";
import { palette } from "@/theme/palette";
import { Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setInvoiceItem } from "@/redux/features/invoiceSlice";
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
        <Grid
          sx={{ padding: "4px", paddingTop: "4px !important" }}
          item
          xs={4.5}
        >
          <TextField
            // size="small"
            sx={{
              color: palette.color.gray[700],
              width: "100%",
              height: "32px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "2px !important",
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
          sx={{
            padding: "4px",
            paddingTop: "4px !important",
            // paddingLeft: "16px !important",
          }}
          item
          xs={1.6}
        >
          <TextField
            // size="small"
            sx={{
              borderRadius: "3px",
              color: palette.color.gray[700],
              "& .MuiOutlinedInput-root": {
                borderRadius: "2px !important",
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
                textAlign: "right",
              },
            }}
            id="outlined-basic"
            name="quantity"
            type="number"
            placeholder="1"
            variant="outlined"
            value={data.quantity > 0 ? data.quantity : ""}
            inputProps={{ min: 0, style: { textAlign: "right" } }}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          sx={{ padding: "4px", paddingTop: "4px !important" }}
          item
          xs={1.6}
        >
          <TextField
            sx={{
              borderRadius: "3px",
              color: palette.color.gray[700],
              "& .MuiOutlinedInput-root": {
                borderRadius: "2px !important",
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
                textAlign: "right",
              },
            }}
            id="outlined-basic"
            name="rate"
            type="number"
            placeholder="$       0.0"
            variant="outlined"
            value={data.rate > 0 ? data.rate : ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid
          sx={{ padding: "4px", paddingTop: "4px !important" }}
          item
          xs={1.6}
        >
          {selectedTax ? (
            <TextField
              InputProps={{
                inputProps: { min: 0, max: 100 },
              }}
              sx={{
                borderRadius: "3px",
                color: palette.color.gray[700],
                "& .MuiOutlinedInput-root": {
                  borderRadius: "2px !important",
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
                  textAlign: "right",
                },
              }}
              name="tax"
              type="number"
              placeholder="%      0.0"
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
          xs={2.2}
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
            {/* {id} */}
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
            xs={0.3}
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
