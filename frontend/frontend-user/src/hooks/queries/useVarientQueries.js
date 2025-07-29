import { api } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

export const useFetchVarients =()=>{
    return useQuery({
        queryKey:['variants'],
        queryFn:async ()=>{
            const res=await api.get('/admin/variants')
            return res.data
        }
    })
}