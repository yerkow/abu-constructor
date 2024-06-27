import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";
import { ComponentProps } from "react";
import { Navlink } from "./Navlink";

const links = [
  { label: "Главная", href: "/admin" },
  { label: "Настройки", href: "/admin/settings" },
  { label: "Страницы", href: "/admin/pages" },
  { label: "Шаблоны", href: "/admin/pages/templates" },
];
export const AdminSidebar = ({
  className,
  ...props
}: ComponentProps<"nav">) => {
  return (
    <nav
      className={cn(
        className,
        "flex z-10 items-center md:items-start md:static flex-row md:flex-col fixed left-0 right-0 h-20 justify-center md:justify-between gap-3 bg-slate-950 text-white p-10 md:h-full"
      )}
      {...props}
    >
      <div className="flex flex-row md:flex-col gap-3">
        {links.map((link) => (
          <Navlink key={link.label} href={link.href}>
            {link.label}
          </Navlink>
        ))}
      </div>
      <Button
        variant={"outline"}
        className="text-black font-bold md:justify-self-center md:w-full"
      >
        Выйти
      </Button>
    </nav>
  );
};
