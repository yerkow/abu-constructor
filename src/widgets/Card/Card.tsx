import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";
interface CardProps {
  variant: "horizontal" | "base";
  children: ReactNode;
  src: string;
}
export const Card = ({ variant, children, src }: CardProps) => {
  return (
    <div
      className={cn(
        {
          horizontal:
            "w-full grid grid-cols-[1fr_2fr] h-[200px]  after:bottom-0 after:top-0   after:left-0 after:-right-[3px]  ",
          base: "flex w-[285px]  h-[308px] flex-col after:-bottom-[3px] after:top-0 after:left-0 after:right-0 ",
        }[variant],
        "after:bg-cyan-400 after:-z-10 after:rounded-md after:absolute gap-4 bg-slate-100 p-4 rounded-md relative"
      )}
    >
      <div className="flex-grow-1 h-[70%] relative ">
        <Image
          src={src}
          fill
          alt="te"
          className="absolute left-0 right-0 top-0 bottom-0 "
        />
      </div>
      <p className="">{children?.toString().slice(0, 90)}...</p>
    </div>
  );
};
