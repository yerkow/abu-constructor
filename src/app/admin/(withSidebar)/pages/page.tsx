import { CreatePageDialog, withNoSSR } from "@/features";
import { customFetch } from "@/shared/api";
import { getPages } from "@/shared/api/pages";
import { combinePagesByLang } from "@/shared/lib/utils";
import { PagesListTable } from "@/widgets";
function PagesPage() {
  return (
    <section className="h-full">
      <CreatePageDialog />
      <PagesListTable />
    </section>
  );
}
export default withNoSSR(PagesPage);
