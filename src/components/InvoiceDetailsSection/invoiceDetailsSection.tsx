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
    singleInvoice?.invoiceItem[0].quantity >= 0
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

        <Stack direction={"column"} gap={1.5} sx={{ alignItems: "flex-end" }}>
          <Stack direction={"row"} gap={1} sx={{ alignItems: "center" }}>
            <Typography
              variant="text-xs-bold"
              sx={{
                mt: "2px",
                color: palette.color.gray[610],
                fontSize: "14px",
                lineHeight: "17px",
                fontWeight: 400,
              }}
            >
              Invoice No:
            </Typography>
            <Typography
              variant="text-sm-medium"
              sx={{
                color: palette.color.gray[610],
                fontSize: "14px",
                lineHeight: "17px",
                fontWeight: 600,
              }}
            >
              {singleInvoice?.id}
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={1} sx={{ alignItems: "center" }}>
            <Typography
              variant="text-xs-bold"
              sx={{
                mt: "2px",
                color: palette.color.gray[610],
                fontSize: "14px",
                lineHeight: "17px",
                fontWeight: 400,
              }}
            >
              Invoice Type:
            </Typography>
            <Typography
              variant="text-sm-medium"
              sx={{
                color: palette.color.gray[610],
                fontSize: "14px",
                lineHeight: "17px",
                fontWeight: 600,
              }}
            >
              {singleInvoice?.invoiceType}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {/* Second section, Show (To, From) Detail */}
      <Stack
        direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
        justifyContent={"space-evenly"}
        gap={2}
        sx={{ marginTop: 2, width: "100%" }}
      >
        <ShowDetails
          title="Sender Details"
          companyName={singleInvoice?.from?.companyName}
          name={singleInvoice?.from?.name}
          address={singleInvoice?.from?.address}
          state={singleInvoice?.from?.state}
          email={singleInvoice?.from?.email}
          phone={singleInvoice?.from?.phoneNumber}
        />
        <ShowDetails
          title="Recipient Details"
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
        gap={{ sm: 38, xs: 10 }}
        sx={{ marginTop: 2 }}
      >
        <Stack
          direction={"row"}
          gap={1}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Typography
            variant="text-xxs-semi-bold"
            sx={{
              color: palette.color.gray[610],
              fontSize: "12px",
              lineHeight: "17px",
              fontWeight: 400,
            }}
          >
            Invoice Date:
          </Typography>
          <Typography
            variant="text-xs-regular"
            sx={{
              color: palette.color.gray[610],
              fontSize: "14px",
              lineHeight: "17px",
              fontWeight: 600,
            }}
          >
            {formattedDate(singleInvoice?.invoiceDate)}
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Typography
            variant="text-xxs-semi-bold"
            sx={{
              color: palette.color.gray[610],
              fontSize: "12px",
              lineHeight: "17px",
              fontWeight: 400,
            }}
          >
            Due Date:
          </Typography>
          <Typography
            variant="text-xs-regular"
            sx={{
              color: palette.color.gray[610],
              fontSize: "14px",
              lineHeight: "17px",
              fontWeight: 600,
            }}
          >
            {formattedDate(singleInvoice?.dueDate)}
          </Typography>
        </Stack>
      </Stack>
      <Grid
        container
        sx={{
          width: "100%",
          height: "42px",
          backgroundColor: invoiceSetting?.color,
          borderRadius: "4px",
          marginTop: 2,
          marginLeft: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        spacing={2}
      >
        <Grid
          sx={{
            padding: "0px",
            pl: "8px !important",
            paddingTop: "0px !important",
          }}
          item
          xs={4.1}
        >
          <Typography
            sx={{
              color: palette.base.white,
              fontSize: "12px",
              lineHeight: "15px",
              fontWeight: 600,
            }}
          >
            Items
          </Typography>
        </Grid>
        <Grid
          sx={{
            padding: "8px",
            paddingTop: "8px !important",
            pl: "40px !important",
          }}
          item
          xs={1.8}
        >
          <Typography
            sx={{
              color: palette.base.white,
              fontSize: "12px",
              lineHeight: "15px",
              fontWeight: 600,
            }}
          >
            Qty
          </Typography>
        </Grid>
        <Grid
          sx={{
            padding: "8px",
            paddingTop: "8px !important",
            pl: "6px !important",
          }}
          item
          xs={1.8}
        >
          <Typography
            sx={{
              color: palette.base.white,
              fontSize: "12px",
              lineHeight: "15px",
              fontWeight: 600,
            }}
          >
            Rate
          </Typography>
        </Grid>
        <Grid
          sx={{
            padding: "8px",
            paddingTop: "8px !important",
            pl: "8px !important",
          }}
          item
          xs={2.2}
        >
          {invoiceSetting?.tax ? (
            <Typography
              sx={{
                color: palette.base.white,
                fontSize: "12px",
                lineHeight: "15px",
                fontWeight: 600,
              }}
            >
              Tax
            </Typography>
          ) : (
            " "
          )}
        </Grid>

        <Grid
          sx={{
            padding: "8px",
            paddingTop: "8px !important",
            pl: "10px !important",
          }}
          item
          xs={1.8}
        >
          <Typography
            sx={{
              color: palette.base.white,
              fontSize: "12px",
              lineHeight: "15px",
              fontWeight: 600,
            }}
          >
            Subtotal
          </Typography>
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
                <Typography
                  variant="text-xs-medium"
                  sx={{
                    color: palette.color.gray[900],
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                  }}
                >
                  {data.name}
                </Typography>
              </Grid>
              <Grid
                sx={{ padding: "0px", paddingTop: "1px !important" }}
                item
                xs={1.3}
              >
                <Typography
                  variant="text-xs-regular"
                  sx={{
                    color: palette.color.gray[610],
                    fontSize: "14px",
                    lineHeight: "17px",
                    fontWeight: 500,
                  }}
                >
                  {data.quantity}
                </Typography>
              </Grid>
              <Grid
                sx={{ padding: "0px", paddingTop: "1px !important" }}
                item
                xs={1.8}
              >
                <Typography
                  variant="text-xs-regular"
                  sx={{
                    color: palette.color.gray[610],
                    fontSize: "14px",
                    lineHeight: "17px",
                    fontWeight: 500,
                  }}
                >
                  {invoiceSetting?.currency === "USD"
                    ? "$"
                    : invoiceSetting?.currency}{" "}
                  {data.rate}
                </Typography>
              </Grid>

              <Grid
                sx={{ padding: "0px", paddingTop: "1px !important" }}
                item
                xs={2.2}
              >
                {" "}
                {invoiceSetting.tax ? (
                  <Typography
                    variant="text-xs-regular"
                    sx={{
                      color: palette.color.gray[610],
                      fontSize: "14px",
                      lineHeight: "17px",
                      fontWeight: 500,
                    }}
                  >
                    {data.tax} %
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid
                sx={{ padding: "0px", paddingTop: "1px !important" }}
                item
                xs={1.8}
              >
                <Typography
                  variant="text-xs-regular"
                  sx={{
                    color: palette.color.gray[900],
                    fontSize: "14px",
                    lineHeight: "17px",
                    fontWeight: 600,
                  }}
                >
                  {invoiceSetting.currency}{" "}
                  {(invoiceSetting.tax
                    ? data?.subTotal
                    : data?.subTotal - data?.taxAmount
                  ).toFixed(2)}
                </Typography>
              </Grid>

              {/* added for description */}
              <Grid
                sx={{ padding: "0px", paddingTop: "1px !important" }}
                item
                xs={12}
              >
                <Stack direction={"column"}>
                  <Typography
                    variant="text-xs-medium"
                    sx={{
                      color: palette.color.gray[610],
                      fontSize: "12px",
                      lineHeight: "18px",
                      fontWeight: 400,
                    }}
                  >
                    {data?.description}
                  </Typography>
                </Stack>
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
