import { useQuery } from "@tanstack/react-query";
import axios from "axios"


export const useFetchAllDocuments = (apiRoute: any) => {
    async function fetch() {
        try{
            const response = await axios.get(apiRoute);
            if(response.data && response.data.code == 200){
                return response.data.data ? response.data.data : [];
            }
            else{
                throw new Error("An error occured while fetching records.")
            }
        }
        catch (error){
            throw new Error("An error occured while fetching records.")
        }
    }
    return useQuery({
        queryKey: [`key-${apiRoute}`],
        queryFn: fetch,
        enabled: false,
    });
}


export const useFetchSingleDoc = (apiRoute: string) => {
    async function fetch() {
        try{
            const response = await axios.get(apiRoute);
            if(response.data && response.data.code == 200) {
                return response.data.data ? response.data.data : {};
            }
            else{
                throw new Error("An error occured whilefetching records.")
            }
        }
        catch (error) {
            throw new Error("An error occured whilefetching records.")
        }
    }
    return useQuery({
        queryKey: [`key-${apiRoute}`],
        queryFn: fetch,
        enabled:false,
    });
}