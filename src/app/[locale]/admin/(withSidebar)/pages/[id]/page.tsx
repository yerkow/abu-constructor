import { getTranslations } from "next-intl/server";
interface PageProps {
  params: { id: string, locale: string }
}
export default async function Page({ params }: PageProps) {
  console.log(params.id);
  const t = await getTranslations("pages.id");
  return (
    <section>
      {/* <section className="flex gap-4">
        <CreatePageDialog
          ruParentId={searchParams.ruId}
          kzParentId={searchParams.kzId}
          slug={`${decodeURIComponent(params.id)}/`}
        />
      </section>
      <h2 className="text-center text-xl font-bold">{t("title")}</h2>
      <PagesListTable ids={searchParams} /> */}
    </section>
  );
}
