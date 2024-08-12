import { cn } from "@/shared/lib/utils";
import { Card, CardProps } from "./Card";

interface CardsProps {
  title: string;
  variant: "base" | "horizontal";
  items: Omit<CardProps, "variant">[];
}
function Cards({ title, variant, items }: CardsProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">
        {String(title).toLocaleUpperCase()}
      </h2>
      <div
        className={cn(
          variant == "base"
            ? "grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-2",
          "mt-2"
        )}
      >
        {items.map((i, idx) => (
          <Card key={idx} variant={variant} {...i} />
        ))}
      </div>
    </section>
  );
};

Cards.displayName = "Cards";
export default Cards;