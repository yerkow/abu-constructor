import React from "react";

import Link from "next/link";
import { DeleteIcon, Loader2, Settings } from "lucide-react";

import { useNavigationPageContent } from "./model/useNavigationPageContent";
import { handleDragEnd } from "./lib";

import { useDragAndDrop } from "@/shared/lib/hooks/useDrag&Drop";
import { Button } from "@/shared/ui";
import { IWidget } from "@/shared/types";

export const NavigationPageItems = ({
  trans,
  id,
}: {
  trans: any;
  id: string;
}) => {
  const { handleDragStart, handleDrop } =
    useDragAndDrop<IWidget>(handleDragEnd);

  const { widgets, isFetching, handleWidgetDelete, handleWidgetUpdate } =
    useNavigationPageContent(id);

  return (
    <section className="flex grow bg-slate-500 flex-col gap-3  p-3">
      <h2 className="text-center mb-2 text-white font-bold">
        {trans("rightTitle")}
      </h2>
      <section>
        {isFetching && (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin w-10 h-10 align-middle" />
          </div>
        )}
        {widgets?.length === 0 ? (
          <section className="flex justify-center items-center">
            <h1>В этой странице нет контента</h1>
          </section>
        ) : (
          <ul className="flex flex-col gap-2">
            {widgets?.map((widget) => (
              <li
                key={widget.id}
                className="flex justify-between items-center gap-2 rounded-sm px-5 py-3 bg-slate-100 cursor-grab"
                draggable
                onDragStart={(e) => handleDragStart(e, widget)}
                onDrop={(e: React.DragEvent<HTMLLIElement>) =>
                  handleDrop(e, widget, handleWidgetUpdate)
                }
                onDragOver={(e) => e.preventDefault()}
              >
                <span>{widget.widget_type}</span>
                <section className="flex gap-2">
                  <Button
                    size={"icon"}
                    onClick={() => handleWidgetDelete(widget.id)}
                  >
                    <DeleteIcon className="cursor-pointer" />
                  </Button>
                  <Link
                    className="bg-[#640000] text-white text-center rounded-md p-2"
                    href={{ pathname: `${id}/widget/${widget.id}` }}
                  >
                    <Settings />
                  </Link>
                </section>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};
