import { INavigation } from "@/shared/lib/types";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface DropNavigationProps {
  item: INavigation;
  locale: string;
  handleMouseLeave: () => void;
  scrolled: boolean;
  dropdownPosition: number | null;
}

export const DropNavigation = ({
  handleMouseLeave,
  item,
  locale,
  scrolled,
  dropdownPosition,
}: DropNavigationProps) => {
  const path = usePathname();

  return (
    <section
      onMouseLeave={handleMouseLeave}
      className={clsx(
        "absolute left-0 pt-3 w-full bg-[#640000] h-[350px] px-10",
        scrolled ? "top-[94px]" : "top-[134px]"
      )}
      style={{ top: dropdownPosition ?? (scrolled ? 94 : 134) }} // Использование вычисленной позиции или fallback
    >
      <ul className="flex justify-center gap-[60px]">
        {item.children.map((child) => (
          <li key={child.id}>
            {child.navigation_type === "content" || child.navigation_type === "group-link" ? (
              <Link
                href={`/${locale}/${item.slug}/${child.slug}`}
                className={clsx(
                  "text-white font-bold text-[24px]",
                  path === `/${locale}${child.slug}` && "font-bold"
                )}
              >
                {child.title[locale]}
              </Link>
            ) : (
              <h2 className="text-white font-bold text-[24px]">{child.title[locale]}</h2>
            )}
            {child.children.length > 0 && (
              <ul className="mt-4 flex flex-col gap-3">
                {child.children.map((subChild) => (
                  <li key={subChild.id} className="max-w-[400px]">
                    <Link
                      href={`/${locale}/${item.slug}/${child.slug}/${subChild.slug}`}
                      className={clsx(
                        "text-center max-w-11 text-slate-200",
                        path === `/${locale}$/${child.slug}/${subChild.slug}` && "font-bold"
                      )}
                    >
                      {subChild.title[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
