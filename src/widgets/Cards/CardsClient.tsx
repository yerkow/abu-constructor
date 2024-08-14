"use client";
import { cn } from "@/shared/lib/utils";
import { Card } from "./Card";
import { IWidget } from "@/app/[locale]/[...slug]/page";

import { useParams } from "next/navigation";

// interface CardsProps {
//   title: string;
//   variant: "base" | "horizontal";
//   items: Omit<CardProps, "variant">[];
// }

export function CardsClient({ contents, options }: Pick<IWidget, "options" | "contents">) {
  const params = useParams()
  const locale = params.locale as string
  console.log(contents)
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">
        {options?.title[locale]?.toLocaleUpperCase()}
      </h2>
      <div
        className={cn(
          options.variant == "base"
            ? "grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-2",
          "mt-2"
        )}
      >
        {contents.map(({ content }, idx) => (
          <Card key={idx} variant={options.variant} content={content} />
        ))
        }
      </div>
    </section>
  );
};
