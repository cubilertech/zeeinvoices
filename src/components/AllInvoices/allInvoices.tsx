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
  Badge,
  CircularProgress,
  Container,
  Stack,
} from "@mui/material";
import { Pagination } from "../Pagination";
import { backendURL } from "@/utils/constants";
import {
  useDeleteDocument,
  useFetchAllDocument,
} from "@/utils/ApiHooks/common";
import {
  calculateAmount,
  calculateTax,
  tableFormatDate,
} from "@/common/common";
import { useRouter } from "next/navigation";
import DeleteModal from "../DeleteModal/deleteModal";
import CustomPopOver from "./CustomPopOver";
import { useDispatch, useSelector } from "react-redux";
import { setFullInvoice, setResetInvoice } from "@/redux/features/invoiceSlice";
import {
  setInvoiceSettings,
  setResetInvoiceSetting,
} from "@/redux/features/invoiceSetting";
import ShareModal from "../ShareModal/shareModal";
import InvoiceDetailsSection from "../InvoiceDetailsSection/invoiceDetailsSection";
import { debounce } from "@/utils/common";
import { useSession } from "next-auth/react";
import EnhancedTableToolbar from "./enhancedTableToolbar";
import EnhancedTableHead from "./enhancedTableHead";
import { CreateFirstInvoice } from "@/appPages/CreateFirstInvoice";
import "../../Styles/tableItemRow.css";
import {
  getInvoiceItem,
  getDueDate as date,
} from "@/redux/features/invoiceSlice";

interface Data {
  id: number;
  name: string;
  email: string;
  date: string;
  status: string;
  total: number;
  action: any;
}

function createData(
  id: number,
  name: string,
  email: string,
  date: string,
  status: string,
  total: number,
  action: any
): Data {
  return {
    id,
    name,
    email,
    date,
    status,
    total,
    action,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

// const headCells: readonly HeadCell[] = [
//   {
//     id: "id",
//     numeric: true,
//     disablePadding: true,
//     label: "Invoice #",
//   },
//   {
//     id: "name",
//     numeric: true,
//     disablePadding: false,
//     label: "Receipent",
//   },
//   {
//     id: "date",
//     numeric: true,
//     disablePadding: false,
//     label: "Created",
//   },
//   {
//     id: "status",
//     numeric: true,
//     disablePadding: false,
//     label: "Status",
//   },
//   {
//     id: "total",
//     numeric: true,
//     disablePadding: false,
//     label: "Total",
//   },
//   {
//     id: "action",
//     numeric: true,
//     disablePadding: false,
//     label: "Actions",
//   },
// ];

export default function AllInvoices() {
  const allInvoiceItems = useSelector(getInvoiceItem);
  // const invoiceDetail = useSelector((state: any) => state.invoice);
  // const invoiceSetting = useSelector((state: any) => state.invoiceSetting);
  // // Get Total Amount And Tax
  // const [total, setTotal] = useState(0);
  // const [taxAmount, setTaxAmount] = useState(0);
  // useEffect(() => {
  //   const totalAmount = calculateAmount(allInvoiceItems);
  //   const totalTax = calculateTax(allInvoiceItems);
  //   setTotal(totalAmount);
  //   setTaxAmount(totalTax);
  // }, [allInvoiceItems]);
  // const summaryDetail = {
  //   total: total,
  //   taxAmount: taxAmount,
  // };

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
  const [total, setTotal] = React.useState(0);
  const [taxAmount, setTaxAmount] = React.useState(0);
  React.useEffect(() => {
    const totalAmount = calculateAmount(allInvoiceItems);
    const totalTax = calculateTax(allInvoiceItems);
    setTotal(totalAmount);
    setTaxAmount(totalTax);
  }, [allInvoiceItems]);
  const summaryDetail = {
    total: total,
    taxAmount: taxAmount,
  };
  // React.useEffect(() => {
  //   if (session?.accessToken) refetchInvoiceList();
  //   if (deleteSuccess) {
  //     setIsModalOpen(false);
  //   }
  // }, [refetchInvoiceList, deleteSuccess, page, session?.accessToken]);

  // const debouncedRefetch = React.useCallback(
  //   debounce(() => {
  //     if (page === 1) {
  //       refetchInvoiceList();
  //     } else {
  //       setPage(1);
  //     }
  //   }, 500),
  //   [search]
  // );
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
    // debouncedRefetch();
  };

  React.useEffect(() => {
    if (session?.accessToken) refetchInvoiceList();
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
  const visibleRows = React.useMemo(
    () =>
      stableSort(invoiceList?.invoices, getComparator(order, orderBy))?.slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, invoiceList?.invoices]
  );

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
  //Edit Invoice
  const handleEditInvoice = (record: any) => {
    console.log(record, "record");
    dispatch(
      setFullInvoice({
        id: record?.id,
        logo: record?.image,
        invoiceType: record?.type,
        // from: record?.from,
        from: {
          ...record?.fromDetails,
          phoneNumber: record?.fromDetails?.phone_number,
          companyName: record?.fromDetails?.company_name,
        },
        // to: record?.to,
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
        color: record?.settings.color,
        currency: record?.settings.currency,
        dueDate: record?.settings.dueDate,
        tax: record?.settings.tax,
        detail: record?.settings.detail,
      })
    );
    route.push(`/invoices/${record.id}/edit`);
  };
  //Share Invoice
  const handleShareInvoice = (record: any) => {
    setShareUrl(record.id);
    setShareModel(true);
  };
  //Print Invoice
  const handlePrintInvoice = (record: any): Promise<void> => {
    console.log(record, "recordss");
    dispatch(
      setFullInvoice({
        id: record?.id,
        logo: record?.image,
        invoiceType: record?.type,
        // from: record?.from,
        from: {
          ...record?.fromDetails,
          phoneNumber: record?.fromDetails?.phone_number,
          companyName: record?.fromDetails?.company_name,
        },
        // to: record?.to,
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
        tax: record?.settings?.tax,
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
  console.log(invoiceList?.invoices, "invoices in all invoices");
  return (
    <>
      <hr />
      <Container
        maxWidth="lg"
        sx={{ px: { md: "0.1%", lg: "0.1%", xs: "3%" } }}
      >
        {!isInvoiceLoading &&
        invoiceList?.invoices?.length === 0 &&
        search === "" ? (
          <Box sx={{ pt: { sm: 0, xs: 5 } }}>
            {!fetchingInvoiceList && <CreateFirstInvoice />}
          </Box>
        ) : (
          <Box
            sx={{
              minHeight: { xl: "83vh", lg: "73vh" },
              width: "100%",
              marginTop: "65px",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                px: { sm: "20px", xs: "10px" },
                pb: 1,
                border: "none",
                borderRadius: "8px",
                boxShadow: `0px 0px 2px 0px #0000001A`,
              }}
            >
              <EnhancedTableToolbar
                numSelected={selected.length}
                search={search}
                handleChangeSearch={handleChangeSearch}
              />
              {filteredData.length > 0 ? (
                <>
                  <TableContainer
                    sx={{
                      border: `1px solid ${palette.border.invoicesBorderColor}`,
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  >
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={invoiceList?.invoices?.length}
                      />
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
                          <CircularProgress
                            size={24}
                            sx={{ color: "#8477DA" }}
                          />
                        </Box>
                      ) : (
                        <TableBody>
                          {filteredData?.map((row: any, index: number) => {
                            console.log(row, "row12");
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.id}
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
                                    {row.id}
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
                                      {row.toDetails?.name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                    </Avatar>
                                    <Stack direction={"column"}>
                                      <Typography
                                        variant="text-sm-medium"
                                        sx={{ color: palette.color.gray[130] }}
                                      >
                                        {row.to?.name || row.toDetails?.name}
                                      </Typography>
                                      {/* <Typography variant="text-xs-regular">
                        {row.to.email}
                      </Typography> */}
                                    </Stack>
                                  </Stack>
                                </TableCell>
                                <TableCell align="left" className="tableCell">
                                  <Typography variant="text-sm-medium">
                                    {row.to?.email || row.toDetails?.email}
                                  </Typography>
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{ paddingLeft: "17px" }}
                                  className="tableCell"
                                >
                                  <Typography variant="text-sm-regular">
                                    {tableFormatDate(row.invoiceDate)}
                                  </Typography>
                                </TableCell>
                                {/* <TableCell align="left">
                  <Badge
                    color="primary"
                    badgeContent={row.status}
                    sx={{
                      paddingLeft: "37px",
                      "& .MuiBadge-colorPrimary": {
                        background:
                          palette.color.badgeColors["pending-bg"],
                        color: palette.color.badgeColors.pending,
                      },
                    }}
                  ></Badge>
                </TableCell> */}

                                <TableCell align="left" className="tableCell">
                                  <Typography
                                    variant="text-sm-medium"
                                    sx={{ color: palette.color.gray[130] }}
                                  >
                                    {row.settings.currency == "USD"
                                      ? "$"
                                      : row.settings.currency}{" "}
                                    {calculateAmount(row.items).toFixed(2)}
                                  </Typography>
                                </TableCell>
                                <TableCell align="left" className="tableCell">
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
                      )}
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
              ) : (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "300px",
                    color: palette.color.gray[50],
                  }}
                >
                  No recode found
                </Typography>
              )}
            </Paper>
            <Box sx={{ height: 20 }}></Box>
            <DeleteModal
              open={isModalOpen}
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
    </>
  );
}
