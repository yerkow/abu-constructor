import { backendImageUrl } from "@/shared/lib/constants";
import { cn } from "@/shared/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui";
import React from "react";

export const CardWithModal = ({
  content,
  locale,
}: {
  content: any;
  variant: string;
  locale: string;
}) => {
  const { title, content: text } = content[locale];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="flex items-center justify-center after:rounded-md after:absolute rounded-2xl relative overflow-hidden shadow-md flex-1 min-w-[300px] min-h-[150px] p-10 bg-cover bg-center text-white"
          style={{
            backgroundImage: `url('${backendImageUrl}${content.image}')`,
          }}
        >
          <div
            className={cn(
              "absolute",
              {
                true: "inset-0 bg-black opacity-35",
                false: "inset-0 bg-[#640000]",
              }[String(content.image != undefined)]
            )}
          ></div>
          <h2 className="font-bold text-xl text-center relative">{title}</h2>
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
