"use client";

import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavlinkProps extends LinkProps {
  children: ReactNode;
}
export const Navlink = ({ href, children }: NavlinkProps) => {
  const path = usePathname();

  return (
    <Link
      className={clsx(
        "font-bold text-lg md:text-2xl",
        path == href && "underline",
      )}
      href={href}
    >
      {children}
    </Link>
  );
};
