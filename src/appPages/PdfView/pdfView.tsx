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
import { googleImage, isNearWhite } from "@/utils/common";
import { palette } from "@/theme/palette";
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: "40px 30px",
    paddingTop: "30px",
    gap: 5,
    borderTop: "4px",
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
    fontSize: 14,
    fontWeight: "extrabold",
    color: "#4B5565",
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
  image: {
    width: "100px",
    height: "50px",
    objectFit: "contain",
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
  itemDetail?: any;
}

const PdfView: FC<PdfViewProps> = ({
  invSetting,
  invDetails,
  Summary,
  user,
  itemDetail,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [itemsLength, setItemsLength] = useState(false);

  const bgColor = invSetting?.color;
  const dueDate = invSetting?.dueDate;
  const tax = invSetting?.tax;
  const currency = invSetting?.currency;
  const currencyText =
    invSetting?.currency === "USD" ? "USD" : invSetting?.currency;

  const summarySubTotal = (Summary?.total - Summary?.taxAmount).toFixed(2);

  const invoiceDueDate = formattedDate(invDetails?.dueDate);
  const invoiceDate = formattedDate(invDetails?.invoiceDate);

  useEffect(() => {
    setIsClient(true);
    const invoiceItems =
      invDetails?.invoiceItem &&
      invDetails?.invoiceItem[0]?.name !== "" &&
      invDetails?.invoiceItem[0].quantity !== 0
        ? true
        : false;
    setItemsLength(invoiceItems);
  }, [invDetails?.invoiceItem]);

  if (!isClient) {
    return null;
  }

  return (
    <Document style={{ overflow: "hidden", paddingBottom: "100px" }}>
      <Page
        size="A4"
        style={{
          ...styles.page,
          borderColor: bgColor,
        }}
      >
        {/** Section 1 : logo, invoice type */}
        <View style={styles.section_top}>
          <View style={styles.title_logo}>
            {invDetails?.logo && (
              <Image
                style={invDetails?.logo ? styles.image : styles.logo}
                src={googleImage(invDetails.logo)}
              />
            )}
          </View>
          <View style={styles.top_view_2}>
            <View style={styles.top_view_2_container}>
              <Text style={{ fontSize: "14px", color: "#4B5565" }}>
                Serial No:
              </Text>
              <Text style={styles.top_view_2_value}>
                {" "}
                {"  "}
                {invDetails?.id}
              </Text>
            </View>
            <View style={styles.top_view_2_container}>
              <Text
                style={{
                  fontWeight: "extrabold",
                  fontSize: "14px",
                  color: "#4B5565",
                }}
              >
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
            marginTop: "46px",
            gap: 15,
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
                textTransform: "uppercase",
              }}
            >
              Sender
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
            <View>
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
                  {invDetails?.from?.email}
                </Text>
                <Text style={{ fontSize: "12px", color: "#444444" }}>
                  {invDetails?.from?.phoneNumber}
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
                  {invDetails?.from?.address} {invDetails?.from?.city}
                </Text>
                <Text style={{ fontSize: "12px", color: "#444444" }}>
                  {invDetails?.from?.state}
                </Text>
              </View>
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
                textTransform: "uppercase",
              }}
            >
              Recipient
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
            <View>
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
                  {invDetails?.to?.email}
                </Text>
                <Text style={{ fontSize: "12px", color: "#444444" }}>
                  {invDetails?.to?.phoneNumber}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 4,
                  marginTop: 0,
                }}
              >
                <Text style={{ fontSize: "12px", color: "#444444" }}>
                  {invDetails?.to?.address} {invDetails?.to?.city}
                </Text>
                <Text style={{ fontSize: "12px", color: "#444444" }}>
                  {invDetails?.to?.state}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* section 3 : date */}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "5px 10px",
            gap: 27,
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
            <Text style={{ fontSize: "14px", color: "#4B5565" }}>
              Invoice Date:{"  "}
            </Text>
            <Text
              style={{
                fontSize: "14px",
                fontWeight: "extrabold",
                color: "#4B5565",
              }}
            >
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
              <Text style={{ fontSize: "14px", color: "#4B5565" }}>
                Due Date:{"  "}
              </Text>
              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: "extrabold",
                  color: "#4B5565",
                }}
              >
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
            backgroundColor: bgColor === "#fffff" ? "white" : bgColor,
            borderRadius: "2px",
            display: "flex",
            flexDirection: "row",
            padding: "5px 10px",
            alignItems: "center",
            border: isNearWhite(bgColor)
              ? `1px solid ${palette.color.gray[200]}`
              : "none",
          }}
        >
          <Text
            style={{
              width: "190px",
              fontSize: "12px",
              fontWeight: "bold",
              color: isNearWhite(bgColor)
                ? palette.base.black
                : palette.base.white,
            }}
          >
            Items
          </Text>
          <Text
            style={{
              width: "42px",
              fontSize: "12px",
              fontWeight: "bold",
              color: isNearWhite(bgColor)
                ? palette.base.black
                : palette.base.white,
            }}
          >
            Qty
          </Text>
          <Text
            style={{
              width: "80px",
              fontSize: "12px",
              fontWeight: "bold",
              color: isNearWhite(bgColor)
                ? palette.base.black
                : palette.base.white,
              marginLeft: "25",
            }}
          >
            Rate {`(${currency})`}
          </Text>
          {tax && Summary?.taxAmount > 0 ? (
            <Text
              style={{
                width: "55px",
                fontSize: "12px",
                fontWeight: "bold",
                color: isNearWhite(bgColor)
                  ? palette.base.black
                  : palette.base.white,
              }}
            >
              Tax (%)
            </Text>
          ) : (
            <Text
              style={{
                width: "55px",
                fontSize: "12px",
                fontWeight: "bold",
                color: "white",
              }}
            ></Text>
          )}
          <Text
            style={{
              marginLeft: "20px",
              fontSize: "12px",
              fontWeight: "bold",
              color: isNearWhite(bgColor)
                ? palette.base.black
                : palette.base.white,
              textAlign: "right",
              width: "90px",
            }}
          >
            Subtotal {`(${currency})`}
          </Text>
        </View>

        {invDetails?.invoiceItem?.map((data: any, index: number) => (
          <>
            {data.name == "" ? null : (
              <>
                <View
                  wrap={false}
                  key={data.id}
                  style={{
                    marginLeft: "10px",
                    marginRight: "0px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          width: "170px",
                          fontSize: "14px",
                          fontWeight: "extrabold",
                          marginRight: "17px",
                          textAlign: "left",
                        }}
                      >
                        {data.name}
                      </Text>
                    </View>
                    <Text
                      style={{
                        width: "55px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAlign: "left",
                        color: "#4B5565",
                      }}
                    >
                      {data?.quantity}
                    </Text>
                    <Text
                      style={{
                        width: "50px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        marginLeft: "12px",
                        textAlign: "left",
                        color: "#4B5565",
                      }}
                    >
                      {data?.rate}
                    </Text>
                    {tax && Summary?.taxAmount > 0 ? (
                      <Text
                        style={{
                          width: "50px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          marginLeft: "30px",
                          textAlign: "left",
                          color: "#4B5565",
                        }}
                      >
                        {data?.tax} %
                      </Text>
                    ) : (
                      <Text
                        style={{
                          width: "50px",
                          fontSize: "10px",
                          fontWeight: "bold",
                          marginLeft: "30px",
                          textAlign: "left",
                        }}
                      ></Text>
                    )}

                    <Text
                      style={{
                        width: "79px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        marginLeft: "33px",
                        textAlign: "right",
                        color: "#4B5565",
                        marginRight: "7px",
                      }}
                    >
                      {(tax
                        ? data?.subTotal
                        : data?.subTotal - data?.taxAmount
                      ).toFixed(2)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: "12px",
                      marginTop: "8px",
                      color: "#4B5565",
                    }}
                  >
                    {data.description}
                  </Text>
                </View>
                <View
                  style={{
                    borderBottom: "1px solid #E0E0E0",
                    height: "1px",
                    width: "96.8%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              </>
            )}
          </>
        ))}

        {/* section 5 : summary, terms */}
        <View
          wrap={false}
          style={{
            marginTop: "32px",
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
            ></View>
          </View>
          {/* summary */}
          <View
            style={{
              width: "240px",
              border: "1px solid #E3E8EF",
              flexGrow: 1,
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <View
              style={{
                height: "32px",
                backgroundColor: bgColor === "#fffff" ? "white" : bgColor,
                borderRadius: "2px",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                gap: 30,
                borderBottom: isNearWhite(bgColor)
                  ? `1px solid ${palette.color.gray[200]}`
                  : "none",
              }}
            >
              <Text
                style={{
                  fontSize: "12px",
                  marginLeft: "65px",
                  fontWeight: 600,
                  color: isNearWhite(bgColor)
                    ? palette.base.black
                    : palette.base.white,
                }}
              >
                Invoice Summary
              </Text>
            </View>
            {/* summary desc */}
            <View
              style={{
                display: "flex",
                height: "44px",
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottom: "1px solid #E3E8EF",
                alignItems: "center",
                margin: "0px",
                padding: "0px",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              <Text style={{ fontSize: "12px", color: "#4B5565" }}>
                Subtotal
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: "12px" }}>
                  {" "}
                  {summarySubTotal + " "}
                </Text>
                <Text style={{ fontSize: "12px", color: "#000000" }}>
                  {currencyText}
                </Text>
              </View>
            </View>
            {tax && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: "44px",
                  borderBottom: "1px solid #E3E8EF",
                  alignItems: "center",
                  margin: "0px",
                  padding: "0px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
              >
                <Text style={{ fontSize: "12px", color: "#4B5565" }}>Tax</Text>
                <Text style={{ fontSize: "12px", color: "#000000" }}>
                  {Summary?.taxAmount > 0
                    ? Summary?.taxAmount.toFixed(2) + " " + currencyText
                    : "--"}
                </Text>
              </View>
            )}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                height: "44px",
                alignItems: "center",
                margin: "0px",
                padding: "0px ",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              <Text style={{ fontSize: "12px", color: "#4B5565" }}>Total</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: "12px" }}>
                  {" "}
                  {(tax
                    ? Summary?.total
                    : Summary?.total - Summary?.taxAmount
                  ).toFixed(2)}
                </Text>
                <Text style={{ fontSize: "12px", color: "#000000" }}>
                  {" " + currencyText}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {invDetails?.addtionalNotes && (
          <View style={{ padding: "5px 15px", marginTop: "10px" }}>
            <Text
              style={{
                fontSize: "14px",
                color: "#000",
                margin: "0px",
                padding: "0px",
              }}
            >
              Terms & Conditions:
            </Text>

            <Text
              style={{
                fontSize: "12px",
                color: "#444444",
                margin: "0px",
                padding: "0px",
                marginTop: "5px",
              }}
            >
              {invDetails?.addtionalNotes}
            </Text>
          </View>
        )}
        {/* secion 6 : footer */}

        <View
          style={{
            marginTop: "1px",
            left: 0,
            right: 0,
            position: "absolute",
            bottom: "0px",
            paddingBottom: "30px",
          }}
          fixed
        >
          <View
            style={{
              marginLeft: "0px",
              marginRight: "0px",
              display: "flex",
              flexDirection: "row",

              alignItems: "center",
            }}
          >
            <Text
              style={{
                width: "100%",
                fontSize: "12px",
                color: "#4B5565",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Powered by ZeeInvoices
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfView;
