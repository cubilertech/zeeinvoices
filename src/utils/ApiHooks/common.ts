import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export const useFetchAllDocument = (
  apiRoute: any,
  page: any,
  limit: any,
  search: any
) => {
  const { data: session } = useSession();
  const token = session?.accessToken;
  async function fetch() {   
    try {
      const response = await axios.get(apiRoute, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit, search },
      });
      console.log("API Response:", response.data);
      if (response.data && response.data.code === 200) {
        return response.data.data ? response.data.data : [];
      } else {
        throw new Error("An error occurred while fetching records.");
      }
    } catch (error) {
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
export const useFetchSingleDocument = (apiRoute: string) => {
  const { data: session } = useSession();
  async function fetch() {
    const token = session?.accessToken;
    try {
      const response = await axios.get(apiRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.code === 200) {
        return response.data.data ? response.data.data : {};
      } else {
        throw new Error("An error occurred while fetching records.");
      }
    } catch (error) {
      throw new Error("An error occurred while fetching records.");
    }
  }
  return useQuery({
    queryKey: [`key-${apiRoute}`],
    queryFn: fetch,
    enabled: false,
    // placeholderData: {},
  });
};
export const useCreateDocument = () => {
  const { data: session } = useSession();
  const handleCreate = async (props: any) => {
    const token = session?.accessToken;
    try {
      const response = await axios.post(props.apiRoute, props.data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === 200) {
        console.log("Create Successfully");
        return response.data.data;
      } else {
        throw new Error("An error occurred while creating record.");
      }
    } catch (error: any) {
      throw new Error(`${error.response?.data?.message}`);
    }
  };
  return useMutation(handleCreate);
};

export const useDeleteDocument = () => {
  const { data: session } = useSession();
  const handleDelete = async (props: any) => {
    const token = session?.accessToken;
    try {
      const response = await axios.delete(props.apiRoute,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.code === 200) {
        return response.data.data;
      } else {
        throw new Error("An error occurred while deleting record.");
      }
    } catch (error: any) {
      throw new Error(`${error.response?.data?.message}`);
    }
  };

  return useMutation(handleDelete);
};

export const useEditDocument = () => {
  const { data: session } = useSession();
  const handleEdit = async (props: any) => {
    const token = session?.accessToken;
    try {
      const respone = await axios.put(props.apiRoute, props.data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (respone.data.code === 200) {
        return respone.data.data;
      } else {
        throw new Error("An Error Occured while Update Data");
      }
    } catch (error) {
      throw new Error("An Error Occured while Update Data");
    }
  };
  return useMutation(handleEdit);
};
