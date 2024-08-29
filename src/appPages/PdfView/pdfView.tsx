"use client";
import React, { FC, useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { formattedDate } from "@/common/common";
import { googleImage } from "@/utils/common";
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: "10px 30px",
    gap: 5,
    borderTop: "4px",
    overflow: "hidden",
  },
  section_top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 40,
    height: "32px",
    alignItems: "center",
    margin: "10px 10px",
  },
  top_view_2: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  top_view_2_container: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "baseline",
  },

  top_view_2_value: {
    fontSize: 12,
  },
  title_logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 175,
    height: 25,
  },
  watermark: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 48,
    color: "#d3d3d3",
    opacity: 1.3,
    zIndex: 1,
  },
});

interface PdfViewProps {
  invSetting: any;
  invDetails: any;
  Summary: any;
  user?: any;
}

// Create Document Component
const PdfView: FC<PdfViewProps> = ({
  invSetting,
  invDetails,
  Summary,
  user,
}) => {
  const [isClient, setIsClient] = useState(false);

  const bgColor = invSetting?.color;
  const dueDate = invSetting?.dueDate;
  const tax = invSetting?.tax;
  const currency =
    invSetting?.currency === "$ USD" ? "$" : invSetting?.currency;
  const currencyText =
    invSetting?.currency === "$ USD" ? "USD" : invSetting?.currency;

  const summarySubTotal = (Summary?.total - Summary?.taxAmount).toFixed(2);

  const invoiceDueDate = formattedDate(invDetails?.dueDate);
  const invoiceDate = formattedDate(invDetails?.invoiceDate);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  const itemsLength =
    invDetails?.invoiceItem[0]?.name !== "" &&
    invDetails?.invoiceItem[0].quantity !== 0
      ? true
      : false;

  const actualSize = {
    // width: invDetails?.logoWidth || "auto", // Replace with actual width if available
    // height: invDetails?.logoHeight || "auto", // Replace with actual height if available
    width: "50px", // Fixed width
    height: "50px", // Adjust height automatically
  };

  return (
    <Document style={{ overflow: "hidden" }}>
      <Page
        size="A4"
        style={{
          flexDirection: "column",
          backgroundColor: "#fff",
          padding: "10px 30px",
          gap: 5,
          borderTop: "4px",
          borderColor: bgColor,
        }}
      >
        {/* Watermark */}
        {!user && (
          <View
            style={{
              width: 277,
              height: 38,
              position: "absolute",
              top: "50%",
              left: "40%",
              transform: "translate(-50%, -50%)",
              fontSize: 48,
              color: "#d3d3d3",
              opacity: 1.3,
              zIndex: 1,
            }}
          >
            <Image src="/Images/icons/watermark-icon.png" />
          </View>
        )}
        {/** Section 1 : logo, invoice type */}
        <View style={styles.section_top}>
          <View style={styles.title_logo}>
            <Image
              // style={styles.logo}
              style={invDetails?.logo ? actualSize : styles.logo}
              src={
                invDetails?.logo
                  ? googleImage(invDetails.logo)
                  : "/Images/logos/zee-logo.png"
              }
            />
          </View>
          <View style={styles.top_view_2}>
            <View style={styles.top_view_2_container}>
              <Text style={{ fontWeight: "extrabold", fontSize: "10px" }}>
                Invoice No:
              </Text>
              <Text style={styles.top_view_2_value}>
                {" "}
                {"  "}
                {invDetails?.id}
              </Text>
            </View>
            <View style={styles.top_view_2_container}>
              <Text style={{ fontWeight: "extrabold", fontSize: "10px" }}>
                Invoice Type:
              </Text>
              <Text style={styles.top_view_2_value}>
                {" "}
                {invDetails?.invoiceType}
              </Text>
            </View>
          </View>
        </View>
        {/* Section 2 : sender receiver  */}
        <View
          style={{
            padding: "5px 10px",
            display: "flex",
            flexDirection: "row",
            gap: 30,
          }}
        >
          {/* from */}
          <View
            style={{
              width: "239px",
              border: "1px solid #eee",
              flexGrow: 1,
              borderRadius: "4px",
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: "14px",
                marginBottom: "2px",
                color: "#767676",
              }}
            >
              From
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: "14px", fontWeight: "extrabold" }}>
                {invDetails?.from?.companyName}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 4,
              }}
            >
              <Text style={{ fontSize: "12px", color: "#444444" }}>
                {invDetails?.from?.name}
              </Text>
              <Text style={{ fontSize: "12px", color: "#444444" }}>
                {invDetails?.from?.address} {invDetails?.from?.city}
              </Text>
              <Text style={{ fontSize: "12px", color: "#444444" }}>
                {invDetails?.from?.state}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 4,
              }}
            >
              <Text style={{ fontSize: "12px", color: "#444444" }}>
                {invDetails?.from?.email}
              </Text>
              <Text style={{ fontSize: "12px", color: "#444444" }}>
                {invDetails?.from?.phoneNumber}
              </Text>
            </View>
          </View>
          {/* to */}
          <View
            style={{
              width: "239px",
              border: "1px solid #eee",
              flexGrow: 1,
              borderRadius: "4px",
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: "14px",
                marginBottom: "2px",
                color: "#767676",
              }}
            >
              To
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: "14px", fontWeight: "extrabold" }}>
                {invDetails?.to?.companyName}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 4,
              }}
            >
              <Text style={{ fontSize: "12px", color: "#444444" }}>
                {invDetails?.to?.name}
              </Text>
              <Text style={{ fontSize: "12px", color: "#444444" }}>
                {invDetails?.to?.address} {invDetails?.to?.city}
              </Text>
              <Text style={{ fontSize: "12px", color: "#444444" }}>
                {invDetails?.to?.state}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 4,
              }}
            >
              <Text style={{ fontSize: "12px", color: "#444444" }}>
                {invDetails?.to?.email}
              </Text>
              <Text style={{ fontSize: "12px", color: "#444444" }}>
                {invDetails?.to?.phoneNumber}
              </Text>
            </View>
          </View>
        </View>
        {/* section 3 : date */}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "5px 10px",
            gap: 30,
          }}
        >
          {/* Invoice date */}
          <View
            style={{
              width: "239px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
              Invoice Date:{"  "}
            </Text>
            <Text style={{ fontSize: "12px", color: "#4F4F4F" }}>
              {invoiceDate}
            </Text>
          </View>
          {/* Due date */}
          {dueDate && (
            <View
              style={{
                width: "239px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                Due Date:{"  "}
              </Text>
              <Text style={{ fontSize: "12px", color: "#4F4F4F" }}>
                {invoiceDueDate}
              </Text>
            </View>
          )}
        </View>
        {/* section 4 : items */}
        <View
          style={{
            height: "30px",
            marginTop: "10px",
            marginLeft: "10px",
            marginRight: "10px",
            backgroundColor: bgColor,
            borderRadius: "2px",
            display: "flex",
            flexDirection: "row",
            padding: "5px 10px",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              width: "220px",
              fontSize: "10px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Items
          </Text>
          <Text
            style={{
              width: "50px",
              fontSize: "10px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            QTY/HRS
          </Text>
          <Text
            style={{
              width: "50px",
              fontSize: "10px",
              fontWeight: "bold",
              color: "white",
              marginLeft: "25",
            }}
          >
            Rate
          </Text>
          {tax && Summary?.taxAmount > 0 ? (
            <Text
              style={{
                width: "50px",
                fontSize: "10px",
                fontWeight: "bold",
                color: "white",
                marginLeft: "25",
              }}
            >
              Tax
            </Text>
          ) : (
            ""
          )}
          <Text
            style={{
              marginLeft: "35px",
              fontSize: "10px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Subtotal
          </Text>
        </View>

        {itemsLength &&
          invDetails?.invoiceItem?.map((data: any, index: number) => (
            <View
              key={data.id}
              style={{
                marginLeft: "7px",
                marginRight: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderBottom: "1px solid #E0E0E0",
                padding: "5px 10px",
                // gap: 3,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ width: "200px", fontSize: "12px" }}>
                  {data.name}
                </Text>
                <Text
                  style={{
                    width: "50px",
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginLeft: "1px",
                    textAlign: "right",
                  }}
                >
                  {data?.quantity}
                </Text>
                <Text
                  style={{
                    width: "50px",
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginLeft: "17px",
                    textAlign: "right",
                  }}
                >
                  {currency} {data?.rate}
                </Text>
                {tax && Summary?.taxAmount > 0 ? (
                  <Text
                    style={{
                      width: "50px",
                      fontSize: "10px",
                      fontWeight: "bold",
                      marginLeft: "22px",
                      textAlign: "right",
                    }}
                  >
                    {data?.tax} %
                  </Text>
                ) : (
                  ""
                )}

                <Text
                  style={{
                    width: "70px",
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginLeft: "33px",
                    textAlign: "right",
                  }}
                >
                  {currency}{" "}
                  {(tax
                    ? data?.subTotal
                    : data?.subTotal - data?.taxAmount
                  ).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}

        {invDetails?.addtionalNotes && (
          <Text
            style={{ fontSize: "10px", color: "#444444", padding: "5px 15px" }}
          >
            Note: {invDetails?.addtionalNotes}
          </Text>
        )}
        {/* section 5 : summary, terms */}
        <View
          style={{
            marginTop: "70px",
            padding: "1px 10px",
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          {/* terms */}
          <View
            style={{
              width: "270px",
              flexGrow: 1,
              borderRadius: "4px",
              padding: "5px 10px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 6,
              }}
            >
              <Text style={{ fontSize: "12px" }}>Terms & Conditions</Text>
              <Text
                style={{ fontSize: "10px", color: "#444444", lineHeight: 1.4 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
                nisi, vel mauris facilisis pellentesque.
              </Text>
            </View>
          </View>
          {/* summary */}
          <View
            style={{
              width: "240px",
              border: "1px solid #E0E0E0",
              flexGrow: 1,
              borderRadius: "3px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <View
              style={{
                height: "30px",
                backgroundColor: bgColor,
                borderRadius: "2px",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                gap: 30,
              }}
            >
              <Text
                style={{
                  fontSize: "14px",
                  marginLeft: "65px",
                  color: "white",
                }}
              >
                Invoice Summary
              </Text>
            </View>
            {/* summary desc */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: "10px",
                marginRight: "10px",
                marginBottom: "10px",
                paddingBottom: "10px",
                borderBottom: "1px solid #E0E0E0",
              }}
            >
              <Text style={{ fontSize: "12px", color: "#767676" }}>
                Subtotal
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: "12px", color: "#4F4F4F" }}>
                  {currencyText}
                </Text>
                <Text style={{ fontSize: "12px" }}> {summarySubTotal}</Text>
              </View>
            </View>
            {tax && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: "10px",
                  marginRight: "10px",
                  marginBottom: "10px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                <Text style={{ fontSize: "12px", color: "#767676" }}>Tax</Text>
                <Text style={{ fontSize: "12px", color: "#4F4F4F" }}>
                  {Summary?.taxAmount > 0
                    ? currencyText + " " + Summary?.taxAmount.toFixed(2)
                    : "--"}
                </Text>
              </View>
            )}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: "10px",
                marginRight: "10px",
                marginBottom: "10px",
                paddingBottom: "10px",
              }}
            >
              <Text style={{ fontSize: "12px", color: "#767676" }}>Total</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: "12px", color: "#4F4F4F" }}>
                  {currencyText}
                </Text>
                <Text style={{ fontSize: "12px" }}>
                  {" "}
                  {(tax
                    ? Summary?.total
                    : Summary?.total - Summary?.taxAmount
                  ).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* secion 6 : footer */}
        <View
          style={{
            marginLeft: "40px",
            marginRight: "40px",
            marginTop: "1px",
            left: 0,
            right: 0,
            padding: "10px",
            borderTop: "1px solid #E0E0E0",
            position: "absolute",
            bottom: "0px !important",
          }}
          fixed
        >
          <Text
            style={{
              fontSize: "9px",
              color: "#5E5E62",
              margin: "0px auto",
              fontWeight: "bold",
            }}
          >
            © 2022 ZAPTA Technologies, All Rights Reserved
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfView;
