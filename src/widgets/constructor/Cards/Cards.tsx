import { cn } from "@/shared/lib/utils";
import { Card } from "./Card";
import { IWidgetProps } from "@/shared/types";

const Cards = ({
  contents,
  options: { content, variant, size},
  locale,
}: IWidgetProps) => {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">
        {content[locale]?.title.toLocaleUpperCase()}
      </h2>
      <div
        className={cn(
          variant == "base" || variant == "with_modal"
            ? "flex gap-8 flex-wrap"
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
            size={size}
          />
        ))}
      </div>
    </section>
  );
};

Cards.displayName = "Cards";
export default Cards;
