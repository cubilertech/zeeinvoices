import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchAllDocument = (apiRoute: any) => {
  async function fetch() {
    try {
      const response = await axios.get(apiRoute);
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
export const useFetchSingleDocument = (apiRoute : string) => {
  async function fetch() {
    try {
      const response = await axios.get(apiRoute);
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
export const useCreateDocument=()=>{
  const handleCreate = async (props : any) =>{
    try {
      const response = await axios.post(props.apiRoute,props.data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    if(response.data.code === 200){
      console.log('Create Successfully');
      return response.data.data
    }else{
      throw new Error('An error occurred while creating record.');
    }
    } catch (error : any) {
      throw new Error(`${error.response?.data?.message}`)
    }
    
  };
  return useMutation(handleCreate);
}