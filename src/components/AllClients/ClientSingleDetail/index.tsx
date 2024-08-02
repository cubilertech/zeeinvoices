import DeleteModal from "@/components/DeleteModal/deleteModal";
import { palette } from "@/theme/palette";
import {
  useDeleteDocument,
  useEditDocument,
  useFetchSingleDocument,
} from "@/utils/ApiHooks/common";
import { backendURL } from "@/utils/constants";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import ClientDetailModel from "../ClientDetailModel";

interface ClientSingleProps {
  id: any;
}

const ClientSingleDetail: FC<ClientSingleProps> = ({ id }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [clientModel, setClientModel] = React.useState(false);
  //Edit Client
  const {
    data: singleClient,
    refetch: singleFetch,
    isFetching: fetchingClient,
  } = useFetchSingleDocument(`${backendURL}/clients/${id}`);
  useEffect(() => {
    singleFetch();
  }, [singleFetch]);


  // Update Client
  const {
    mutateAsync: updateClient,
    isLoading: updateClientLoading,
    isSuccess: updateClientSuccess,
  } = useEditDocument(false);
  const {
    mutateAsync: deleteClient,
    isLoading: deleteClientLoading,
    isSuccess: deleteSuccess,
  } = useDeleteDocument();
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

    try {
      updateClient({
        data: data,
        apiRoute: `${backendURL}/clients/${id}`,
      }).then((res) => {
        console.log("Updated");
        singleFetch();
      });
    } catch (error) {
      throw new Error("Not Updated!");
    }
  };

  const handleDeleteModalClose = () => {
    setIsModalOpen(false);
  };
  const clientDelete = async () => {
    await deleteClient({ apiRoute: `${backendURL}/clients/${id}` }).then(
      (res) => {
        router.push("/clients");
      }
    );
  };

  console.log(singleClient, "singleClient");
  return (
    <Box
      sx={{
        width: "100%",
        px: "20px",
        pt: 8,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          px: 2,
          mb: 2,
          pb: 1,
          border: "none",
          py: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack direction={"row"} gap={3} sx={{ pl: 4 }}>
          <Avatar
            sx={{
              bgcolor: palette.primary.main,
              width: "62px",
              height: "62px",
              display: "flex",
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
             {singleClient?.name.charAt(0).toUpperCase()}
          </Avatar>
          <Stack direction={"column"} gap={1}>
            <Typography
              variant="display-xs-semibold"
              sx={{ lineHeight: "32px !important" }}
            >
              {singleClient?.name}
            </Typography>
            <Typography variant="text-xs-regular-color">
              Email: <Box sx={{ color: "#9CA3AF" }}>{singleClient?.email}</Box>
            </Typography>
            <Typography variant="text-xs-regular-color">
              Phone: <Box sx={{ color: "#9CA3AF" }}>{singleClient?.phone_number}</Box>
            </Typography>
            <Typography variant="text-xs-regular-color">
              Country: <Box sx={{ color: "#9CA3AF" }}>{singleClient?.state}</Box>
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} gap={1} sx={{ alignSelf: "center" }}>
          <Button
            variant="outlined"
            onClick={() => setIsModalOpen(true)}
            sx={{
              height: `40px`,
              width: "114px",
              borderColor: palette.border.invoicesBorderColor,
              color: palette.base.black,
            }}
          >
            Delete
          </Button>

          <Button onClick={()=>setClientModel(true)} variant="contained" sx={{ height: `40px`, width: "114px" }}>
            Edit
          </Button>
        </Stack>
      </Paper>
      <ClientDetailModel
        handleSubmitForm={handleSubmitForm}
        type="edit"
        clientModel={clientModel}
        setClientModel={setClientModel}
        editId={singleClient}
      />
      <DeleteModal
        open={isModalOpen}
        onClose={handleDeleteModalClose}
        invoiceDelete={clientDelete}
        title="client"
      />
    </Box>
  );
};

export default ClientSingleDetail;
