import { useQuery } from "@tanstack/react-query"

export const fetchVarients =()=>{
    return useQuery({
        queryKey:['variants'],
        queryFn:async (productId={})=>{
            const res=await api.get('/admin/varients',productId)
            return res.data
        }
    })
}