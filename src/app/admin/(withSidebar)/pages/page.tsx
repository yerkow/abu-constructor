import { CreatePageDialog } from "@/features/PageDialog/CreatePageDialog";
import { getPages } from "@/shared/api/pages";
import { PagesListTable } from "@/widgets";

const fetchPages = async () => {
  const pages = await getPages();
  return pages;
};

export default async function PagesPage() {
  const pages = await fetchPages();
  return (
    <section className="h-full">
      <CreatePageDialog />
      <PagesListTable pages={[]} />
    </section>
  );
}
