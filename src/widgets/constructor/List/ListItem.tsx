import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface ListItemProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
}
export const ListItem = ({ children, icon, href }: ListItemProps) => {
  return (
    <li className="font-bold cursor-pointer min-h-[90px] border-b-2 border-[#640000] flex items-center justify-start pl-5 bg-gray-50">
      <a
        target="_blank"
        href={href}
        className={cn(icon && "flex gap-2 w-full items-center")}
      >
        <span>{icon}</span> {children}
      </a>
    </li>
  );
};
