import { api } from "@/utils/api"
import { useMutation,  useQueryClient } from "@tanstack/react-query"
// const useQerry=useQueryClient()

export const useAddVarient =()=>{
    const useQerry=useQueryClient()
    return useMutation({
        mutationFn:async data=>{
            const res= await api.post('/admin/variants',data)
            return res.data
        },
        onSuccess:()=>{
            useQerry.invalidateQueries(['variants'])
        }
    })
}
export const useEditVarient =()=>{
    const useQerry=useQueryClient()
    return useMutation({
        mutationFn:async ({data,id})=>{
            const res= await api.put(`admin/variants/${id}`,data)
            return res.data
        },
        onSuccess:()=>{
            useQerry.invalidateQueries(['variants'])
        }
    })
}
export const useDeleteVarient =()=>{
    const useQerry=useQueryClient()
    return useMutation({
        mutationFn:async (data,id)=>{
            const res= await api.delete(`admin/variants/${id}`,data)
            return res.data
        },
        onSuccess:()=>{
            useQerry.invalidateQueries(['variants'])
        }
    })
}
