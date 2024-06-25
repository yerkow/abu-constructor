import { Button } from "@/shared/ui";
import { headers } from "next/headers";
import { Navlink } from "./Navlink";

const links = [
  { label: "Главная", href: "/admin" },
  { label: "Настройки", href: "/admin/settings" },
  { label: "Страницы", href: "/admin/pages" },
];
export const AdminSidebar = () => {
  const headersList = headers();
  return (
    <nav className="flex flex-col  justify-between gap-3 bg-slate-950 text-white p-10 h-full">
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <Navlink key={link.label} href={link.href}>
            {link.label}
          </Navlink>
        ))}
      </div>
      <Button
        variant={"outline"}
        className="text-black font-bold justify-self-center"
      >
        Выйти
      </Button>
    </nav>
  );
};
