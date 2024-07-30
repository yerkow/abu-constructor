import { getNavbarPages } from "@/shared/api/pages";
import { Separator } from "@/shared/ui";
import { BreadCrumbs, Header } from "@/widgets";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
const getPages = async (locale: string) => {
  const pages = await getNavbarPages(locale);
  return pages;
};

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string[]; locale: string };
}) {
  const pages = await getPages(params.locale);
  return (
    <section>
      <Header />
      <main className="max-w-[1200px] min-h-[100svh] overflow-y-auto mx-auto px-5 xl:px-0   mb-10 mt-20 ">
        <BreadCrumbs locale={params.locale} slug={params.slug} pages={pages} />
        <div className="shadow-lg rounded-3xl flex p-10  flex-col gap-10">
          {children}
        </div>
      </main>
      <footer className="w-full h-auto mt-16  bg-cyan-400 before:w-full before:h-10 relative before:absolute before:left-0 before:right-0 before:bg-footer-texture before:-top-10 before:text-cyan-500">
        <div className=" max-w-[1200px] mx-auto px-10 py-5 ">
          <div className=" flex flex-col gap-5 md:flex-row md:justify-between md:items-center mb-3 md:mb-10">
            <div className="flex flex-col gap-4 items-start">
              <h2 className="text-2xl mb-4 text-white">Навигация</h2>
              {pages
                .filter((page) => page.navigation_type === "content")
                .map((page) => (
                  <Link
                    className="text-xl text-white"
                    key={page.id}
                    href={`/${params.locale}${page.slug}`}
                  >
                    {page.title}
                  </Link>
                ))}
            </div>
            <div className="flex flex-col gap-4  text-white">
              <h2 className="text-2xl">Наши контакты</h2>
              <div className="flex flex-col gap-3">
                <div className="flex gap-4">
                  <Phone />
                  <a href="tel:+7 /7172/ 21-71-06">+7 /7172/ 21-71-06</a>
                </div>
                <div className="flex gap-4">
                  <Mail />
                  <a href="email:prof_adilet@mail.ru">prof_adilet@mail.ru</a>
                </div>
                <div className="flex gap-4">
                  <MapPin />
                  <span>Астана, проспект Абая, 38, офис 401</span>
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <span className="text-gray-600 block mt-14">
            ©{new Date().getFullYear()} Все права защищены.
          </span>
        </div>
      </footer>
    </section>
  );
}
