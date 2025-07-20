import { api } from "@/utils/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useLogoutMutation =()=>{

        const queryClient = useQueryClient();

    return useMutation({
        mutationFn:async ()=>{
            const response=await api.post('auth/signout')
            return response
        },
        onSuccess: () => {
      // Clear user data from the cache
      queryClient.removeQueries(["auth-user"],undefined);
      
      // Optionally: clear other user-related caches
      // queryClient.clear(); // (clears all cache, if needed)
    }
    })
} 