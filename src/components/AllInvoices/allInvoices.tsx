"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { palette } from "@/theme/palette";
import {
  Avatar,
  Button,
  ButtonBase,
  Checkbox,
  CircularProgress,
  Container,
  IconButton,
  Link,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Pagination } from "../Pagination";
import { backendURL } from "@/utils/constants";
import {
  useDeleteDocument,
  useFetchAllDocument,
} from "@/utils/ApiHooks/common";
import {
  calculateAmount,
  calculateDiscount,
  calculateTax,
  tableFormatDate,
} from "@/common/common";
import { useRouter } from "next/navigation";
import CustomPopOver from "./CustomPopOver";
import { useDispatch, useSelector } from "react-redux";
import { setFullInvoice, setResetInvoice } from "@/redux/features/invoiceSlice";
import {
  setInvoiceSettings,
  setResetInvoiceSetting,
} from "@/redux/features/invoiceSetting";
import InvoiceDetailsSection from "../InvoiceDetailsSection/invoiceDetailsSection";
import { useSession } from "next-auth/react";
import EnhancedTableToolbar from "./enhancedTableToolbar";
import EnhancedTableHead from "./enhancedTableHead";
import { CreateFirstInvoice } from "@/appPages/CreateFirstInvoice";
import "../../Styles/tableItemRow.css";
import {
  getInvoiceItem,
  getDueDate as date,
} from "@/redux/features/invoiceSlice";
import "@/Styles/sectionStyle.css";
import { Icon } from "../Icon";
import { pdf } from "@react-pdf/renderer";
import PdfView from "@/appPages/PdfView/pdfView";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteModal from "../Modals/DeleteModal/deleteModal";
import ShareModal from "../Modals/ShareModal/shareModal";

interface Data {
  id: number;
  name: string;
  email: string;
  date: string;
  status: string;
  total: number;
  action: any;
}

type Order = "asc" | "desc";

export default function AllInvoices() {
  const allInvoiceItems = useSelector(getInvoiceItem);

  const route = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const invoiceDetail = useSelector((state: any) => state.invoice);
  const invoiceSetting = useSelector((state: any) => state.invoiceSetting);
  const componentRef = React.useRef();
  const apiRoute = `${backendURL}/invoices`;
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [shareModel, setShareModel] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState(0);
  const [isPopover, setIsPopover] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [total, setTotal] = React.useState(0);
  const [discountAmount, setDiscountAmount] = React.useState(0);
  const [taxAmount, setTaxAmount] = React.useState(0);

  const {
    mutate: deleteInvoice,
    isLoading: deleteInvoiceLoading,
    isSuccess: deleteSuccess,
  } = useDeleteDocument();
  const {
    data: invoiceList,
    refetch: refetchInvoiceList,
    isFetching: fetchingInvoiceList,
    isFetched: invoiceFetched,
    isLoading: isInvoiceLoading,
  } = useFetchAllDocument(apiRoute, page, rowsPerPage, search);

  // Get Total Amount And Tax . for down load pdf

  React.useEffect(() => {
    const totalAmount = calculateAmount(allInvoiceItems);
    const totalDiscount = calculateDiscount(allInvoiceItems);
    const totalTax = calculateTax(allInvoiceItems);
    setTotal(totalAmount);
    setDiscountAmount(totalDiscount);
    setTaxAmount(totalTax);
  }, [allInvoiceItems]);
  const summaryDetail = {
    total: total,
    taxAmount: taxAmount,
    discountAmount: discountAmount,
  };

  const handleChangeSearch = (e: any) => {
    setPage(1);
    setSearch(e.target.value);
    setTimeout(() => {
      if (page === 1) {
        refetchInvoiceList();
      } else {
        setPage(1);
      }
    }, 800);
  };

  const filteredData = React.useMemo(() => {
    if (invoiceList && invoiceList?.invoices?.length) {
      return invoiceList?.invoices;
    } else {
      return [];
    }
  }, [invoiceList]);

  React.useEffect(() => {
    if (session?.accessToken) {
      setSelected([]);
      refetchInvoiceList();
    }

    if (deleteSuccess) {
      setPage(1);
      setIsModalOpen(false);
    }
  }, [refetchInvoiceList, deleteSuccess, page, session?.accessToken]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Delete modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<null | number>(null);

  const handleDelete = () => {
    setIsModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsModalOpen(false);
  };
  const handleViewInvoice = (id: number) => {
    route.push(`/invoices/${id}`);
  };

  const PDFPreview = async (record: any) => {
    const details = {
      id: record?.id,
      logo: record?.image,
      invoiceType: record?.type,
      from: {
        ...record?.fromDetails,
        phoneNumber: record?.fromDetails?.phone_number,
        companyName: record?.fromDetails?.company_name,
      },
      to: {
        ...record?.toDetails,
        phoneNumber: record?.toDetails?.phone_number,
        companyName: record?.toDetails?.company_name,
      },
      invoiceDate: record?.invoiceDate,
      dueDate: record?.dueDate,
      addtionalNotes: record?.notes,
      invoiceItem: record?.items,
      signature: {
        image: record?.signature?.image,
        designation: record?.signature?.designation,
      },
    };

    const settings = {
      colors: record?.settings.colors,
      color: record?.settings?.color,
      currency: record?.settings?.currency,
      dueDate: record?.settings?.dueDate,
      discount: record?.settings?.discount,
      tax: record?.settings?.tax,
      terms: record?.settings?.terms,
      watermarkText: record?.settings?.watermarkText,
      detail: record?.settings?.detail,
    };

    const itemDetail = details?.invoiceItem;
    const totalAmount = calculateAmount(record?.items);
    const totalDiscount = calculateDiscount(record?.items);
    const totalTax = calculateTax(record?.items);

    const summary = {
      total: totalAmount,
      taxAmount: totalTax,
      discountAmount: totalDiscount,
    };

    if (summary && settings && details && itemDetail) {
      const doc = (
        <PdfView
          invSetting={{ ...settings }}
          invDetails={{ ...details }}
          Summary={summary}
          user={session?.user}
          itemDetail={itemDetail}
        />
      );

      // Generate the PDF as a blob
      const blobPdf = await pdf(doc);
      blobPdf.updateContainer(doc);
      const result = await blobPdf.toBlob();

      // Create a blob URL from the generated PDF blob
      const blobUrl = URL.createObjectURL(result);

      // Open the blob URL in a new tab
      window.open(blobUrl, "_blank");

      // const newWindow = window.open();
      // if (newWindow) {
      //   newWindow.document.write(
      //     `<iframe src="${blobUrl}" style="width:100%; height:100%;" frameborder="0"></iframe>`
      //   );
      // }
    }
  };

  //Edit Invoice
  const handleEditInvoice = (record: any) => {
    dispatch(
      setFullInvoice({
        id: record?.id,
        logo: record?.image,
        invoiceType: record?.type,
        from: {
          ...record?.fromDetails,
          phoneNumber: record?.fromDetails?.phone_number,
          companyName: record?.fromDetails?.company_name,
        },
        to: {
          ...record?.toDetails,
          phoneNumber: record?.toDetails?.phone_number,
          companyName: record?.toDetails?.company_name,
        },
        invoiceDate: record?.invoiceDate,
        dueDate: record?.dueDate,
        addtionalNotes: record?.notes,
        invoiceItem: record?.items,
        signature: {
          image: record?.signature?.image,
          designation: record?.signature?.designation,
        },
      })
    );
    dispatch(
      setInvoiceSettings({
        colors: record?.settings.colors,
        color: record?.settings.color,
        currency: record?.settings.currency,
        watermarkText: record?.settings.watermarkText,
        dueDate: record?.settings.dueDate,
        discount: record?.settings.discount,
        signature: record?.settings?.signature,
        tax: record?.settings.tax,
        terms: record?.settings.terms,
        watermark: record?.settings.watermark,
        detail: record?.settings.detail,
      })
    );
    route.push(`/invoices/${record._id}/edit`);
  };
  //Share Invoice
  const handleShareInvoice = (record: any) => {
    setShareUrl(record.id);
    setShareModel(true);
  };
  //Print Invoice
  const handlePrintInvoice = (record: any): Promise<void> => {
    dispatch(
      setFullInvoice({
        id: record?.id,
        logo: record?.image,
        invoiceType: record?.type,
        from: {
          ...record?.fromDetails,
          phoneNumber: record?.fromDetails?.phone_number,
          companyName: record?.fromDetails?.company_name,
        },
        to: {
          ...record?.toDetails,
          phoneNumber: record?.toDetails?.phone_number,
          companyName: record?.toDetails?.company_name,
        },
        invoiceDate: record?.invoiceDate,
        dueDate: record?.dueDate,
        addtionalNotes: record?.notes,
        invoiceItem: record?.items,
        signature: {
          image: record?.signature?.image,
          designation: record?.signature?.designation,
        },
      })
    );
    dispatch(
      setInvoiceSettings({
        color: record?.settings?.color,
        currency: record?.settings?.currency,
        watermarkText: record?.settings.watermarkText,
        dueDate: record?.settings?.dueDate,
        discount: record?.settings?.discount,
        signature: record?.settings?.signature,
        tax: record?.settings?.tax,
        terms: record?.settings?.terms,
        watermark: record?.settings.watermark,
        detail: record?.settings?.detail,
      })
    );
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 50);
    });
  };
  const handleOpenDeleteModal = (id: number) => {
    setItemToDelete(id as number);
    setIsModalOpen(true);
  };
  //Delete Invoice Item
  const invoiceDelete = () => {
    deleteInvoice({
      apiRoute: `${backendURL}/invoices/${itemToDelete}`,
      title: "Invoice Deleted",
    });
  };

  const handleHomeBtn = () => {
    dispatch(setResetInvoiceSetting());
    dispatch(setResetInvoice());
    route.push("/create-new-invoice");
  };

  const handleDownloadClick = () => {
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredData.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // console.log(selected, "sel");

  return (
    <>
      <Box sx={{ width: "100%", backgroundColor: palette.base.white }}>
        <Container
          className="mainContainer"
          sx={{
            px: { md: "0.1%", lg: "0.1%", xs: "3%" },
            minHeight: { xl: "53vh", lg: "73vh" },
          }}
        >
          {!isInvoiceLoading && invoiceList?.total === 0 && search === "" ? (
            <Box sx={{ pt: { sm: 0, xs: 5 } }}>
              <CreateFirstInvoice />
            </Box>
          ) : (
            <Box
              sx={{
                minHeight: { xl: "53vh", lg: "73vh" },
                width: "100%",
                marginTop: "57px",
                pt: "40px",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  border: "none",
                }}
              >
                {!isMobile && (
                  <Stack
                    direction={"row"}
                    gap={1.5}
                    sx={{ alignItems: "center", mb: "24px" }}
                  >
                    <IconButton
                      size="small"
                      sx={{ p: "0px !important" }}
                      onClick={handleHomeBtn}
                    >
                      <Icon icon="homeIcon" width={20} height={20} />
                    </IconButton>
                    <Icon icon="rightArrowIcon" width={16} height={16} />
                    <ButtonBase>
                      <Link
                        sx={{
                          textDecoration: "none",
                          minWidth: "60px !important",
                          height: "20px !important",
                          color: palette.primary.main,
                          fontSize: {
                            md: "14px !important",
                            xs: "14px !important",
                          },
                          lineHeight: {
                            md: "20px !important",
                            xs: "20px !important",
                          },
                          fontWeight: 600,
                        }}
                      >
                        Invoices
                      </Link>
                    </ButtonBase>
                  </Stack>
                )}

                <EnhancedTableToolbar
                  numSelected={selected.length}
                  search={search}
                  handleChangeSearch={handleChangeSearch}
                  filteredData={filteredData}
                  selected={selected}
                  handleDownloadClick={handleDownloadClick}
                />

                {/* <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                    mt: "8px",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleDownloadInvoices(filteredData)}
                    sx={{ borderRadius: "4px", width: "157px", height: "44px" }}
                  >
                    <FileDownloadOutlinedIcon
                      sx={{ color: palette.primary.main }}
                    />
                    Download
                  </Button>
                </Box> */}

                {filteredData.length > 0 ? (
                  <>
                    {fetchingInvoiceList ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "20px",
                          alignItems: "center",
                          height: "400px",
                        }}
                      >
                        <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                      </Box>
                    ) : (
                      <>
                        <TableContainer
                          sx={{
                            position: "relative",
                            mt: "32px",
                            border: `1px solid ${palette.color.gray[200]}`,
                            borderTopLeftRadius: "8px",
                            borderTopRightRadius: "8px",
                            borderBottomLeftRadius: "8px",
                            borderBottomRightRadius: "8px",
                            opacity: fetchingInvoiceList ? 0.5 : 1,
                          }}
                        >
                          <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                          >
                            <EnhancedTableHead
                              numSelected={selected.length}
                              order={order}
                              orderBy={orderBy}
                              onSelectAllClick={handleSelectAllClick}
                              onRequestSort={handleRequestSort}
                              rowCount={invoiceList?.invoices?.length}
                            />

                            <TableBody>
                              {filteredData?.map((row: any, index: number) => {
                                const isItemSelected = selected.includes(
                                  row.id
                                );
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                  <TableRow
                                    hover
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row?.id}
                                    selected={isItemSelected}
                                    sx={{
                                      cursor: "pointer",
                                      borderColor: palette.color.gray[200],
                                    }}
                                  >
                                    <TableCell
                                      padding="checkbox"
                                      onClick={(event) =>
                                        handleClick(event, row.id)
                                      }
                                    >
                                      <Checkbox
                                        color="primary"
                                        checked={isItemSelected}
                                        inputProps={{
                                          "aria-labelledby": labelId,
                                        }}
                                        sx={{
                                          "& .MuiSvgIcon-root": {
                                            fill: "#D1D5DB",
                                            backgroundColor: "transparent",
                                            borderRadius: "4px",
                                          },
                                          "&.Mui-checked .MuiSvgIcon-root": {
                                            fill: palette.primary.main,
                                          },
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell
                                      component="th"
                                      id={labelId}
                                      scope="row"
                                      padding="none"
                                      className="tableCell"
                                      align="left"
                                      sx={{ py: "8px", px: "16px" }}
                                      onClick={() => {
                                        if (!isPopover) {
                                          // handleViewInvoice(row?.id);
                                          // handleRowClick(row);
                                          PDFPreview(row);
                                        }
                                      }}
                                    >
                                      <Typography
                                        variant="text-sm-medium"
                                        sx={{
                                          color: palette.color.gray[900],
                                          fontSize: {
                                            md: "14px !important",
                                            xs: "14px !important",
                                          },
                                          lineHeight: {
                                            md: "20px !important",
                                            xs: "20px !important",
                                          },
                                          fontWeight: 500,
                                        }}
                                      >
                                        {row?.id}
                                      </Typography>
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      className="tableCell"
                                      sx={{ py: "8px", px: "16px" }}
                                      onClick={() => {
                                        if (!isPopover) {
                                          // handleViewInvoice(row?.id);
                                          PDFPreview(row);
                                        }
                                      }}
                                    >
                                      <Stack
                                        direction={"row"}
                                        gap={1.5}
                                        sx={{
                                          alignItems: "center",
                                        }}
                                      >
                                        <Avatar
                                          sx={{
                                            bgcolor: palette.primary.main,
                                            width: "32px",
                                            height: "32px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                          }}
                                        >
                                          {row?.toDetails?.name
                                            ?.charAt(0)
                                            .toUpperCase()}
                                        </Avatar>
                                        <Stack direction={"column"}>
                                          <Typography
                                            variant="text-sm-medium"
                                            sx={{
                                              color: palette.color.gray[610],
                                              fontSize: {
                                                md: "14px !important",
                                                xs: "14px !important",
                                              },
                                              lineHeight: {
                                                md: "20px !important",
                                                xs: "20px !important",
                                              },
                                              fontWeight: 500,
                                            }}
                                          >
                                            {row?.to?.name ||
                                              row?.toDetails?.name}
                                          </Typography>
                                        </Stack>
                                      </Stack>
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      className="tableCell"
                                      sx={{ py: "8px", px: "16px" }}
                                      onClick={() => {
                                        if (!isPopover) {
                                          // handleViewInvoice(row?.id);
                                          PDFPreview(row);
                                        }
                                      }}
                                    >
                                      <Typography
                                        variant="text-sm-medium"
                                        sx={{
                                          color: palette.color.gray[610],
                                          fontSize: {
                                            md: "14px !important",
                                            xs: "14px !important",
                                          },
                                          lineHeight: {
                                            md: "20px !important",
                                            xs: "20px !important",
                                          },
                                          fontWeight: 400,
                                        }}
                                      >
                                        {row?.to?.email ||
                                          row?.toDetails?.email}
                                      </Typography>
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      className="tableCell"
                                      sx={{ py: "8px", px: "16px" }}
                                      onClick={() => {
                                        if (!isPopover) {
                                          // handleViewInvoice(row?.id);
                                          PDFPreview(row);
                                        }
                                      }}
                                    >
                                      <Typography
                                        variant="text-sm-regular"
                                        sx={{
                                          color: palette.color.gray[610],
                                          fontSize: {
                                            md: "14px !important",
                                            xs: "14px !important",
                                          },
                                          lineHeight: {
                                            md: "20px !important",
                                            xs: "20px !important",
                                          },
                                          fontWeight: 400,
                                        }}
                                      >
                                        {tableFormatDate(row?.invoiceDate)}
                                      </Typography>
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      className="tableCell"
                                      sx={{ py: "8px", px: "16px" }}
                                      onClick={() => {
                                        if (!isPopover) {
                                          // handleViewInvoice(row?.id);
                                          PDFPreview(row);
                                        }
                                      }}
                                    >
                                      <Typography
                                        variant="text-sm-medium"
                                        sx={{
                                          color: palette.color.gray[610],
                                          fontSize: {
                                            md: "14px !important",
                                            xs: "14px !important",
                                          },
                                          lineHeight: {
                                            md: "20px !important",
                                            xs: "20px !important",
                                          },
                                          fontWeight: 400,
                                        }}
                                      >
                                        {row?.settings?.currency == "USD"
                                          ? "$"
                                          : row?.settings?.currency}{" "}
                                        {row?.items
                                          ? calculateAmount(
                                              row?.items
                                            )?.toFixed(2)
                                          : 0}
                                      </Typography>
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      className="tableCell"
                                      sx={{ py: "8px", pl: "17px", pr: "16px" }}
                                    >
                                      <CustomPopOver
                                        handleOpenDeleteModal={
                                          handleOpenDeleteModal
                                        }
                                        record={row}
                                        handleViewInvoice={handleViewInvoice}
                                        handleEditInvoice={handleEditInvoice}
                                        handleShareInvoice={handleShareInvoice}
                                        handlePrintInvoice={handlePrintInvoice}
                                        componentRef={componentRef}
                                        InvSetting={{ ...invoiceSetting }}
                                        InvDetails={{ ...invoiceDetail }}
                                        summaryDetail={summaryDetail}
                                        isPopoverOpen={setIsPopover}
                                      />
                                      <Box>
                                        <Box style={{ display: "none" }}>
                                          <Box ref={componentRef}>
                                            <InvoiceDetailsSection
                                              singleInvoice={{
                                                ...invoiceDetail,
                                              }}
                                              invoiceSetting={{
                                                ...invoiceSetting,
                                              }}
                                            />
                                          </Box>
                                        </Box>
                                      </Box>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        <Pagination
                          totalRecords={
                            invoiceList?.totalRecords
                              ? invoiceList?.totalRecords
                              : 0
                          }
                          itemsPerPage={rowsPerPage}
                          page={page}
                          setPage={setPage}
                        />
                      </>
                    )}
                  </>
                ) : filteredData.length <= 0 && search !== "" ? (
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "300px",
                      color: palette.color.gray[60],
                    }}
                  >
                    No record found
                  </Typography>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "20px",
                      alignItems: "center",
                      height: "400px",
                    }}
                  >
                    <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                  </Box>
                )}
              </Paper>
              <Box sx={{ height: 40 }}></Box>
              <DeleteModal
                open={isModalOpen}
                deleteLoading={deleteInvoiceLoading}
                onDelete={handleDelete}
                onClose={handleDeleteModalClose}
                invoiceDelete={invoiceDelete}
                title="invoice"
              />
              <ShareModal
                open={shareModel}
                onShare={() => setShareModel(false)}
                onClose={() => setShareModel(false)}
                shareUrlId={shareUrl}
              />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}
