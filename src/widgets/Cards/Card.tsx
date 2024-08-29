'use client';
import { backendImageUrl } from "@/shared/lib/constants";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";


export const Card = ({
  content,
  locale,
  variant,
}: {
  content: any;
  variant: string;
  locale: string;
}) => {
  const params = useParams();
  const { title, content: text } = content[locale];
  const Component = content.link ? (Link as React.ElementType) : ("div" as "div");
  const slugs = params.slug as string[]
  const currentPath = slugs[slugs.length - 1]
  return (
    <article>
      <Component
        {...(content.link && { href: `${currentPath}/${content.link}` })}
        className={cn(
          "block after:rounded-md after:absolute rounded-2xl relative overflow-hidden shadow-md",
          {
            horizontal:
              "w-full grid grid-cols-[1fr_2fr] gap-2 h-[200px]  after:bottom-0 after:top-0  after:left-0 after:-right-[3px]",
            base: "flex-1 flex-grow-1 min-w-[300px]",
          }[variant]
        )}
      >
        <div
          className={cn(
            {
              base: "flex-grow-1 w-full h-[200px]",
              horizontal: "col-start-1 col-end-2",
            }[variant],
            "relative"
          )}
        >
          <Image
            src={`${backendImageUrl}${content.image}`}
            fill
            objectFit="cover"
            objectPosition="top"
            alt="image"
            className="absolute left-0 right-0 top-0 bottom-0"
          />
        </div>
        <div className="p-4">
          <h2 className="font-bold text-xl">{title}</h2>
          <p
            className="text-justify"
            dangerouslySetInnerHTML={{
              __html:
                variant === "horizontal"
                  ? text
                  : text?.length > 110
                    ? `${text.slice(0, 110)}...`
                    : text,
            }}
          ></p>
        </div>
      </Component>
    </article>
  );
};
