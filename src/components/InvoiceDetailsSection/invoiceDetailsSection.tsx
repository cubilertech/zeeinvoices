"use client";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { palette } from "@/theme/palette";
import { Icon } from "../Icon";
import { InvoiceDatePicker } from "../InvoiceDatePicker";
import { InvoiceItemsTable } from "../InvoiceItemsTable";
import { InvoiceSummary } from "../InvoiceSummary";

import DetailSelecter from "../detailSelecter/detailSelecter";
import ShowDetails from "../ShowDetails/showDetails";

const InvoiceDetailsSection: FC = () => {
  return (
    <Box
      sx={{
        boxShadow: palette.boxShadows[200],
        backgroundColor: palette.base.white,
        width: "100%",
        padding: 4,
        marginBottom: 3,
        borderTop: "5px solid",
        borderColor: "#3F4DE1",
      }}
    >
      {/* First section, invoice head contains logo and invoice number, type */}
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Icon icon="logo" height={24} width={175} />
        <Stack direction={"column"} spacing={1}>
          <Stack direction={"row"} gap={2}>
            <Typography variant="text-xxs-medium">Invoice No:</Typography>
            <Typography
              variant="text-xxs-medium"
              sx={{ color: palette.color.gray[710] }}
            >
              001
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={1}>
            <Typography variant="text-xxs-medium">Invoice Type:</Typography>
            <Typography
              variant="text-xxs-medium"
              sx={{ color: palette.color.gray[710] }}
            >
              Bill
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {/* Second section, Show (To, From) Detail */}
      <Stack
        direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
        justifyContent={"space-between"}
        gap={5}
        sx={{ marginTop: 2 }}
      >
        <ShowDetails
          title="From"
          companyName="ABC"
          address="240 FF, Dha Phase 4, Lahore, 54792"
          state="Pakistan"
          email="ather.raza28@gmail.com"
          phone="03215399275"
        />
        <ShowDetails
          title="From"
          companyName="DEF"
          address="240 FF, Dha Phase 4, Lahore, 54792"
          state="Pakistan"
          email="ather.raza28@gmail.com"
          phone="03215399275"
        />
      </Stack>
      {/* Third section, Dates (Invoice  and Due) */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ marginTop: 2 }}
      >
        <Stack
          direction={"row"}
          gap={1}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Typography variant="text-xxs-semi-bold">Invoice Date:</Typography>
          <Typography variant="text-xs-regular" sx={{ color: "#4F4F4F" }}>
            Sep 23rd, 2022
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Typography variant="text-xxs-semi-bold">Due Date:</Typography>
          <Typography variant="text-xs-regular" sx={{ color: "#4F4F4F" }}>
            Sep 23rd, 2022
          </Typography>
        </Stack>
      </Stack>
      {/* Fourth section, items table */}
      {/* <InvoiceItemsTable /> */}

      {/* Table header */}
      <Grid
        container
        sx={{
          backgroundColor: "#3F4DE1",
          borderRadius: "2px",
          marginTop: 2,
          marginLeft:"0px",
        }}
        spacing={2}
      >
        <Grid sx={{ padding: "0px", paddingTop: "8px !important" }} item xs={4}>
          <Typography sx={{ color: palette.base.white }}>Items</Typography>
        </Grid>
        <Grid
          sx={{ padding: "8px", paddingTop: "8px !important" }}
          item
          xs={1.8}
        >
          <Typography sx={{ color: palette.base.white }}>QTY/HRS</Typography>
        </Grid>
        <Grid
          sx={{ padding: "8px", paddingTop: "8px !important" }}
          item
          xs={1.8}
        >
          <Typography sx={{ color: palette.base.white }}>Rate</Typography>
        </Grid>

        <Grid
          sx={{ padding: "8px", paddingTop: "8px !important" }}
          item
          xs={2.2}
        >
          <Typography sx={{ color: palette.base.white }}>Tax</Typography>
        </Grid>

        <Grid
          sx={{ padding: "8px", paddingTop: "8px !important" }}
          item
          xs={1.8}
        >
          <Typography sx={{ color: palette.base.white }}>Subtotal</Typography>
        </Grid>
      </Grid>

      {/* Table rows */}
      <Grid
        container
        sx={{
          borderRadius: "2px",
          marginTop: 1,
          marginLeft:"0px",
        }}
        spacing={2}
      >
        <Grid sx={{ padding: "0px", paddingTop: "4px !important" }} item xs={4.5}>
          <Stack direction={"column"}>
            <Typography variant="text-xs-medium" sx={{}}>
              Web and App Design
            </Typography>
            <Typography variant="text-xxs-small" sx={{ color: "#4F4F4F" }}>
              Lorem ipsum dolor sit amet, con adipiscing elit.{" "}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          sx={{ padding: "8px", paddingTop: "1px !important" }}
          item
          xs={1.3}
        >
          <Typography variant="text-xs-regular" sx={{}}>
            1
          </Typography>
        </Grid>
        <Grid
          sx={{ padding: "8px", paddingTop: "1px !important" }}
          item
          xs={1.8}
        >
          <Typography variant="text-xs-regular" sx={{}}>
            $4.00
          </Typography>
        </Grid>

        <Grid
          sx={{ padding: "8px", paddingTop: "1px !important" }}
          item
          xs={2.2}
        >
          <Typography variant="text-xs-regular" sx={{}}>
            %0.00
          </Typography>
        </Grid>

        <Grid
          sx={{ padding: "8px", paddingTop: "1px !important" }}
          item
          xs={1.8}
        >
          <Typography variant="text-xs-regular" sx={{}}>
            $ 4.00
          </Typography>
        </Grid>
      </Grid>
      <hr style={{ margin: "10px 0px 0px 0px" }}></hr>

      {/* Fifth section, Invoice summery */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "50px",
        }}
      >
        <InvoiceSummary />
      </Box>
      <hr style={{ margin: "100px 0px 5px 0px" }}></hr>
      {/* Sixth section, additional notes */}
      <Typography
        variant="text-xxs-small"
        sx={{
          color: "#4F4F4F",
        }}
      >
        Note: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
        nisi, vel mauris facilisis pellentesque.
      </Typography>
    </Box>
  );
};

export default InvoiceDetailsSection;
