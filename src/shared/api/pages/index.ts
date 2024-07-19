import { customFetch } from "@/shared/api";
import { BackedPage, NavPage } from "@/shared/lib/types";
import { combinePagesByLang } from "@/shared/lib/utils";
export const getPageBySlug = async (
  slug: string,
  lang: string,
): Promise<BackedPage[]> => {
  return customFetch({
    path: `navigation-view/`,
    method: "GET",
    query: { slug, language_key: lang },
  });
};
export const getPages = async () => {
  const pages = (
    await customFetch({ path: "navigation-view/", method: "GET" })
  ).filter(
    (page: BackedPage) =>
      page.navigation_id == null && page.navigation_type !== "template",
  );

  return combinePagesByLang(pages);
};
export const getNavbarPages = async (lang: string): Promise<NavPage[]> => {
  const pages = await customFetch({
    path: "navigation-children-all",
    method: "GET",
  });
  return pages.filter(
    (page: BackedPage) =>
      page.navigation_type !== "template" && page.language_key == lang,
  );
};
export const getTemplates = async (): Promise<BackedPage[]> => {
  const templates: BackedPage[] = await customFetch({
    path: "navigation-view/",
    method: "GET",
    query: { navigation_type: "template" },
  });
  console.log(templates);

  return templates.filter((t) => t.slug == "template");
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
): Promise<BackedPage> => {
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
    query: { change_type: "delete" },
  });
};
