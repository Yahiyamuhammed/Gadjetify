import { api } from "@/utils/api"
import { useMutation } from "@tanstack/react-query"

export const useLogoutMutation =()=>{
    return useMutation({
        mutationFn:async ()=>{
            const response=await api.post('auth/signout')
            return response
        }
    })
} 