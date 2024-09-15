import { useMutation, useQuery } from "@tanstack/react-query";

import { IWidget } from "@/shared/types";
import {
  fetchWidgetCreate,
  fetchWidgetListByNavigationId,
  fetchWidgetOrderUpdate,
  fetchWidgetRemoveById,
} from "../api";
import { queryClient } from "@/shared/lib/client";
import { IWidgetCreateOptions } from "./types";

export const useNavigationPageContent = (id: string) => {
  const { data: widgets, isFetching } = useQuery<IWidget[]>({
    queryKey: ["widgets"],
    queryFn: () => fetchWidgetListByNavigationId(id),
  });

  const { mutate: handleWidgetUpdate } = useMutation({
    mutationFn: fetchWidgetOrderUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["widgets"],
      });
    },
  });

  const { mutate: handleWidgetDelete } = useMutation({
    mutationFn: fetchWidgetRemoveById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["widgets"],
      });
    },
  });

  const { mutate: handleWidgetCreate } = useMutation<
    any,
    Error,
    IWidgetCreateOptions
  >({
    mutationFn: (data: IWidgetCreateOptions) => fetchWidgetCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["widgets"],
      });
    },
  });

  return {
    widgets,
    isFetching,
    handleWidgetUpdate,
    handleWidgetDelete,
    handleWidgetCreate,
  };
};
