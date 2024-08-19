import { NavigationPageContent } from "@/widgets";

interface PageProps {
  params: { id: string; locale: string };
}
export default async function Page({ params }: PageProps) {
  return (
    <section>
      <NavigationPageContent params={params} />
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
