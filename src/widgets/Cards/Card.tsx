"use client";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export interface CardProps {
  variant: "horizontal" | "base";
  content: string;
  image: string;
  date: string;
  title: string;
  href?: string;
}
export const Card = ({
  variant,
  href,
  content,
  image,
  date,
  title,
}: CardProps) => {
  const Comp = href ? (Link as React.ElementType) : ("div" as "div");
  const params = useParams();

  return (
    <Comp
      href={`/${params.locale}${href}`}
      className={cn(
        {
          horizontal:
            "w-full grid grid-cols-[1fr_2fr] gap-2 h-[200px]  after:bottom-0 after:top-0  after:left-0 after:-right-[3px]",
          base: "flex w-full  flex-col",
        }[variant],
        "after:rounded-md after:absolute rounded-2xl relative overflow-hidden shadow-md"
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
            ? content
            : content.length > 110
              ? `${content.slice(0, 110)}...`
              : content}
        </p>
      </div>
    </Comp>
  );
};
