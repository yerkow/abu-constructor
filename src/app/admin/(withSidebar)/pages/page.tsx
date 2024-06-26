import { PageDialog } from "@/features";
import { PagesListTable } from "@/widgets";

export default function PagesPage() {
  return (
    <section className="h-full">
      <PageDialog variant="create" />
      <PagesListTable />
    </section>
  );
}
