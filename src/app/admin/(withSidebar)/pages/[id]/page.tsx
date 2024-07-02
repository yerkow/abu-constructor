"use client";
import { PageDialog } from "@/features";
import { PagesListTable } from "@/widgets";

const mockPages = JSON.parse(localStorage.getItem("pages") || "[]");
export default function Page({ params }: { params: { id: number } }) {
  return (
    <section>
      <section className="flex gap-4">
        <PageDialog withContent={false} variant="create" parentId={params.id} />
      </section>
      <h2 className="text-center text-xl font-bold">Дочерние страницы</h2>
      <PagesListTable
        pages={mockPages.filter((page) => page.navigation_id == params.id)}
      />
    </section>
  );
}
