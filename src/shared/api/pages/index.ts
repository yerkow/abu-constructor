import { customFetch } from "@/shared/api";
import { BackedPage } from "@/shared/lib/types";
import { combinePagesByLang } from "@/shared/lib/utils";

export const getPages = async () => {
  const pages = await customFetch({ path: "navigation-view/", method: "GET" });

  return combinePagesByLang(pages);
};
export const getPagesChildren = async (id: number) => {
  const pages = await customFetch({
    path: `navigation-view/navigation/${id}/children`,
    method: "GET",
  });

  return combinePagesByLang(pages);
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
