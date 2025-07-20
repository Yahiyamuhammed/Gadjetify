import { useMutation } from "@tanstack/react-query"
import { api } from "@/utils/api";

export const googleAuth=()=>{
    return useMutation({
        mutationFn:async (access_token)=>{
            const res=await api.post('/auth/google-login',{access_token})
            return res.data
        }
    })
}