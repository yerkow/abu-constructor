import { customFetch } from "@/shared/api";
import { Langs, BackedWidget } from "@/shared/lib/types";
import { combineWidgetsByLang } from "@/shared/lib/utils";

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
export const editWidget = ({
  id,
  body,
}: {
  id: number;
  body: Partial<BackedWidget>;
}) => {
  return customFetch({
    path: `widget-view/${id}/`,
    method: "PATCH",
    body: { json: body },
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
