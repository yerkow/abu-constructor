import { customFetch } from "@/shared/api";
import { BackedPage } from "@/shared/lib/types";
import { combinePagesByLang } from "@/shared/lib/utils";

export const getPages = async () => {
  const pages = (
    await customFetch({ path: "navigation-view/", method: "GET" })
  ).filter(
    (page: BackedPage) =>
      page.navigation_id == null && page.navigation_type !== "template",
  );

  return combinePagesByLang(pages);
};
export const getPagesChildren = async (ids: { ruId: number; kzId: number }) => {
  const ruPages = await customFetch({
    path: `navigation/${ids.ruId}/children`,
    method: "GET",
  });
  const kzPages = await customFetch({
    path: `navigation/${ids.kzId}/children`,
    method: "GET",
  });

  return combinePagesByLang(ruPages.concat(kzPages));
};

export const createPage = (
  page: Omit<BackedPage, "id" | "create_date" | "update_date">,
) => {
  return customFetch({
    path: "navigation-view/",
    method: "POST",
    body: { json: page },
  });
};
export const editPage = ({
  id,
  data,
}: {
  id: number;
  data: Partial<BackedPage>;
}) => {
  return customFetch({
    path: `navigation-view/${id}/`,
    method: "PATCH",
    body: { json: data },
  });
};
export const deletePage = (id: number) => {
  return customFetch({
    path: `navigation-view/${id}`,
    method: "DELETE",
    body: { json: { change_type: "delete" } },
  });
};
