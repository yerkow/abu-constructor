"use client";
import { CreatePageDialog } from "@/features";
import { PagesListTable } from "@/widgets";

const mockPages = JSON.parse(localStorage.getItem("pages") || "[]");
export default function Page({ params }: { params: { id: number } }) {
  const parentPage = mockPages.filter((page: any) => page.id == params.id)[0];
  console.log(mockPages);

  return (
    <section>
      <section className="flex gap-4">
        <CreatePageDialog parentPage={parentPage} />
      </section>
      <h2 className="text-center text-xl font-bold">Дочерние страницы</h2>
      <PagesListTable
        pages={mockPages.filter((page: any) => page.navigation_id == params.id)}
      />
    </section>
  );
}
