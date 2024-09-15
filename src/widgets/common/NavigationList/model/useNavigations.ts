import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchUpdateOrderNavigationList } from "../api";

import { backendUrl } from "@/shared/lib/constants";
import { INavigation } from "@/shared/lib/types";

export const useNavigations = () => {
  const { data, isLoading } = useQuery<INavigation[]>({
    queryKey: ["navigations"],
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/navigations`);
      return response.json();
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: fetchUpdateOrderNavigationList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["navigations"],
      });
    },
  });

  return {
    data,
    isLoading,
    handleUpdateOrder: mutate,
  };
};
