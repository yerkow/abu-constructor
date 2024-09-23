import { IContent } from "@/shared/types";
import React from "react";
import { useDragAndDrop } from "@/shared/lib/hooks/useDrag&Drop";
import { handleDragEnd } from "../lib";
import { useMutation } from "@tanstack/react-query";
import { IContentUpdateOrderOptions } from "../model/types";
import { backendUrl } from "@/shared/lib/constants";
import { queryClient } from "@/shared/lib/client";

interface EditorItemProps {
  contents: IContent[] | undefined;
  CreateButton: any;
  EditButton: any;
}

export const EditorItems = ({
  contents,
  CreateButton,
  EditButton,
}: EditorItemProps) => {

  const { handleDragStart, handleDrop } = useDragAndDrop(handleDragEnd)


  const { mutate: handleContentOrderUpdate } = useMutation({
    mutationFn: async (
      options: IContentUpdateOrderOptions[]
    ) => {
      const response = await fetch(`${backendUrl}/contents/orders/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });
      return response.json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contents"],
      });
    },
  });

  return (
    <section className="mt-7">
      <h1 className="block font-bold text-center mb-4">Настройки контента</h1>
      {CreateButton}
      <ul className="mt-4 flex flex-col gap-3"
      >
        {contents?.map((content, idx) => (
          <li
            draggable
            onDragStart={(e) => handleDragStart(e, content)}
            onDrop={(e: React.DragEvent<HTMLLIElement>) =>
              handleDrop(e, content, handleContentOrderUpdate)
            }
            onDragOver={(e) => e.preventDefault()}
            key={content.id}
            className="flex justify-between items-center gap-2 rounded-sm px-5 py-3 bg-slate-100 cursor-grab"
          >
            <p>Элемент - #{content.id}</p>
            {EditButton(content.content, content.id)}
          </li>
        ))}
      </ul>
    </section>
  );
};
