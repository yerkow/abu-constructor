import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchContentsByWidgetId,
  fetchCreateContent,
  fetchUpdateContent,
} from "../api";
import { IContentCreationParams, IContentUpdateParams } from "./types";
import { queryClient } from "@/shared/lib/client";

export const useEditWidgetContent = (widgetId: string) => {
  const { data: contents } = useQuery({
    queryKey: ["contents"],
    queryFn: () => fetchContentsByWidgetId(widgetId),
  });

  const { mutate: handleCreateContent } = useMutation({
    mutationKey: ["contents"],
    mutationFn: (params: IContentCreationParams) => {
      const data = fetchCreateContent({
        ...params,
        widgetId: +widgetId,
        options: {
          detail_slug: null,
          template: false,
          template_id: null,
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contents"],
      });
    },
  });

  const { mutate: handleUpdateContent } = useMutation({
    mutationKey: ["contents"],
    mutationFn: ({
      content,
      id,
    }: {
      content: IContentUpdateParams;
      id: number;
    }) => fetchUpdateContent({ content, id }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["contents", data.id],
      });
    },
  });

  return { contents, handleCreateContent, handleUpdateContent };
};
