import { CreatePageDialog } from "@/features";
import { getPagesChildren } from "@/shared/api/pages";
import { PagesListTable } from "@/widgets";

export default async function Page({
  searchParams,
}: {
  searchParams: { ruId: number; kzId: number };
}) {
  return (
    <section>
      <section className="flex gap-4">
        {/* <CreatePageDialog parentPage={{}} /> */}
      </section>
      <h2 className="text-center text-xl font-bold">Дочерние страницы</h2>
      <PagesListTable
        ruId={searchParams.ruId}
        kzId={searchParams.kzId}
        parentId={searchParams.ruId}
      />
    </section>
  );
}
