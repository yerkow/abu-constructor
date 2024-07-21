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
import Link from "next/link";
import { useParams } from "next/navigation";

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
        <Button variant={"default"}>BURGER</Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-none">
        <div className="flex flex-col gap-3">
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
  if (page.children.length == 0) {
    return <Link href={`/${locale}${page.slug}`}>{page.title}</Link>;
  } else {
    return (
      <Drawer direction="right">
        <DrawerTrigger>{page.title}</DrawerTrigger>
        <DrawerContent className="rounded-none">
          <div className="flex flex-col gap-3">
            {page.children.map((p) => (
              <MenuLink key={p.id} page={p} locale={locale} />
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
};
