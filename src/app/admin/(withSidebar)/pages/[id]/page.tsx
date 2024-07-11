import { CreatePageDialog } from "@/features";
import { getPagesChildren } from "@/shared/api/pages";
import { PagesListTable } from "@/widgets";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { ruId: number; kzId: number };
}) {
  return (
    <section>
      <section className="flex gap-4">
        <CreatePageDialog
          ruParentId={searchParams.ruId}
          kzParentId={searchParams.kzId}
          slug={`${params.id}/`}
        />
      </section>
      <h2 className="text-center text-xl font-bold">Дочерние страницы</h2>
      <PagesListTable ids={searchParams} />
    </section>
  );
}
