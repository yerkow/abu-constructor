"use client";
import { backendImageUrl } from "@/shared/lib/constants";
import { InfoItemProps } from "@/widgets/Info/Info";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export const InfoItem = ({
  title,
  content,
  image,
  imagePosition,
  linkText,
  href,
}: InfoItemProps) => {
  const { locale } = useParams();
  return (
    <div
      className={clsx(
        "flex  gap-10 bg-slate-50 p-3 rounded-md shadow-slate-400 shadow-sm",
        imagePosition == "left"
          ? "flex-col lg:flex-row "
          : "flex-col lg:flex-row-reverse",
      )}
    >
      <Image
        src={`${backendImageUrl}/${image}`}
        className="rounded-md   w-full h-auto"
        alt={title}
        width={400}
        height={400}
      />
      <div className="flex  flex-col gap-6">
        <h3 className="text-2xl text-cyan-500 font-bold">{title}</h3>
        <p className="text-lg">{content}</p>
        {href && (
          <Link
            className="text-lg text-cyan-500 border border-cyan-500 w-fit px-2 py-1 rounded-md "
            href={`/${locale}/${href}`}
          >
            {linkText}
          </Link>
        )}
      </div>
    </div>
  );
};
