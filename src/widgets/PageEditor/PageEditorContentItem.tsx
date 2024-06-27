import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";

interface PageEditorContentItemProps {
  id: number;
  name: string;
  deleteBtn: ReactNode;
  editContentBtn: ReactNode;
}
export const PageEditorContentItem = ({
  id,
  name,
  deleteBtn,
  editContentBtn,
}: PageEditorContentItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        type: "Item",
        column: name,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li className="flex justify-between items-center gap-2">
      <span
        className="w-full rounded-sm px-5 py-3 bg-slate-100 cursor-grab "
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        {name}
      </span>
      <section className="flex gap-2">
        {editContentBtn}

        {deleteBtn}
      </section>
    </li>
  );
};
