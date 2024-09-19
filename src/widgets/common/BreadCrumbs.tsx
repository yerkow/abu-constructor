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


  let { data: crumbs } = useQuery({
    queryKey: ["crumbs"],
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/navigations/get/crumbs?slug=${slug}&locale=${locale}`);
      return response.json()
    }
  })




  return (
    <>
      <Breadcrumb >
        <BreadcrumbList>
          {(crumbs?.length > 2 ? crumbs.splice(1, 1) : crumbs)?.map(({ title, navigation_type: type, slug }: any, idx: number) => (
            <BreadcrumbItem className="text-red-950 font-bold text-xl" key={idx}>
              <BreadcrumbLink
                href={
                  ["content", "group-link"].includes(type) ? `/${locale}/${slug}` : undefined
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
