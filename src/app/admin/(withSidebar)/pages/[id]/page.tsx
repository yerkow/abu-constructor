import { CreatePageDialog } from "@/features";
import { PagesListTable } from "@/widgets";

export default function Page({ params }: { params: { id: number } }) {
  return (
    <section>
      <section className="flex gap-4">
        {/* <CreatePageDialog parentPage={{}} /> */}
      </section>
      <h2 className="text-center text-xl font-bold">Дочерние страницы</h2>
      <PagesListTable pages={[]} />
    </section>
  );
}
