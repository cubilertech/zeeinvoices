"use client";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { palette } from "@/theme/palette";
import { Icon } from "../Icon";
import { InvoiceSummary } from "../InvoiceSummary";
import ShowDetails from "../ShowDetails/showDetails";
import { formattedDate } from "@/common/common";
import Image from "next/image";
import { googleImage } from "@/utils/common";
interface InvoiceDetailsProps {
  singleInvoice?: any;
  invoiceSetting?: any;
}

const InvoiceDetailsSection: FC<InvoiceDetailsProps> = ({
  singleInvoice,
  invoiceSetting,
}) => {
  const imageSelected = googleImage(singleInvoice?.logo);
  console.log(
    imageSelected,
    "image path in preview page",
    decodeURIComponent(imageSelected)
  );
  const itemsLength =
    singleInvoice?.invoiceItem &&
    singleInvoice?.invoiceItem[0]?.name !== "" &&
    singleInvoice?.invoiceItem[0].quantity !== 0
      ? true
      : false;

  return (
    <Box
      sx={{
        boxShadow: palette.boxShadows[200],
        backgroundColor: palette.base.white,
        width: "100%",
        padding: 4,
        marginBottom: 3,
        borderTop: "5px solid",
        borderColor: invoiceSetting?.color,
      }}
    >
      {/* First section, invoice head contains logo and invoice number, type */}
      <Stack direction={"row"} justifyContent={"space-between"}>
        {singleInvoice?.logo !== "" ? (
          <Image
            src={imageSelected}
            alt="Selected Logo"
            width={70}
            height={70}
            style={{ objectFit: "contain" }}
            unoptimized
          />
        ) : (
          <Icon icon="logo" height={24} width={175} />
        )}

        <Stack direction={"column"} spacing={1}>
          <Stack direction={"row"} gap={2}>
            <Typography variant="text-xxs-medium">Invoice No:</Typography>
            <Typography
              variant="text-xxs-medium"
              sx={{ color: palette.color.gray[710] }}
            >
              {singleInvoice?.id}
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={1}>
            <Typography variant="text-xxs-medium">Invoice Type:</Typography>
            <Typography
              variant="text-xxs-medium"
              sx={{ color: palette.color.gray[710] }}
            >
              {singleInvoice?.invoiceType}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {/* Second section, Show (To, From) Detail */}
      <Stack
        direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
        justifyContent={"space-between"}
        gap={2}
        sx={{ marginTop: 2 }}
      >
        <ShowDetails
          title="From"
          companyName={singleInvoice?.from?.companyName}
          name={singleInvoice?.from?.name}
          address={singleInvoice?.from?.address}
          state={singleInvoice?.from?.state}
          email={singleInvoice?.from?.email}
          phone={singleInvoice?.from?.phoneNumber}
        />
        <ShowDetails
          title="To"
          companyName={singleInvoice?.to?.companyName}
          name={singleInvoice?.to?.name}
          address={singleInvoice?.to?.address}
          state={singleInvoice?.to?.state}
          email={singleInvoice?.to?.email}
          phone={singleInvoice?.to?.phoneNumber}
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
            {formattedDate(singleInvoice?.invoiceDate)}
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Typography variant="text-xxs-semi-bold">Due Date:</Typography>
          <Typography variant="text-xs-regular" sx={{ color: "#4F4F4F" }}>
            {formattedDate(singleInvoice?.dueDate)}
          </Typography>
        </Stack>
      </Stack>
      {/* Fourth section, items table */}
      {/* <InvoiceItemsTable /> */}
      {/* Table header */}
      <Grid
        container
        sx={{
          width: "100%",
          backgroundColor: invoiceSetting?.color,
          borderRadius: "2px",
          marginTop: 2,
          marginLeft: "0px",
        }}
        spacing={2}
      >
        <Grid
          sx={{ padding: "0px", paddingTop: "8px !important" }}
          item
          xs={4.1}
        >
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
          {invoiceSetting?.tax ? (
            <Typography sx={{ color: palette.base.white }}>Tax</Typography>
          ) : (
            " "
          )}
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

      {itemsLength &&
        singleInvoice?.invoiceItem?.map((data: any, index: number) => (
          <>
            <Grid
              container
              key={index}
              sx={{
                borderRadius: "2px",
                marginTop: 1,
                marginLeft: "0px",
              }}
              spacing={2}
            >
              <Grid
                sx={{ padding: "0px", paddingTop: "4px !important" }}
                item
                xs={4.5}
              >
                <Stack direction={"column"}>
                  <Typography variant="text-xs-medium" sx={{}}>
                    {data.name}
                  </Typography>
                </Stack>
              </Grid>
              <Grid
                sx={{ padding: "8px", paddingTop: "1px !important" }}
                item
                xs={1.3}
              >
                <Typography variant="text-xs-regular" sx={{}}>
                  {data.quantity}
                </Typography>
              </Grid>
              <Grid
                sx={{ padding: "8px", paddingTop: "1px !important" }}
                item
                xs={1.8}
              >
                <Typography variant="text-xs-regular" sx={{}}>
                  {/* {invoiceSetting.currency}  */}
                  {invoiceSetting?.currency === "USD"
                    ? "$"
                    : invoiceSetting?.currency}{" "}
                  {data.rate}
                </Typography>
              </Grid>

              <Grid
                sx={{ padding: "8px", paddingTop: "1px !important" }}
                item
                xs={2.2}
              >
                {" "}
                {invoiceSetting.tax ? (
                  <Typography variant="text-xs-regular" sx={{}}>
                    {data.tax} %
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid
                sx={{ padding: "8px", paddingTop: "1px !important" }}
                item
                xs={1.8}
              >
                <Typography variant="text-xs-regular" sx={{}}>
                  {invoiceSetting.currency}{" "}
                  {(invoiceSetting.tax
                    ? data?.subTotal
                    : data?.subTotal - data?.taxAmount
                  ).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
            <hr style={{ margin: "10px 0px 0px 0px" }}></hr>
          </>
        ))}

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
        Note: {singleInvoice?.addtionalNotes}
      </Typography>
    </Box>
  );
};

export default InvoiceDetailsSection;
