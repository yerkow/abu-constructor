"use client";
import { getNavbarPages } from "@/shared/api/pages";
import { NavPage } from "@/shared/lib/types";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  Button,
  DrawerClose,
} from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const BurgerMenu = () => {
  const params = useParams();
  const {
    data: pages,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["navbar"],
    queryFn: async () => {
      if (!Array.isArray(params.locale)) {
        const pages = await getNavbarPages(params.locale);
        return pages;
      }
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <div className="flex justify-center items-center md:hidden ">
          <Menu size={32} color="white" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="rounded-none bg-cyan-500  border-none px-4 py-10">
        <div className="flex flex-col gap-3 text-xl text-white">
          {pages?.map((p) => (
            <MenuLink key={p.id} page={p} locale={params.locale} />
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const MenuLink = ({
  page,
  locale,
}: {
  page: NavPage;
  locale: string | string[];
}) => {
  const path = usePathname();
  if (page.children.length == 0) {
    return (
      <Link
        className={clsx(path == `/${locale}${page.slug}` && "font-bold")}
        href={`/${locale}${page.slug}`}
      >
        {page.title}
      </Link>
    );
  } else {
    return (
      <Drawer direction="right">
        <DrawerTrigger className="text-start flex justify-start items-center gap-3">
          {page.title} <ChevronRight className="mt-1" />
        </DrawerTrigger>
        <DrawerContent className="rounded-none bg-cyan-500  border-none px-4 py-10">
          <div className="flex flex-col gap-3 text-xl text-white ">
            {page.children.map((p) => (
              <MenuLink key={p.id} page={p} locale={locale} />
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
};
