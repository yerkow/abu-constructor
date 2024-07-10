import { CreatePageDialog } from "@/features/PageDialog/CreatePageDialog";
import { customFetch } from "@/shared/api";
import { getPages } from "@/shared/api/pages";
import { combinePagesByLang } from "@/shared/lib/utils";
import { PagesListTable } from "@/widgets";

export default async function PagesPage() {
  return (
    <section className="h-full">
      <CreatePageDialog />
      <PagesListTable />
    </section>
  );
}
