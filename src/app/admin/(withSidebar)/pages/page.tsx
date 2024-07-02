//temporary
"use client";
import { PageDialog } from "@/features";
import { PagesListTable } from "@/widgets";
const pageType = ["content", "group"];
function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const mockPages = JSON.parse(localStorage.getItem("pages") || "[]");

export default function PagesPage() {
  return (
    <section className="h-full">
      <PageDialog withContent={false} variant="create" />
      <PagesListTable pages={mockPages} />
    </section>
  );
}
