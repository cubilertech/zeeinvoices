"use client";
import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
// import { logoImg } from "../../../public/Images/logos/zee-logo.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: "10px 30px",
    gap: 5,
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
  // top_view_2_title: {
  //   fontSize: 12,
  //   fontWeight: 900,
  // },
  top_view_2_value: {
    fontSize: 12,
  },
  title_logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 15,
  },
  // logo2: {
  //   width: 125,
  //   height: 150,
  // },
  // title: {
  //   color: "#000",
  //   fontSize: "20px",
  //   fontWeight: "bold",
  // },
});

// Create Document Component
const PdfView = () => {
  const [isClient, setIsClient] = useState(false);

  const bgColor = "#3f4de1";
  const dueDate = true;
  const tax = true;
  const currency = "USD";

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <PDFViewer style={{ width: "100%", height: "76vh", marginTop: "50px" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/** Section 1 : logo, invoice type */}
          <View style={styles.section_top}>
            <View style={styles.title_logo}>
              <Image
                style={styles.logo}
                src={"/Images/logos/zee-logo.png"}
                alt="zee logo"
              />
            </View>
            <View style={styles.top_view_2}>
              <View style={styles.top_view_2_container}>
                <Text style={{ fontWeight: "extrabold", fontSize: "10px" }}>
                  Invoice No:
                </Text>
                <Text style={styles.top_view_2_value}> {"  "}001</Text>
              </View>
              <View style={styles.top_view_2_container}>
                <Text style={{ fontWeight: "extrabold", fontSize: "10px" }}>
                  Invoice Type:
                </Text>
                <Text style={styles.top_view_2_value}> Bill</Text>
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
                padding: "10px 10px",
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
                  ZAPTA Technologies
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: "12px", color: "#444444" }}>
                  Ather Raza
                </Text>
                <Text style={{ fontSize: "12px", color: "#444444" }}>
                  240 FF, Dha Phase 4, Lahore, 54792
                </Text>
                <Text style={{ fontSize: "12px", color: "#444444" }}>
                  Pakistan
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: "12px", color: "#444444" }}>
                  ather.raza28@gmail.com
                </Text>
                <Text style={{ fontSize: "12px", color: "#444444" }}>
                  03215399275
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
                padding: "10px 10px",
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
                  ABC Company
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: "12px", color: "#444444" }}>
                  Client Name
                </Text>
                <Text style={{ fontSize: "12px", color: "#444444" }}>
                  240 FF, Dha Phase 4, Lahore, 54792
                </Text>
                <Text style={{ fontSize: "12px", color: "#444444" }}>
                  Pakistan
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: "12px", color: "#444444" }}>
                  example@gmail.com
                </Text>
                <Text style={{ fontSize: "12px", color: "#444444" }}>
                  +92100022124
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
                Invoice Date:{" "}
              </Text>
              <Text style={{ fontSize: "12px", color: "#4F4F4F" }}>
                12-Sep-24
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
                  Due Date:{" "}
                </Text>
                <Text style={{ fontSize: "12px", color: "#4F4F4F" }}>
                  12-Sep-24
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
              gap: 40,
            }}
          >
            <Text
              style={{
                width: "250px",
                fontSize: "10px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Items
            </Text>
            <Text
              style={{ fontSize: "10px", fontWeight: "bold", color: "white" }}
            >
              QTY/HRS
            </Text>
            <Text
              style={{
                width: "40px",
                fontSize: "10px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Rate
            </Text>
            <Text
              style={{ fontSize: "10px", fontWeight: "bold", color: "white" }}
            >
              Subtotal
            </Text>
          </View>
          {/* item row */}
          <View
            style={{
              marginLeft: "7px",
              marginRight: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderBottom: "1px solid #E0E0E0",
              padding: "5px 10px",
              gap: 3,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 46,
              }}
            >
              <Text style={{ width: "265px", fontSize: "12px" }}>
                Item name
              </Text>
              <Text
                style={{ width: "20px", fontSize: "10px", fontWeight: "bold" }}
              >
                10
              </Text>
              <Text
                style={{ width: "40px", fontSize: "10px", fontWeight: "bold" }}
              >
                $4.0
              </Text>
              <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                $224.0
              </Text>
            </View>
            <Text style={{ fontSize: "10px", color: "#444444" }}>
              Description Description Description Description Description
            </Text>
          </View>

          <View
            style={{
              marginLeft: "7px",
              marginRight: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderBottom: "1px solid #E0E0E0",
              padding: "5px 10px",
              gap: 3,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 46,
              }}
            >
              <Text style={{ width: "265px", fontSize: "12px" }}>
                Item name
              </Text>
              <Text
                style={{ width: "20px", fontSize: "10px", fontWeight: "bold" }}
              >
                10
              </Text>
              <Text
                style={{ width: "40px", fontSize: "10px", fontWeight: "bold" }}
              >
                $4.0
              </Text>
              <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                $224.0
              </Text>
            </View>
            <Text style={{ fontSize: "10px", color: "#444444" }}>
              Description Description Description Description Description
            </Text>
          </View>
          

          <Text
            style={{ fontSize: "10px", color: "#444444", padding: "5px 15px" }}
          >
            Note: Note Note Note NoteNote v Note Note Note Note Note
            NoteNotednbj jdbdj ndjfn
          </Text>
          {/* section 5 : summary, terms */}

          <View
            style={{
              // backgroundColor:'blue',
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
                <Text style={{ fontSize: "12px" }}>Terms</Text>
                <Text style={{ fontSize: "10px", color: "#444444" }}>
                  Terms description description description description description description description
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
                  backgroundColor: "#3f4de1",
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
                    {currency}
                  </Text>
                  <Text style={{ fontSize: "12px" }}>{" "}100.00</Text>
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
                  <Text style={{ fontSize: "12px", color: "#767676" }}>
                    Tax
                  </Text>
                  <Text style={{ fontSize: "12px" }}>--</Text>
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
                <Text style={{ fontSize: "12px", color: "#767676" }}>
                  Total
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: "12px", color: "#4F4F4F" }}>
                    {currency}
                  </Text>
                  <Text style={{ fontSize: "12px" }}>{" "}300.00</Text>
                </View>
              </View>
            </View>
          </View>
          {/* secion 6 : footer */}
          <View
            style={{
              marginLeft: "45px",
              marginRight: "45px",
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
              style={{ fontSize: "9px", color: "#5E5E62", margin: "0px auto" }}
            >
              © 2022 ZAPTA Technologies, All Rights Reserved
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfView;
