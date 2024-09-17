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


  // if (slug[0] === "main") return null;

  const { data: crumbs } = useQuery({
    queryKey: ["crumbs"],
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/navigations/get/crumbs?slug=main/children&locale=ru`);
      return response.json()
    }
  })



  return (
    <>
      <Breadcrumb >
        <BreadcrumbList>
          {crumbs?.map((crumb: string, idx: number) => (
            <BreadcrumbItem className="text-red-950 font-bold text-xl" key={idx}>
              <BreadcrumbLink
              // href={
              //   crumb.type == "content" ? `/${locale}${crumb.slug}` : undefined
              // }
              >
                {crumb}
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
