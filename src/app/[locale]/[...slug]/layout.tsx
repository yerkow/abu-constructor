import { getNavbarPages } from "@/shared/api/pages";
import { BreadCrumbs, Header } from "@/widgets";
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
      <main className="max-w-[1200px] min-h-[calc(100svh-328px)] mx-auto   mb-10 mt-24 ">
        <BreadCrumbs locale={params.locale} slug={params.slug} pages={pages} />
        <div className="shadow-lg rounded-3xl flex p-10  flex-col gap-10">
          {children}
        </div>
      </main>
      <footer className="w-full h-20 bg-cyan-400"></footer>
    </section>
  );
}
