import { api } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

export const useFetchUserDetail=()=>{
    return useQuery({
        queryKey:(['userProfile']),
        queryFn:async ()=>{
            const res=await api.get('/profile')
            return res.data.data
        }
    })

}