import { backendImageUrl } from "@/shared/lib/constants";
import clsx from "clsx";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui";
import React from "react";

export const CardWithModal = ({
  content,
  locale,
  size,
}: {
  content: any;
  variant: string;
  locale: string;
  size: string;
}) => {
  const { title, content: text } = content[locale];

  const sizeClasses = {
    normal: "h-[200px]",
    medium: "h-[350px]",
    large: "h-[550px]",
  }[size];

  const colors = [
    "from-rose-500 to-indigo-600",
    "from-cyan-400 to-blue-600",
    "from-emerald-400 to-cyan-600",
    "from-amber-400 to-orange-600",
    "from-purple-500 to-pink-600",
    "from-blue-400 to-indigo-600",
    "from-green-400 to-teal-600",
    "from-violet-500 to-purple-600",
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={clsx(
            sizeClasses,
            "flex cursor-pointer items-center justify-center after:rounded-md after:absolute rounded-2xl relative overflow-hidden shadow-md flex-1  min-h-[150px] p-6 bg-cover bg-center text-white"
          )}
          style={{
            backgroundImage: `url('${backendImageUrl}${content.image}')`,
          }}
        >
          <div
            className={clsx(
              "absolute",
              {
                true: "inset-0 bg-black opacity-35",
                false: `inset-0 bg-gradient-to-br ${colors[Math.floor(Math.random() * colors.length)]} opacity-75`,
              }[String(content.image != undefined)]
            )}
          ></div>
          <h2 className="font-bold   text-xl  text-center relative">
            {title.length > 70 ? `${title.slice(0, 70)}...` : title}
          </h2>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[80%] overflow-auto max-w-[90%] [@media(min-width:1180px)]:max-w-[50%]">
        <div
          className={`quill-content`}
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
      </DialogContent>
    </Dialog>
  );
};
