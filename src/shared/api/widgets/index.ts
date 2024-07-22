import { customFetch } from "@/shared/api";
import { Langs, BackedWidget } from "@/shared/lib/types";
import { combineWidgetProps, combineWidgetsByLang } from "@/shared/lib/utils";

export const createWidget = (widget: Omit<BackedWidget, "id">) => {
  return customFetch({
    path: "widget-view/",
    method: "POST",
    body: { json: widget },
  });
};
export const getTemplateWidgets = async (
  id: number,
): Promise<BackedWidget[]> => {
  return customFetch({
    path: `widget/navigation/${id}`,
    method: "GET",
    query: { language_key: "ru" },
  });
};
export const getWidgetsToDisplay = async (
  id: number,
  lang: string,
): Promise<BackedWidget[]> => {
  return customFetch({
    path: `widget/navigation/${id}`,
    method: "GET",
    query: { language_key: lang },
  });
};
export const getWidgets = async (ids: Langs) => {
  const ruWidgets = await customFetch({
    path: `widget/navigation/${ids.ru}`,
    method: "GET",
    query: { language_key: "ru" },
  });
  const kzWidgets = await customFetch({
    path: `widget/navigation/${ids.kz}`,
    method: "GET",
    query: { language_key: "kz" },
  });
  return combineWidgetsByLang(ruWidgets.concat(kzWidgets));
};
export const getWidgetProps = async ({
  ruPageId,
  kzPageId,
  order,
}: {
  ruPageId: number;
  kzPageId: number;
  order: number;
}) => {
  const ruWidgets: BackedWidget[] = await customFetch({
    path: `widget/navigation/${ruPageId}`,
    method: "GET",
    query: { language_key: "ru" },
  });
  const kzWidgets: BackedWidget[] = await customFetch({
    path: `widget/navigation/${kzPageId}`,
    method: "GET",
    query: { language_key: "kz" },
  });
  const ruOrder = ruWidgets.filter((w) => w.order === order);
  const kzOrder = kzWidgets.filter((w) => w.order === order);
  if (ruOrder[0] && kzOrder[0]) {
    return combineWidgetProps(ruOrder[0], kzOrder[0]);
  }
  return null;
};
export const editWidget = ({
  id,
  body,
  navigation_id,
}: {
  id: number;
  body: Partial<BackedWidget>;
  navigation_id: number;
}) => {
  return customFetch({
    path: `widget-view/${id}/`,
    method: "PATCH",
    body: { json: body },
    query: { navigation_id },
  });
};
export const deleteWidget = async ({
  id,
  navigation_id,
}: {
  id: number;
  navigation_id: number;
}) => {
  return customFetch({
    path: `widget-view/${id}`,
    method: "DELETE",
    query: { navigation_id },
  });
};
export const uploadFile = (file: File) => {
  const data = new FormData();
  data.append("file", file);
  return customFetch({
    path: "upload/",
    method: "POST",
    body: { multipart: data },
  });
};
