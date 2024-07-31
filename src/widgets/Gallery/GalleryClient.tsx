"use client";
import { backendImageUrl } from "@/shared/lib/constants";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/shared/ui";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

export interface GalleryProps {
  items: GalleryItem[];
}
interface GalleryItem {
  image: string;
}

function GalleryClient({ items }: GalleryProps) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="grid gap-4 justify-center w-full">
      <div className="grid flex-nowrap   grid-cols-gallery lg:grid-cols-4 gap-4 overflow-x-auto">
        {items.map((item, idx) => (
          <Dialog key={idx}>
            <DialogTrigger>
              <div
                onClick={() => setSelected(idx)}
                className={clsx(
                  "relative cursor-pointer w-[180px] h-[180px]  md:h-[200px] md:w-[200px] rounded-md bg-slate-50",
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
            </DialogTrigger>
            <DialogContent className=" rounded-md min-w-[calc(100vw-100px)] h-auto  ">
              <DialogHeader>
                <DialogTitle className="opacity-0">Gallery modal</DialogTitle>
                <DialogDescription className="opacity-0">
                  There you can see selected image
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-center">
                <div
                  onClick={() => setSelected(idx)}
                  className={clsx(
                    "relative w-[290px] h-[290px] sm:w-[320px] sm:h-[320px] md:w-[420px] md:h-[420px]  lg:w-[520px] lg:h-[520px]",
                  )}
                >
                  <Image
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover rounded-md"
                    fill
                    src={`${backendImageUrl}/${item.image}`}
                    alt=""
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
export { GalleryClient };
