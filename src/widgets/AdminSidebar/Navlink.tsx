"use client";

import { cn } from "@/shared/lib/utils";
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
      className={cn(
        "font-bold text-lg md:text-2xl",
        path == href && "underline"
      )}
      href={href}
    >
      {children}
    </Link>
  );
};
