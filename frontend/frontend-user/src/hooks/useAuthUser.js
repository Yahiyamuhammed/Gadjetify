import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useAuthUser = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(["auth-user"]);
// return  { data: user } = useQuery({
//     queryKey: ["auth-user"],
//     enabled: false // we’re not refetching; just want the cached data
//   });
};
