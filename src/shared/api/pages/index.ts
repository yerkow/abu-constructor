import { customFetch } from "@/shared/api";

export const getPages = () => {
  return customFetch({ path: "/navigation_view/", method: "GET" });
};
