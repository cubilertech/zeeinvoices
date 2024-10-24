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
  ButtonBase,
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
  useCreateDocument,
  useDeleteDocument,
  useEditDocument,
  useFetchAllDocument,
} from "@/utils/ApiHooks/common";
import { useRouter } from "next/navigation";
import DeleteModal from "../DeleteModal/deleteModal";
import ClientPopOver from "./ClientPopOver";
import { useDispatch } from "react-redux";

import ClientDetailModel from "./ClientDetailModel";
import { useSession } from "next-auth/react";
import EnhancedTableToolbar from "./enhancedTableToolbar";
import EnhancedTableHead from "./enhancedTableHead";
import { toast } from "react-toastify";
import "@/Styles/sectionStyle.css";
import { Icon } from "../Icon";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { setResetInvoice } from "@/redux/features/invoiceSlice";

interface Data {
  name: string;
  email: string;
  company: string;
  phone: string;
  city: string;
  state: string;
  address: string;
  action: any;
}
type Order = "asc" | "desc";
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}
const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "company",
    numeric: true,
    disablePadding: false,
    label: "Company Name",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "city",
    numeric: true,
    disablePadding: false,
    label: "City",
  },
  {
    id: "state",
    numeric: true,
    disablePadding: false,
    label: "State",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

export default function AllClients() {
  const route = useRouter();
  const dispatch = useDispatch();
  const apiRoute = `${backendURL}/clients`;
  const { data: session } = useSession();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [clientType, setClientType] = React.useState("add");
  const [clientModel, setClientModel] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [editId, setEditId] = React.useState<any | undefined>(undefined);
  const [isPopover, setIsPopover] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleClientAddModel = () => {
    setClientType("add");
    setClientModel(true);
    setEditId(undefined);
  };
  //Client List
  const {
    data: clientList,
    refetch: refetchClientList,
    isFetching: fetchingClientList,
    isLoading: isClientLoading,
    isFetched,
  } = useFetchAllDocument(apiRoute, page, rowsPerPage, search);
  //Delete Client
  const {
    mutate: deleteClient,
    isLoading: deleteClientLoading,
    isSuccess: deleteSuccess,
  } = useDeleteDocument();
  //Create Client
  const {
    mutateAsync: createClient,
    isLoading: createClientLoading,
    isSuccess: createClientSuccess,
  } = useCreateDocument(false);
  // Update Client
  const {
    mutateAsync: updateClient,
    isLoading: updateClientLoading,
    isSuccess: updateClientSuccess,
  } = useEditDocument(false);

  const filteredData = React.useMemo(() => {
    if (clientList && clientList?.clients?.length) {
      return clientList?.clients;
    } else {
      return [];
    }
  }, [clientList]);

  React.useEffect(() => {
    refetchClientList();
    if (deleteSuccess) {
      setPage(1);
      setIsModalOpen(false);
    }
  }, [refetchClientList, deleteSuccess, page, session?.accessToken]);
  const handleChangeSearch = (e: any) => {
    setSearch(e.target.value);
    setTimeout(() => {
      if (page === 1) {
        refetchClientList();
      } else {
        setPage(1);
      }
    }, 800);
  };
  React.useEffect(() => {
    if (isFetched) {
      setIsLoading(false);
    }
  }, [isFetched]);

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
  const handleSubmitForm = (values: any) => {
    const data = {
      name: values.name,
      company_name: values.companyName,
      email: values.email,
      phone_number: values.phoneNumber,
      city: values.city,
      state: values.state,
      address: values.address,
    };
    if (clientType === "add") {
      createClient({ apiRoute: `${backendURL}/clients/save`, data: data })
        .then((res) => {
          refetchClientList();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      try {
        updateClient({
          data: data,
          apiRoute: `${backendURL}/clients/${editId?._id}`,
        }).then((res) => {
          console.log("Updated");
          refetchClientList();
        });
      } catch (error) {
        throw new Error("Not Updated!");
      }
    }
  };
  const handleDeleteModalClose = () => {
    setIsModalOpen(false);
  };
  const handleViewClient = (id: number) => {
    route.push(`/clients/${id}`);
  };
  //Edit Invoice
  const handleEditClient = (record: any) => {
    setClientType("edit");
    setClientModel(true);
    setEditId(record);
  };
  const handleOpenDeleteModal = (id: number) => {
    setItemToDelete(id as number);
    setIsModalOpen(true);
  };
  const clientDelete = () => {
    deleteClient({ apiRoute: `${backendURL}/clients/${itemToDelete}` });
  };

  const handleHomeBtn = () => {
    dispatch(setResetInvoiceSetting());
    dispatch(setResetInvoice());
    route.push("/create-new-invoice");
  };

  return (
    <>
      <Box sx={{ width: "100%", backgroundColor: palette.base.white }}>
        <Container
          className="mainContainer"
          sx={{ px: { md: "0.1%", lg: "0.1%", xs: "3%" } }}
        >
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
                      Recipients
                    </Link>
                  </ButtonBase>
                </Stack>
              )}
              <EnhancedTableToolbar
                handleClientAddModel={handleClientAddModel}
                numSelected={selected.length}
                search={search}
                handleChangeSearch={handleChangeSearch}
              />
              {isLoading || isClientLoading ? (
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
              ) : filteredData.length > 0 ? (
                <>
                  {fetchingClientList ? (
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
                          mt: "32px",
                          border: `1px solid ${palette.color.gray[200]}`,
                          borderTopLeftRadius: "8px",
                          borderTopRightRadius: "8px",
                          borderBottomLeftRadius: "8px",
                          borderBottomRightRadius: "8px",
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
                            onRequestSort={handleRequestSort}
                            rowCount={clientList?.clients?.length}
                          />

                          <TableBody>
                            {filteredData?.map((row: any, index: number) => {
                              const labelId = `enhanced-table-checkbox-${index}`;
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={row.id}
                                  sx={{ cursor: "pointer", zIndex: 0 }}
                                >
                                  <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                    className="tableCell"
                                    sx={{ py: "8px", px: "16px" }}
                                    onClick={() => {
                                      if (!isPopover) {
                                        handleViewClient(row._id);
                                      }
                                    }}
                                  >
                                    <Typography
                                      variant="text-sm-regular"
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
                                      {row?.name}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="tableCell"
                                    sx={{ py: "8px", px: "16px" }}
                                    onClick={() => {
                                      if (!isPopover) {
                                        handleViewClient(row._id);
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
                                      {row?.email}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="tableCell"
                                    sx={{ py: "8px", px: "16px" }}
                                    onClick={() => {
                                      if (!isPopover) {
                                        handleViewClient(row._id);
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
                                      {row?.company_name != ""
                                        ? row?.company_name
                                        : "---"}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="tableCell"
                                    sx={{ py: "8px", px: "16px" }}
                                    onClick={() => {
                                      if (!isPopover) {
                                        handleViewClient(row._id);
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
                                      {row?.phone_number != ""
                                        ? row?.phone_number
                                        : "---"}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="tableCell"
                                    sx={{ py: "8px", px: "16px" }}
                                    onClick={() => {
                                      if (!isPopover) {
                                        handleViewClient(row._id);
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
                                      {row?.city}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="tableCell"
                                    sx={{ py: "8px", px: "16px" }}
                                    onClick={() => {
                                      if (!isPopover) {
                                        handleViewClient(row._id);
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
                                      {row?.state}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="tableCell"
                                    sx={{ py: "8px", px: "16px" }}
                                    onClick={() => {
                                      if (!isPopover) {
                                        handleViewClient(row._id);
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
                                      {row?.address != ""
                                        ? row?.address
                                        : "---"}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="tableCell"
                                    sx={{ py: "8px", px: "16px" }}
                                  >
                                    <ClientPopOver
                                      handleOpenDeleteModal={
                                        handleOpenDeleteModal
                                      }
                                      record={row}
                                      handleViewClient={handleViewClient}
                                      handleEditClient={handleEditClient}
                                      isPopoverOpen={setIsPopover}
                                    />
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Pagination
                        totalRecords={
                          clientList?.totalRecords
                            ? clientList?.totalRecords
                            : 0
                        }
                        itemsPerPage={rowsPerPage}
                        page={page}
                        setPage={setPage}
                      />
                    </>
                  )}
                </>
              ) : (
                <Box
                  sx={{
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography>No Recipient Found</Typography>
                </Box>
              )}
            </Paper>
            <Box sx={{ height: 40 }}></Box>
            <DeleteModal
              open={isModalOpen}
              onClose={handleDeleteModalClose}
              invoiceDelete={clientDelete}
              title="recipient"
            />
            <ClientDetailModel
              handleSubmitForm={handleSubmitForm}
              type={clientType}
              clientModel={clientModel}
              setClientModel={setClientModel}
              editId={editId}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
