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
import { ArrowLeft, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <Button
        size={"icon"}
        variant={"ghost"}
        className="flex text-white hover:text-cyan-500 justify-center items-center md:hidden "
        onClick={() => setOpen(true)}
      >
        <Menu size={32} />
      </Button>
      <DrawerContent className="rounded-none bg-cyan-500  border-none px-4 py-14">
        <div className="relative flex flex-col gap-3 text-xl text-white">
          <Button
            onClick={() => setOpen(false)}
            variant={"ghost"}
            size={"icon"}
            className="absolute z-50 -right-3 -top-10"
          >
            <X />
          </Button>
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
  const t = useTranslations();
  const [open, setOpen] = useState(false);
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
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerTrigger className="text-start flex justify-start items-center gap-3">
          {page.title} <ChevronRight className="" />
        </DrawerTrigger>
        <DrawerContent className="rounded-none bg-cyan-500  border-none px-4 py-14">
          <div className=" relative flex flex-col gap-3 text-xl text-white ">
            <Button
              onClick={() => setOpen(false)}
              variant={"ghost"}
              size={"sm"}
              className="absolute z-50 -left-3 -top-10 flex gap-2 items-center justify-center"
            >
              <ArrowLeft />
              <span className="text-lg">{t("burger.back")}</span>
            </Button>
            {page.children.map((p) => (
              <MenuLink key={p.id} page={p} locale={locale} />
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
};
