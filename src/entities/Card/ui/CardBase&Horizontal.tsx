"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { backendImageUrl } from "@/shared/lib/constants";
import clsx from "clsx";

export const CardBaseAndHorizontal = ({
  content,
  locale,
  variant,
  size = "normal",
  currentPath,
}: {
  content: any;
  variant: string;
  locale: string;
  size: string;
  currentPath: string;
}) => {
  const { title, content: description } = content[locale];
  const hasDescription = Boolean(description && description.length > 0);

  console.log(content);

  const variantClasses = {
    base: "flex-1 min-w-[300px]",
    with_file: "flex-1 min-w-[300px]",
    with_modal: "flex-1 min-w-[300px]",
    horizontal: "col-start-1 col-end-2",
  }[variant];

  const sizeClasses = {
    normal: "h-[200px]",
    medium: "h-[350px]",
    large: "h-[550px]",
  }[size];

  console.log(currentPath);

  const WrapperComponent =
    content.file || content.link
      ? (Link as React.ElementType)
      : ("div" as "div");
  const linkProps = content.file
    ? { href: `${backendImageUrl}/${content.file}`, target: "_blank" }
    : content.link
      ? { href: `${currentPath}/${content.link}` }
      : {};

  return (
    <article className={clsx(variantClasses, "rounded-md")}>
      <WrapperComponent
        {...linkProps}
        className="block after:rounded-md after:absolute rounded-2xl relative overflow-hidden shadow-md"
      >
        {renderContent()}
      </WrapperComponent>
    </article>
  );

  function renderContent() {
    return (
      <div className={clsx(sizeClasses)}>
        <section
          className={clsx(
            hasDescription ? "h-[70%]" : "h-[100%]",
            "w-full relative"
          )}
        >
          {content.image ? (
            <>
              <Image
                src={`${backendImageUrl}${content.image}`}
                fill
                objectFit="cover"
                objectPosition="top"
                alt="image"
                className="rounded-md"
              />
              {!hasDescription && (
                <>
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  <h2 className="text-white font-bold text-xl relative px-2 flex w-full h-full items-center justify-center">
                    {title}
                  </h2>
                </>
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-[#640000]">
              <h2 className="text-white text-center font-bold text-xl relative px-2 flex w-full h-full items-center justify-center">
                {title}
              </h2>
            </div>
          )}
        </section>

        {hasDescription && (
          <div className="p-3">
            <h2 className="font-bold text-xl">{title}</h2>
            <p
					className="text-justify"
					dangerouslySetInnerHTML={{
                __html:
                  variant === "horizontal"
                    ? description
                    : description.length > 110
                      ? `${description.slice(0, 110)}...`
                      : description,
              }}
            ></p>
          </div>
        )}
      </div>
    );
  }
};