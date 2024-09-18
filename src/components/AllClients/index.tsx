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
import { CircularProgress, Container } from "@mui/material";
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
    label: "Actions",
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
  const [editId, setEditId] = React.useState<any | undefined>(undefined);

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

  React.useEffect(() => {
    if (session?.accessToken) refetchClientList();
    if (deleteSuccess) {
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
  const filteredData = React.useMemo(() => {
    if (clientList && clientList?.clients?.length) {
      return clientList?.clients;
    } else {
      return [];
    }
  }, [clientList]);
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
          console.log("Added");
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
    console.log(itemToDelete, "id");
    deleteClient({ apiRoute: `${backendURL}/clients/${itemToDelete}` });
  };
  return (
    <>
      <hr />
      <Container
        maxWidth="lg"
        sx={{ px: { md: "0.1%", lg: "0.1%", xs: "3%" } }}
      >
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
              px: "20px",
              // mb: 2,
              pb: 1,
              border: "none",
              borderRadius: "8px",
              boxShadow: { sm: `0px 0px 2px 0px #0000001A` },
            }}
          >
            <EnhancedTableToolbar
              handleClientAddModel={handleClientAddModel}
              numSelected={selected.length}
              search={search}
              handleChangeSearch={handleChangeSearch}
            />
            {filteredData.length <= 0 ? (
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
                <Typography>No Recipients Found</Typography>
              </Box>
            ) : (
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
                      rowCount={clientList?.clients?.length}
                    />
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
                      <TableBody>
                        {filteredData?.map((row: any, index: number) => {
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
                                <Typography variant="text-sm-regular">
                                  {row?.name}
                                </Typography>
                              </TableCell>
                              <TableCell align="left" className="tableCell">
                                <Typography variant="text-sm-regular">
                                  {row?.email}
                                </Typography>
                              </TableCell>
                              <TableCell
                                align="left"
                                className="tableCell"
                                sx={{ paddingLeft: "17px" }}
                              >
                                <Typography variant="text-sm-regular">
                                  {row?.company_name}
                                </Typography>
                              </TableCell>
                              <TableCell
                                align="left"
                                className="tableCell"
                                sx={{ paddingLeft: "17px" }}
                              >
                                <Typography variant="text-sm-regular">
                                  {row?.phone_number}
                                </Typography>
                              </TableCell>
                              <TableCell
                                align="left"
                                className="tableCell"
                                sx={{ paddingLeft: "17px" }}
                              >
                                <Typography variant="text-sm-regular">
                                  {row?.city}
                                </Typography>
                              </TableCell>
                              <TableCell align="left" className="tableCell">
                                <Typography variant="text-sm-regular">
                                  {row?.state}
                                </Typography>
                              </TableCell>
                              <TableCell align="left" className="tableCell">
                                {row?.address}
                              </TableCell>
                              <TableCell align="left" className="tableCell">
                                <ClientPopOver
                                  handleOpenDeleteModal={handleOpenDeleteModal}
                                  record={row}
                                  handleViewClient={handleViewClient}
                                  handleEditClient={handleEditClient}
                                />
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
                    clientList?.totalRecords ? clientList?.totalRecords : 0
                  }
                  itemsPerPage={rowsPerPage}
                  page={page}
                  setPage={setPage}
                />
              </>
            )}
          </Paper>
          <Box sx={{ height: 20 }}></Box>
          <DeleteModal
            open={isModalOpen}
            onClose={handleDeleteModalClose}
            invoiceDelete={clientDelete}
            title="client"
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
    </>
  );
}
