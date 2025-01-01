import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { setResetInvoice } from "@/redux/features/invoiceSlice";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { ShowToast } from "@/components/CustomToast";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

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
interface CreateDocumentProps {
  apiRoute: string;
  data: any;
  title: string;
}

export const useCreateDocument = (
    multipart: boolean = true,
    showToast: boolean = true,
    auth: boolean = true
) => {
  const { data: session } = useSession();

  const handleCreate = async ({ apiRoute, data, title }: CreateDocumentProps) => {
    const token = session?.accessToken;

    try {
      const response = await axios.post(apiRoute, data, {
        headers: {
          "Content-Type": multipart ? "multipart/form-data" : "application/json",
          ...(auth && { Authorization: `Bearer ${token}` }),
        },
      });

      if (response.data.code === 200) {
        if (showToast) {
          ShowToast(title, response.data.message);
        }
        return response.data.data;
      } else {
        throw new Error("An error occurred while creating the record.");
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        signOut({ callbackUrl: "/" });
      }
      const message = error?.response?.data?.message || "An unexpected error occurred.";
      throw new Error(message);
    }
  };

  // Ensure the mutation function is returned properly
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
        // toast.success(response.data.message);
        ShowToast(props.title, response.data.message);
        return response.data.data;
      } else {
        toast.error("An error occurred while deleting record.");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return useMutation(handleDelete);
};

// Edit Recods
export const useEditDocument = (multipart: boolean = true) => {
  const { data: session } = useSession();

  const handleEdit = async ({ apiRoute, data, title }: EditDocumentProps) => {
    if (!session?.accessToken) {
      toast.error("Session expired. Please log in again.");
      return null;
    }

    const headers = {
      "Content-Type": multipart ? "multipart/form-data" : "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    };

    try {
      const response = await axios.put(apiRoute, data, { headers });

      if (response.data.code === 200) {
        ShowToast(title, response.data.message); // Assuming `ShowToast` is a valid utility
        return response.data.data;
      }

      toast.error("An error occurred while updating data.");
      return null;
    } catch (error: any) {
      handleError(error);
      return null;
    }
  };

  const handleError = (error: any) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (status === 401) {
      setResetInvoice();
      setResetInvoiceSetting();
      signOut({ callbackUrl: "/" });
    } else if (status === 400) {
      toast.error(message || "Invalid data provided.");
    } else {
      toast.error("An error occurred while updating data.");
    }
  };

  return useMutation(handleEdit);
};

interface EditDocumentProps {
  apiRoute: string;
  data: any;
  title: string;
}