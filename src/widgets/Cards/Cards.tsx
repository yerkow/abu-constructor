import { cn } from "@/shared/lib/utils";
import { Card, CardProps } from "./Card";

interface CardsProps {
  title: string;
  variant: "base" | "horizontal";
  items: Omit<CardProps, "variant">[];
}
export const Cards = ({ title, variant, items }: CardsProps) => {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div
        className={cn(
          variant == "base"
            ? "grid grid-cols-[auto] sm:grid-cols-[auto_auto] md:grid-cols-[auto_auto_auto] lg:grid-cols-[repeat(3_auto)]  gap-10 "
            : "flex flex-col gap-2",
        )}
      >
        {items.map((i, idx) => (
          <Card key={idx} variant={variant} {...i} />
        ))}
      </div>
    </section>
  );
};
