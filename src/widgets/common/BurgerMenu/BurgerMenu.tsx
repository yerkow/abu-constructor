"use client";
import { Drawer, DrawerTrigger, DrawerContent, Button } from "@/shared/ui";

import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { ArrowLeft, ChevronRight, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { INavigation } from "@/shared/lib/types";

import { backendUrl } from "@/shared/lib/constants";

export const BurgerMenu = ({
  topHeaderMenuList,
}: {
  topHeaderMenuList: { title: string; link: string }[];
}) => {
  const params = useParams();

  const { data: pages } = useQuery<INavigation[]>({
    queryKey: ["navigations"],
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/navigations`);
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <Button
        size={"icon"}
        variant={"ghost"}
        className="flex text-white hover:text-bg-[#640000] justify-center items-center [@media(min-width:890px)]:hidden "
        onClick={() => setOpen(true)}
      >
        <Menu size={32} />
      </Button>
      <DrawerContent className="rounded-none bg-red-950 border-none   px-4 py-14">
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
            <MenuLink key={p.id} page={p} locale={params.locale as string} />
          ))}
        </div>
        <div className="w-full h-[2px] bg-white my-6"></div>
        <div className="flex flex-col gap-2">
          {topHeaderMenuList.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="text-white text-[20px]"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const MenuLink = ({
  page,
  locale,
  parentRoute,
}: {
  page: INavigation;
  locale: string;
  parentRoute?: string | null;
}) => {
  const path = usePathname();
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [route] = useState(
    () => `${parentRoute ? `${parentRoute}/` : ""}${page.slug}`
  );

  if (page?.children?.length === 0 || page?.navigation_type === "content") {
    return (
      <Link
        className={clsx(path == `/${locale}/${route}` && "font-bold")}
        href={`/${locale}/${route}`}
      >
        {page.title[locale]}
      </Link>
    );
  } else {
    return (
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerTrigger className="text-start flex justify-start items-center gap-3">
          {page.title[locale]} <ChevronRight className="" />
        </DrawerTrigger>
        <DrawerContent className="rounded-none bg-red-950  border-none px-4 py-14">
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
            {page.children &&
              page.children.map((p) => (
                <MenuLink
                  key={p.id}
                  page={p}
                  locale={locale}
                  parentRoute={route}
                />
              ))}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
};
