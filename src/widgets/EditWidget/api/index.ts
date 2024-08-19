import { backendUrl } from "@/shared/lib/constants";
import { Content } from "@/shared/types";
import { IContentCreationParams, IContentUpdateParams } from "../model/types";

export const fetchWidgetOptions = async (widgetId: string) => {
  const response = await fetch(`${backendUrl}/widgets/${widgetId}`);
  const data = await response.json();
  return data;
};

export const fetchEditWidgetMainOptions = async (
  data: any,
  widgetId: string
) => {
  const sendData = {
    options: { ...data },
  };

  const response = await fetch(`${backendUrl}/widgets/${widgetId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...sendData }),
  });

  return response.json();
};

export const fetchContentsByWidgetId = async (
  widgetId: string
): Promise<Content[]> => {
  const response = await fetch(`${backendUrl}/contents/${widgetId}`);
  const data = await response.json();
  return data;
};

export const fetchCreateContent = async ({
  widgetId,
  ...content
}: IContentCreationParams): Promise<Content> => {
  console.log(content.data.content);
  //   console.log(widgetId);
  const response = await fetch(`${backendUrl}/contents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content.data.content,
      widget_id: widgetId,
    }),
  });

  return response.json();
};

export const fetchUpdateContent = async ({
  data,
  id,
}: IContentUpdateParams): Promise<Content> => {
  const sendData = {
    content: { ...data },
  };

  const response = await fetch(`${backendUrl}/contents/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...sendData }),
  });

  return response.json();
};
