"use client";

import { EditWidgetContentDialog } from "@/features";
import { Button } from "@/shared/ui";
import {
  CardsEditModal,
  CarouselEditModal,
  ListEditModal,
  TextEditModal,
} from "@/widgets";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DeleteIcon } from "lucide-react";
import { useState } from "react";
import { PageEditorContentItem } from "./PageEditorContentItem";
const widgetsList = [
  { name: "Cards", modal: <CardsEditModal /> },
  { name: "Carousel", modal: <CarouselEditModal /> },
  { name: "List", modal: <ListEditModal /> },
  { name: "Text", modal: <TextEditModal /> },
];
export const PageEditorContent = () => {
  const [list, setList] = useState<any[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getLiPos = (id: UniqueIdentifier) =>
    list.findIndex((li) => li.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) return;
    if (over)
      setList((list) => {
        const originalPos = getLiPos(active.id);
        const newPos = getLiPos(over.id);

        return arrayMove(list, originalPos, newPos);
      });
  };
  const onWidgetDelete = (id: number) => {
    setList(list.filter((li) => li.id !== id));
  };
  return (
    <section className="h-[calc(100vh-200px)] w-[90%] grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5">
      <section className="flex flex-col gap-2">
        <h3>Список виджетов</h3>
        {widgetsList.map((widget) => (
          <span
            className=" cursor-pointer px-5 py-3 rounded-sm text-center bg-slate-200"
            key={widget.name}
            onClick={() => {
              setList([
                ...list,
                { id: list.length + 1, name: widget.name, modal: widget.modal },
              ]);
            }}
          >
            {widget.name}
          </span>
        ))}
      </section>
      <section>
        <h3 className="text-center mb-2">Контент</h3>
        {list.length == 0 && (
          <h4 className="text-center text-xl text-slate-500">Нет контента</h4>
        )}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <ul className="flex flex-col gap-3">
            <SortableContext
              items={list}
              strategy={verticalListSortingStrategy}
            >
              {list.map((item) => (
                <PageEditorContentItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  deleteBtn={
                    <Button
                      size={"icon"}
                      onClick={() => onWidgetDelete(item.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  }
                  editContentBtn={
                    <EditWidgetContentDialog modal={item.modal} />
                  }
                />
              ))}
            </SortableContext>
          </ul>
        </DndContext>
      </section>
    </section>
  );
};
