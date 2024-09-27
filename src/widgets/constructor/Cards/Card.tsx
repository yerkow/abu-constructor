"use client";
import { useParams } from "next/navigation";
import { CardBaseAndHorizontal, CardWithModal } from "@/entities/Card";
export const Card = ({
  content,
  locale,
  variant,
  size,
}: {
  content: any;
  variant: string;
  locale: string;
  size: string;
}) => {
  const params = useParams();
  const slugs = params.slug as string[];
  const currentPath = slugs[slugs.length - 1];

  switch (variant) {
    case "base":
    case "horizontal":
    case "with_file":
      return (
        <CardBaseAndHorizontal
          content={content}
          variant={variant}
          locale={locale}
          currentPath={currentPath}
          size={size}
        />
      );
    case "with_modal":
      return (
        <CardWithModal content={content} variant={variant} locale={locale} size={size} />
      );
  }
};
