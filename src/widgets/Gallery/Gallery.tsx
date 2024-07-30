"use client";

import { backendImageUrl } from "@/shared/lib/constants";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

interface GalleryProps {
  items: GalleryItem[];
}
interface GalleryItem {
  image: string;
}
function deleteElementByIndex(arr: GalleryItem[], index: number) {
  arr.splice(index, 1);
  return arr;
}
export const Gallery = ({ items }: GalleryProps) => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="grid gap-4 justify-center w-full">
      <div className="flex relative w-[290px] h-[290px] md:w-[400px] md:h-[400px] justify-self-center">
        <Image
          className="rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={`${backendImageUrl}/${items[selected].image}`}
          alt=""
          fill
        />
      </div>
      <div className="grid flex-nowrap  grid-cols-gallery lg:grid-cols-4 gap-4 overflow-x-auto">
        {items.map((item, idx) => (
          <div
            onClick={() => setSelected(idx)}
            key={idx}
            className={clsx(
              "relative cursor-pointer w-[180px] h-[180px]  md:h-[200px] md:w-[200px] rounded-md bg-slate-50",
              idx == selected ? "hidden" : "block",
            )}
          >
            <Image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full   h-full object-cover rounded-md"
              fill
              src={`${backendImageUrl}/${item.image}`}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};
