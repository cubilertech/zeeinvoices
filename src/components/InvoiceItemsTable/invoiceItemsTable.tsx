"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";

const InvoiceItemsTable: FC = () => {
  return (
    <Stack direction={"column"}>
      {/* Table header */}
      <Grid
        container
        sx={{
          backgroundColor: palette.itemsHeadColor.itemsHeadColor,
          borderRadius: 1,
          marginTop: 2,
        }}
        spacing={2}
      >
        <Grid sx={{ padding: "8px", paddingTop: "8px !important" }} item xs={4}>
          <Typography sx={{ color: palette.base.white }}>Items</Typography>
        </Grid>
        <Grid sx={{ padding: "8px", paddingTop: "8px !important" }} item xs={2}>
          <Typography sx={{ color: palette.base.white }}>QTY/HRS</Typography>
        </Grid>
        <Grid sx={{ padding: "8px", paddingTop: "8px !important" }} item xs={2}>
          <Typography sx={{ color: palette.base.white }}>Rate</Typography>
        </Grid>
        <Grid sx={{ padding: "8px", paddingTop: "8px !important" }} item xs={2}>
          <Typography sx={{ color: palette.base.white }}>Tax</Typography>
        </Grid>
        <Grid sx={{ padding: "8px", paddingTop: "8px !important" }} item xs={2}>
          <Typography sx={{ color: palette.base.white }}>Subtotal</Typography>
        </Grid>
      </Grid>

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
        <Grid sx={{ padding: "8px", paddingTop: "8px !important" }} item xs={4}>
          <TextField
            sx={{
              border: `1px solid ${palette.borderColor.borderColor}`,
              borderRadius: 1,
              color: palette.color.gray[700],
            }}
            id="outlined-basic"
            placeholder="Name of your product or service"
            variant="outlined"
          />
        </Grid>
        <Grid sx={{ padding: "8px", paddingTop: "8px !important" }} item xs={2}>
          <TextField
            sx={{
              border: `1px solid ${palette.borderColor.borderColor}`,
              borderRadius: 1,
              color: palette.color.gray[700],
            }}
            id="outlined-basic"
            placeholder="Name of your product or service"
            variant="outlined"
          />
        </Grid>
        <Grid sx={{ padding: "8px", paddingTop: "8px !important" }} item xs={2}>
          <TextField
            sx={{
              border: `1px solid ${palette.borderColor.borderColor}`,
              borderRadius: 1,
              color: palette.color.gray[700],
            }}
            id="outlined-basic"
            placeholder="Name of your product or service"
            variant="outlined"
          />
        </Grid>
        <Grid sx={{ padding: "8px", paddingTop: "8px !important" }} item xs={2}>
          <TextField
            sx={{
              border: `1px solid ${palette.borderColor.borderColor}`,
              borderRadius: 1,
              color: palette.color.gray[700],
            }}
            id="outlined-basic"
            placeholder="Name of your product or service"
            variant="outlined"
          />
        </Grid>
        <Grid sx={{ padding: "8px", paddingTop: "8px !important" }} item xs={2}>
          <Typography sx={{ color: palette.base.black }}>$ 0.00</Typography>
        </Grid>
        {/* // description section */}
        <Grid
          sx={{ padding: "8px", paddingTop: "8px !important" }}
          item
          xs={10}
        >
          <TextField
            sx={{
              border: `1px solid ${palette.borderColor.borderColor}`,
              borderRadius: 1,
              color: palette.color.gray[700],
              width: "100%",
            }}
            id="outlined-basic"
            placeholder="Name of your product or service"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          height: "40px",
          width: "100%",
          marginTop: "10px",
          border: `2px dashed ${palette.borderColor.borderColor}`,
          borderRadius: 1,
          backgroundColor: palette.color.gray[10],
        }}
      >
        <Stack direction={"row"} sx={{
          justifyContent:"center",
          alignItems:"center",
          display:"flex",
        }}>
          <IconButton sx={{ padding: 1 }}>
            <Icon icon="addCircleOutlined" width={20} height={20}></Icon>
          </IconButton>
          <Typography variant="caption" sx={{ color: palette.base.black }}>Add New Invoice Item</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default InvoiceItemsTable;
