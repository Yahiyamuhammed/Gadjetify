import { useMutation } from "@tanstack/react-query"
import { api } from "@/utils/api";

export const googleAuth=()=>{
    return useMutation({
        mutationFn:async (credential)=>{
            const res=await api.post('/auth/google-login',{credential})
            return res.data
        }
    })
}