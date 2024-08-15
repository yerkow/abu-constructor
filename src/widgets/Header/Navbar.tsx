"use client";
import { Skeleton } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { NavigationList } from "./Navigation/NavigationList";
import { useScroll } from "@/shared/lib/hooks/useScroll";
import { INavigation } from "../NavigationList/model";
import { backendUrl } from "@/shared/lib/constants";

export const Navbar = () => {
  const params = useParams();
  const {
    data: pages,
    isFetching,
  } = useQuery<INavigation[]>({
    queryKey: ["navigations"],
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/navigations`);
      return response.json();
    },
  })


  const [hoveredItem, setHoveredItem] = useState<null | number>(null);
  const [scrolled] = useScroll(40)

  return (
    <nav
      className={clsx(
        "md:z-50 md:top-0 hidden md:flex justify-center items-center shadow-xl",
        scrolled ? "md:fixed md:left-0 md:right-0 md:top-0" : "md:static",
        hoveredItem ? "bg-[#640000]" : "bg-white",
      )}
    >
      <div className="w-[1200px] flex gap-10  items-center">
        <section className="">
          <Link href="/" >
            <img src={`/images/logo-${hoveredItem ? "white" : "brown"}.png`} alt="logo" style={{ height: "80px" }} />
          </Link>
        </section>
        <section className=" gap-5 items-center justify-center flex">
          {isFetching ? (
            <Skeleton className="w-[500px] h-10" />
          ) : pages ? (
            <NavigationList
              locale={params.locale as string}
              pages={pages}
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
            />
          ) : (
            <span>Навигация не найдена</span>
          )}
        </section>
      </div>
    </nav>
  );
};

