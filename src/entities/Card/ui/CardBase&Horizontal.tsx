"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { backendImageUrl } from "@/shared/lib/constants";
import { cn } from "@/shared/lib/utils";

export const CardBaseAndHorizontal = ({
  content,
  locale,
  variant,
  currentPath,
  size = "normal",
}: {
  content: any;
  variant: string;
  locale: string;
  currentPath: string;
  size: string;
}) => {
  const { title, content: text } = content[locale];

  const Component = content.link
    ? (Link as React.ElementType)
    : ("div" as "div");

  return (
    <article
      className={cn(
        {
          base: "flex-1 min-w-[300px]",
          horizontal: "col-start-1 col-end-2",
        }[variant]
      )}
    >
      <Component
        {...(content.link && { href: `${currentPath}/${content.link}` })}
        className={cn(
          "block after:rounded-md after:absolute rounded-2xl relative overflow-hidden shadow-md"
        )}
      >
        <div
          className={cn(
            {
              normal: "h-[200px]",
              medium: "h-[350px]",
              large: "h-[550px]",
            }[size],
            {
              true: "flex items-center justify-center text-white",
              false: "text-black",
            }[String(text == undefined)],
            "relative"
          )}
          style={{
            backgroundImage: !text
              ? `url('${backendImageUrl}${content.image}')`
              : "",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {variant === "base" && !text ? (
            <>
              <div className="absolute inset-0 bg-black opacity-35"></div>
              <h2 className="font-bold text-xl relative px-2">{title}</h2>
            </>
          ) : (
            <div>
              <Image
                src={`${backendImageUrl}${content.image}`}
                fill
                objectFit="cover"
                objectPosition="top"
                alt="image"
                className="absolute left-0 right-0 top-0 bottom-0"
              />
            </div>
          )}
        </div>
        {text && (
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
        )}
      </Component>
    </article>
  );
};
