import { Button } from "@/shared/ui";
import clsx from "clsx";
import { ComponentProps } from "react";
import { Navlink } from "./Navlink";
import { ChangeLocale } from "@/features";
import { getTranslations } from "next-intl/server";

const links = [
  { label: "Главная", href: "/admin" },
  { label: "Настройки", href: "/admin/settings" },
  { label: "Страницы", href: "/admin/pages" },
  { label: "Шаблоны", href: "/admin/pages/templates" },
];
export const AdminSidebar = async ({
  className,
  ...props
}: ComponentProps<"nav">) => {
  const t = await getTranslations("sidebar.links");
  const keys = ["home", "settings", "pages", "templates"] as const;

  return (
    <nav
      className={clsx(
        className,
        "flex z-10 items-center md:items-start md:static flex-row md:flex-col fixed left-0 right-0 h-20 justify-center md:justify-between gap-3 bg-slate-950 text-white p-10 md:h-full",
      )}
      {...props}
    >
      <ChangeLocale />
      <div className="flex flex-row md:flex-col gap-3">
        {keys.map((key) => (
          <Navlink key={key} href={t(`${key}.href`)}>
            {t(`${key}.label`)}
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
