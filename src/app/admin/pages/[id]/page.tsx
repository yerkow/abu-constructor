import { CreatePageDialog, withNoSSR } from "@/features";
import { getPagesChildren } from "@/shared/api/pages";
import { PagesListTable } from "@/widgets";
interface PageProps {
  params: { id: string };
  searchParams: { ruId: number; kzId: number };
}
export default function Page({ params, searchParams }: PageProps) {
  return (
    <section>
      <section className="flex gap-4">
        <CreatePageDialog
          ruParentId={searchParams.ruId}
          kzParentId={searchParams.kzId}
          slug={`${decodeURIComponent(params.id)}/`}
        />
      </section>
      <h2 className="text-center text-xl font-bold">Дочерние страницы</h2>
      <PagesListTable ids={searchParams} />
    </section>
  );
}
