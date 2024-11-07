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
import { Avatar, CircularProgress, Stack } from "@mui/material";
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
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setFullInvoice } from "@/redux/features/invoiceSlice";
import { setInvoiceSettings } from "@/redux/features/invoiceSetting";
import { useSession } from "next-auth/react";
import {
  getInvoiceItem,
  getDueDate as date,
} from "@/redux/features/invoiceSlice";
import EnhancedTableHead from "@/components/AllInvoices/enhancedTableHead";
import CustomPopOver from "@/components/AllInvoices/CustomPopOver";
import InvoiceDetailsSection from "@/components/InvoiceDetailsSection/invoiceDetailsSection";
import { Pagination } from "@/components/Pagination";
import DeleteModal from "@/components/Modals/DeleteModal/deleteModal";
import ShareModal from "@/components/Modals/ShareModal/shareModal";
import EnhancedTableToolbar from "@/components/AllInvoices/enhancedTableToolbar";
import "@/Styles/sectionStyle.css";

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

export default function SendersInvoices() {
  const allInvoiceItems = useSelector(getInvoiceItem);
  const { id } = useParams();
  const route = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const invoiceDetail = useSelector((state: any) => state.invoice);
  const invoiceSetting = useSelector((state: any) => state.invoiceSetting);
  const componentRef = React.useRef();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [shareModel, setShareModel] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState(0);
  const [showText, setShowText] = React.useState(false);
  // Delete modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<null | number>(null);
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
  } = useFetchAllDocument(`${backendURL}/invoices/by-sender/${id}`);

  // Get Total Amount And Tax . for down load pdf
  const [total, setTotal] = React.useState(0);
  const [discountAmount, setDiscountAmount] = React.useState(0);
  const [taxAmount, setTaxAmount] = React.useState(0);
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

  React.useEffect(() => {
    if (session?.accessToken) refetchInvoiceList();

    const timer = setTimeout(() => {
      setShowText(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [refetchInvoiceList, search, session?.accessToken]);

  const filteredData = React.useMemo(() => {
    if (invoiceList && invoiceList?.invoices?.length) {
      return invoiceList?.invoices;
    } else {
      return [];
    }
  }, [invoiceList]);

  React.useEffect(() => {
    if (session?.accessToken) refetchInvoiceList();

    if (deleteSuccess) {
      setIsModalOpen(false);
      // If the current page is greater than 1 and there are no more invoices on the current page
      if (page > 1 && filteredData.length === 0) {
        setPage(page - 1); // Navigate to the previous page
      }
    }
  }, [
    refetchInvoiceList,
    deleteSuccess,
    page,
    session?.accessToken,
    filteredData.length,
  ]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDelete = () => {
    setIsModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsModalOpen(false);
  };
  const handleViewInvoice = (id: number) => {
    route.push(`/invoices/${id}`);
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
      })
    );
    dispatch(
      setInvoiceSettings({
        colors: record?.settings.colors,
        color: record?.settings.color,
        currency: record?.settings.currency,
        dueDate: record?.settings.dueDate,
        discount: record?.settings.discount,
        tax: record?.settings.tax,
        terms: record?.settings.terms,
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
      })
    );
    dispatch(
      setInvoiceSettings({
        color: record?.settings?.color,
        currency: record?.settings?.currency,
        dueDate: record?.settings?.dueDate,
        discount: record?.settings?.discount,
        tax: record?.settings?.tax,
        terms: record?.settings?.terms,
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
    deleteInvoice({ apiRoute: `${backendURL}/invoices/${itemToDelete}` });
  };

  return (
    <>
      <Box
        sx={{
          minHeight: { xl: "53vh", lg: "73vh" },
          width: "100%",
          marginTop: "15px",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #EAECF0",
            boxShadow: `0px 1px 2px 0px #1018280D`,
          }}
        >
          <EnhancedTableToolbar
            numSelected={0}
            search={search}
            handleChangeSearch={handleChangeSearch}
            type={2}
          />
          {filteredData.length > 0 ? (
            <>
              <TableContainer
                sx={{
                  border: `1px solid ${palette.border.invoicesBorderColor}`,
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",

                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
              >
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                  <EnhancedTableHead
                    numSelected={0}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={invoiceList?.invoices?.length}
                    type={2}
                  />
                  <TableBody>
                    {filteredData?.map((row: any, index: number) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row?.id}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            className="tableCell"
                            sx={{ paddingLeft: "20px" }}
                          >
                            <Typography
                              variant="text-sm-medium"
                              sx={{ color: palette.color.gray[130] }}
                            >
                              {row?.id}
                            </Typography>
                          </TableCell>
                          <TableCell align="left" className="tableCell">
                            <Stack
                              direction={"row"}
                              gap={1}
                              sx={{ alignItems: "center" }}
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
                                {row?.toDetails?.name?.charAt(0).toUpperCase()}
                              </Avatar>
                              <Stack direction={"column"}>
                                <Typography
                                  variant="text-sm-medium"
                                  sx={{ color: palette.color.gray[130] }}
                                >
                                  {row?.to?.name || row?.toDetails?.name}
                                </Typography>
                              </Stack>
                            </Stack>
                          </TableCell>
                          <TableCell align="left" className="tableCell">
                            <Typography
                              variant="text-sm-medium"
                              sx={{ color: palette.color.gray[130] }}
                            >
                              {row?.to?.email || row?.toDetails?.email}
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{ paddingLeft: "17px" }}
                            className="tableCell"
                          >
                            <Typography
                              variant="text-sm-regular"
                              sx={{ color: palette.color.gray[130] }}
                            >
                              {tableFormatDate(row?.invoiceDate)}
                            </Typography>
                          </TableCell>
                          <TableCell align="left" className="tableCell">
                            <Typography
                              variant="text-sm-medium"
                              sx={{ color: palette.color.gray[130] }}
                            >
                              {row?.settings?.currency == "USD"
                                ? "$"
                                : row?.settings?.currency}{" "}
                              {calculateAmount(row?.items)?.toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell align="left" className="tableCell">
                            <CustomPopOver
                              handleOpenDeleteModal={handleOpenDeleteModal}
                              record={row}
                              handleViewInvoice={handleViewInvoice}
                              handleEditInvoice={handleEditInvoice}
                              handleShareInvoice={handleShareInvoice}
                              handlePrintInvoice={handlePrintInvoice}
                              componentRef={componentRef}
                              InvSetting={{ ...invoiceSetting }}
                              InvDetails={{ ...invoiceDetail }}
                              summaryDetail={summaryDetail}
                            />
                            <Box>
                              <Box style={{ display: "none" }}>
                                <Box ref={componentRef}>
                                  <InvoiceDetailsSection
                                    singleInvoice={{ ...invoiceDetail }}
                                    invoiceSetting={{ ...invoiceSetting }}
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
                  invoiceList?.totalRecords ? invoiceList?.totalRecords : 0
                }
                itemsPerPage={rowsPerPage}
                page={page}
                setPage={setPage}
              />
            </>
          ) : filteredData.length <= 0 && showText ? (
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
                height: "200px",
              }}
            >
              <CircularProgress size={24} sx={{ color: "#8477DA" }} />
            </Box>
          )}
        </Paper>
        <Box sx={{ height: 20 }}></Box>
        <DeleteModal
          open={isModalOpen}
          onDelete={handleDelete}
          onClose={handleDeleteModalClose}
          deleteLoading={deleteInvoiceLoading}
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
    </>
  );
}
