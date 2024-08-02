"use client";

import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavlinkProps extends LinkProps {
  children: ReactNode;
}
export const Navlink = ({ href, children }: NavlinkProps) => {
  const path = usePathname();
  const { locale } = useParams();

  return (
    <Link
      className={clsx(
        "font-bold text-lg md:text-2xl",
        path == `/${locale}${href}` && "underline",
      )}
      href={`/${locale}/${href}`}
    >
      {children}
    </Link>
  );
};
