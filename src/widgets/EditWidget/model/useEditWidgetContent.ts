import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchContentsByWidgetId,
  fetchCreateContent,
  fetchUpdateContent,
} from "../api";
import { IContentCreationParams, IContentUpdateParams } from "./types";

export const useEditWidgetContent = (widgetId: string) => {
  const { data: contents } = useQuery({
    queryKey: ["contents"],
    queryFn: () => fetchContentsByWidgetId(widgetId),
  });

  const { mutate: handleCreateContent } = useMutation({
    mutationKey: ["contents"],
    mutationFn: (params: IContentCreationParams) => {
      // console.log(params);
      const data = fetchCreateContent({ ...params });
      return data;
    },
  });

  const { mutate: handleUpdateContent } = useMutation({
    mutationKey: ["contents"],
    mutationFn: (params: IContentUpdateParams) =>
      fetchUpdateContent({ ...params }),
  });

  return { contents, handleCreateContent, handleUpdateContent };
};
