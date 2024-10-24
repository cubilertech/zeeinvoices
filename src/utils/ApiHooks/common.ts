import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { setResetInvoice } from "@/redux/features/invoiceSlice";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";

// Fetch All Recods
export const useFetchAllDocument = (
  apiRoute: any,
  page?: any,
  limit?: any,
  search?: any
) => {
  const { data: session, update } = useSession();
  const token = session?.accessToken;
  async function fetch() {
    try {
      const response = await axios.get(apiRoute, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit, search },
      });
      if (response.data && response.data.code === 200) {
        return response.data.data ? response.data.data : [];
      } else {
        toast.error("An error occurred while fetching records.");
      }
    } catch (error: any) {
      if (error?.response?.status == 401) {
        setResetInvoice();
        setResetInvoiceSetting();
        signOut({ callbackUrl: "/" });
      }
      throw new Error("An error occurred while fetching records.");
    }
  }
  return useQuery({
    queryKey: [`key-${apiRoute}`],
    queryFn: fetch,
    enabled: false,
    placeholderData: [],
    keepPreviousData: true,
  });
};
// Fetch Single Recods
export const useFetchSingleDocument = (apiRoute: string) => {
  const { data: session } = useSession();
  const token = session?.accessToken;
  async function fetch() {
    try {
      const response = await axios.get(apiRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.code === 200) {
        return response.data.data ? response.data.data : {};
      } else {
        toast.error("An error occurred while fetching records.");
      }
    } catch (error: any) {
      if (error?.response?.status == 401) {
        setResetInvoice();
        setResetInvoiceSetting();
        signOut({ callbackUrl: "/" });
      }
      throw new Error("An error occurred while fetching records.");
    }
  }
  return useQuery({
    queryKey: [`key-${apiRoute}`],
    queryFn: fetch,
    enabled: false,
    placeholderData: [],
  });
};
// Create Recods
export const useCreateDocument = (multipart = true) => {
  const { data: session } = useSession();
  const handleCreate = async (props: any) => {
    const token = session?.accessToken;
    try {
      const response = await axios.post(props.apiRoute, props.data, {
        headers: {
          "Content-Type": multipart
            ? "multipart/form-data"
            : "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === 200) {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        toast.error("An error occurred while creating record.");
      }
    } catch (error: any) {
      if (error?.response?.status == 401) {
        setResetInvoice();
        setResetInvoiceSetting();
        signOut({ callbackUrl: "/" });
      }
      throw new Error(`${error.response?.data?.message}`);
    }
  };
  return useMutation(handleCreate);
};
// Delete Recods
export const useDeleteDocument = () => {
  const { data: session } = useSession();
  const handleDelete = async (props: any) => {
    const token = session?.accessToken;
    try {
      const response = await axios.delete(props.apiRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === 200) {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        toast.error("An error occurred while deleting record.");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      // throw new Error(`${error.response?.data?.message}`);
    }
  };

  return useMutation(handleDelete);
};
// Edit Recods
export const useEditDocument = (multipart = true) => {
  const { data: session } = useSession();
  const handleEdit = async (props: any) => {
    const token = session?.accessToken;
    try {
      const response = await axios.put(props.apiRoute, props.data, {
        headers: {
          "Content-Type": multipart
            ? "multipart/form-data"
            : "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === 200) {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        toast.error("An Error Occured while Update Data");
      }
    } catch (error: any) {
      if (error?.response?.status == 401) {
        setResetInvoice();
        setResetInvoiceSetting();
        signOut({ callbackUrl: "/" });
      } else if (error?.response?.status === 400) {
        toast.error(error?.response?.message);
        return null;
      } else {
        toast.error("An Error Occured while Update Data");
      }
    }
  };
  return useMutation(handleEdit);
};
