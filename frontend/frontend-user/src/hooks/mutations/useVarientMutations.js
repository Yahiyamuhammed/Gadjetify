import { api } from "@/utils/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
const useQerry=useQueryClient()

export const useAddVarient =()=>{
    return useMutation({
        mutationFn:async data=>{
            const res= await api.post('/admin/varients',data)
            return res.data
        },
        onSuccess:()=>{
            useQerry.invalidateQueries(['variants'])
        }
    })
}
export const useEditVarient =()=>{
    return useMutation({
        mutationFn:async (data,id)=>{
            const res= await api.put(`admin/varients/${id}`,data)
            return res.data
        },
        onSuccess:()=>{
            useQerry.invalidateQueries(['variants'])
        }
    })
}
export const useDeleteVarient =()=>{
    return useMutation({
        mutationFn:async (data,id)=>{
            const res= await api.delete(`admin/varients/${id}`,data)
            return res.data
        },
        onSuccess:()=>{
            useQerry.invalidateQueries(['variants'])
        }
    })
}
