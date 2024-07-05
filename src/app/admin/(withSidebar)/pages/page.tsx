//temporary
"use client";
import { CreatePageDialog } from "@/features/PageDialog/CreatePageDialog";
import { PagesListTable } from "@/widgets";

const mockPages = JSON.parse(localStorage.getItem("pages") || "[]");

export default function PagesPage() {
  return (
    <section className="h-full">
      <CreatePageDialog />
      <PagesListTable
        pages={mockPages.filter((page: any) => page.navigation_id === null)}
      />
    </section>
  );
}
