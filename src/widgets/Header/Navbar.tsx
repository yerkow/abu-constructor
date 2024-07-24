"use client";

import { getNavbarPages, getPages } from "@/shared/api/pages";
import { NavPage } from "@/shared/lib/types";
import { cn } from "@/shared/lib/utils";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  Skeleton,
} from "@/shared/ui";
import { BurgerMenu } from "@/widgets/BurgerMenu/BurgetMenu";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import {
  User,
  CreditCard,
  Settings,
  Keyboard,
  Users,
  UserPlus,
  Mail,
  MessageSquare,
  PlusCircle,
  Plus,
  Github,
  LifeBuoy,
  Cloud,
  LogOut,
  ArrowRight,
  ArrowDown01,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export const Navbar = () => {
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

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (document && window) {
      document.addEventListener("scroll", () => {
        if (window.scrollY >= 172) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      });
    }
    return document.removeEventListener("scroll", () => {
      if (window.scrollY >= 172) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, []);
  return (
    <nav
      className={clsx(
        "min-h-[76px]   md:z-50 md:top-0 hidden md:flex justify-center items-center  bg-white shadow-xl",
        scrolled ? "md:fixed md:left-0 md:right-0 md:top-0" : "md:static",
      )}
    >
      <ul className="max-w-[1200px] mx-auto gap-5 items-center justify-center flex ">
        {isFetching ? (
          <Skeleton className="w-[500px] h-10" />
        ) : pages ? (
          <section className="flex text-cyan-500  text-start gap-5 text-xl">
            <NavList locale={params.locale} pages={pages} />
          </section>
        ) : (
          <span>Навигация не найдена</span>
        )}
      </ul>
    </nav>
  );
};

const NavList = ({
  pages,
  locale,
}: {
  pages: NavPage[];
  locale: string | string[];
}) => {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return pages.map((page) => {
    if (page.children.length === 0 && page.navigation_type == "content") {
      return (
        <Link
          className={clsx(
            "text-center p-3 rounded-md  hover:bg-gray-100",
            path == `/${locale}${page.slug}` && "font-bold",
          )}
          href={`/${locale}/${page.slug}`}
          key={page.id}
        >
          {page.title}
        </Link>
      );
    } else {
      return (
        <DropdownMenu open={open} onOpenChange={setOpen} key={page.id}>
          <DropdownMenuTrigger asChild>
            <div className="p-3 cursor-pointer rounded-md flex gap-2 items-center text-center  justify-normal hover:bg-gray-100">
              <span className="ml-5">{page.title}</span>
              <ChevronRight
                className={clsx("transition", !open ? "rotate-0" : "rotate-90")}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className=" flex flex-col gap-3  text-cyan-500 "
          >
            <NavList locale={locale} pages={page.children} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  });
};
