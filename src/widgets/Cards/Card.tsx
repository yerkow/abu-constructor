"use client";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export interface CardProps {
  variant: "horizontal" | "base";
  content: {
    [key: string]: {
      date: string;
      description: string;
      title: string;
      image: string;
    };
  };
  // href?: string;
}
export const Card = ({ content, variant }: CardProps) => {
  // const Comp = href ? (Link as React.ElementType) : ("div" as "div");
  const locale = useParams().locale as string;

  const { date, description, title, image } = content[locale];
  console.log(content)
  return (

    <article
      // href={`/${params.locale}${href}`}
      className={cn("after:rounded-md after:absolute rounded-2xl relative overflow-hidden shadow-md",
        {
          horizontal: "w-full grid grid-cols-[1fr_2fr] gap-2 h-[200px]  after:bottom-0 after:top-0  after:left-0 after:-right-[3px]",
          base: "flex w-full  flex-col",
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
          src={`http://77.243.80.138:81/media/${image}`}
          fill
          objectFit="cover"
          objectPosition="top"
          alt="image"
          className="absolute left-0 right-0 top-0 bottom-0"
        />
      </div>
      <div className="p-4">
        <span className="text-sm">{date}</span>
        <h2 className="font-bold text-xl">{title}</h2>
        <p className="text-justify">
          {variant === "horizontal"
            ? description
            : description.length > 110
              ? `${description.slice(0, 110)}...`
              : description}
        </p>
      </div>
    </article>
  );
};
