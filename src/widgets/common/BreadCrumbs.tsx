"use client"
import { backendUrl } from "@/shared/lib/constants";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";

export const BreadCrumbs = ({
  slug,
  locale,
}: {
  slug: string[];
  locale: string;
}) => {

  const { data: crumbs } = useQuery({
    queryKey: ["crumbs"],
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/navigations/get/crumbs?slug=main/children&locale=ru`);
      return response.json()
    }
  })

  if (slug[0] === "home") return null;

  return (
    <>
      <Breadcrumb >
        <BreadcrumbList>
          {crumbs?.map(({ title, navigation_type: type, slug }: any, idx: number) => (
            <BreadcrumbItem className="text-red-950 font-bold text-xl" key={idx}>
              <BreadcrumbLink
                href={
                  ["content", "group_link"].includes(type) ? `/${locale}/${slug}` : undefined
                }
              >
                {title}
              </BreadcrumbLink>
              {idx < crumbs.length - 1 && (
                <ChevronRight size={30} className="mb-1" />
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
