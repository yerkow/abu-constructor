import { PageDialog } from "@/features";
import { PagesListTable } from "@/widgets";
export const mockPages = new Array(20)
  .fill({
    ru: "Главная",
    kz: "Басты",
    slug: "/",
  })
  .map((page, idx) => ({ ...page, id: idx + 1 }));
export default function PagesPage() {
  return (
    <section className="h-full">
      <PageDialog variant="create" />
      <PagesListTable pages={mockPages} />
    </section>
  );
}
