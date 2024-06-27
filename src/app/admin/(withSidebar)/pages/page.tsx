import { PageDialog } from "@/features";
import { PagesListTable } from "@/widgets";
const pageType = ["content", "group"];
function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const mockPages = Array.from({ length: 20 }, (_, idx) => ({
  ru: `Страница ${idx + 1}`,
  kz: `Бет ${idx + 1}`,
  type: getRandomNumber(1, 10) > 5 ? pageType[1] : pageType[0],
  slug: `/page-${idx + 1}`,
  id: idx + 1,
}));

export default function PagesPage() {
  return (
    <section className="h-full">
      <PageDialog withContent={false} variant="create" />
      <PagesListTable pages={mockPages} />
    </section>
  );
}
