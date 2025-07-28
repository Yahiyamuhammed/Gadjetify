import { api } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

export const getAddresses = ()=>{
    return useQuery({
        queryKey:['address'],
        queryFn:async ()=>{
            const res=await api.get('/get-all-addresses')
            return res.data.addresses
        }
    })
}