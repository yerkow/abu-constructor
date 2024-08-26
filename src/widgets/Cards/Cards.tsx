import { cn } from "@/shared/lib/utils";
import { Card } from "./Card";

function Cards({
  contents,
  options: { content, variant },
  locale,
}: {
  contents: Array<any>;
  options: any;
  locale: string;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">
        {content[locale]?.title.toLocaleUpperCase()}
      </h2>
      <div
        className={cn(
          variant == "base"
            ? "flex gap-10 flex-wrap"
            : "flex flex-col gap-2",
          "mt-2"
        )}
      >
        {contents.map(({ content }, idx) => (
          <Card
            key={idx}
            variant={variant}
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
