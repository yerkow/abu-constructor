import { cn } from "@/shared/lib/utils";
import { Card } from "./Card";

function Cards({
  contents,
  options,
  locale,
}: {
  contents: Array<any>;
  options: any;
  locale: string;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">
        {options?.title[locale]?.toLocaleUpperCase()}
      </h2>
      <div
        className={cn(
          options.variant == "base"
            ? "flex gap-10 flex-wrap"
            : "flex flex-col gap-2",
          "mt-2"
        )}
      >
        {contents.map(({ content }, idx) => (
          <Card
            key={idx}
            variant={options.variant}
            content={content}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}

Cards.displayName = "Cards";
export default Cards;
