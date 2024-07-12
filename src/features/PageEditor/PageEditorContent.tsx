"use client";
import { EditWidgetContentDialog } from "@/features";
import { capitalize } from "@/shared/lib";
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
import { DeleteIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { PageEditorContentItem } from "./PageEditorContentItem";
import { SubmitHandler } from "react-hook-form";
import { Langs, Template } from "@/shared/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createWidget, deleteWidget, getWidgets } from "@/shared/api/widgets";
import { queryClient } from "@/shared/lib/client";
const widgetsList = ["Cards", "Carousel", "List", "Text"];
//TODO: Pass it there, not in EditBtn
const getModal = (modal: string) => {
  switch (modal) {
    case "Cards":
      return <CardsEditModal />;
    case "Carousel":
      return <CarouselEditModal />;
    case "List":
      return <ListEditModal />;
    case "Text":
      return <TextEditModal />;
  }
};
export const PageEditorContent = ({
  onTemplateSave,
  ids,
  forTemplate,
  templateId,
}: {
  onTemplateSave?: () => void;
  ids: Langs;
  forTemplate?: boolean;
  templateId?: number;
}) => {
  const {
    data,
    isFetching,
    error: fetchError,
  } = useQuery({
    queryKey: [`getWidgets`],
    queryFn: async () => {
      const data = await getWidgets(ids);
      return data;
    },
  });
  useEffect(() => {
    if (!isFetching && data)
      setList(
        data.map((widget) => ({
          id: widget.order,
          name: widget.widget_type,
          props: widget,
        })),
      );
  }, [data, isFetching]);
  const {
    mutate: deleteMutation,
    isPending: deleteIsPending,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteWidget,
    mutationKey: ["templateWidget"],
    onSuccess: () => {
      if (onTemplateSave) onTemplateSave();
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: createWidget,
    mutationKey: ["templateWidget"],
    onSuccess: () => {
      if (onTemplateSave) onTemplateSave();
    },
  });
  const [list, setList] = useState<any[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
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
    setList(
      list.filter((li) => {
        if (li.id == id) {
          if (li.props) {
            deleteMutation({
              id: li.props.ruId,
              navigation_id: li.props.ru_navigation_id,
            });
            deleteMutation({
              id: li.props.kzId,
              navigation_id: li.props.kz_navigation_id,
            });
          }
          return false;
        }
        return true;
      }),
    );
  };

  return (
    <section className="h-[calc(100vh-200px)] w-[90%] grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5">
      <section className="flex flex-col gap-2">
        <h3>Список виджетов</h3>
        {widgetsList.map((widget) => (
          <span
            className=" cursor-pointer px-5 py-3 rounded-sm text-center bg-slate-200"
            key={widget}
            onClick={() => {
              setList([...list, { id: list.length + 1, name: widget }]);
            }}
          >
            {widget}
          </span>
        ))}
      </section>
      <section>
        <h3 className="text-center mb-2">Контент</h3>
        {deleteError && (
          <span className="text-red-500">{deleteError.message}</span>
        )}

        {isFetching && (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin w-10 h-10 align-middle" />{" "}
          </div>
        )}
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
                      disabled={deleteIsPending}
                      size={"icon"}
                      onClick={() => onWidgetDelete(item.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  }
                  editContentBtn={
                    forTemplate ? (
                      <></>
                    ) : (
                      <EditWidgetContentDialog
                        order={item.id}
                        modal={getModal(item.name)}
                      />
                    )
                  }
                />
              ))}
            </SortableContext>
          </ul>
        </DndContext>
      </section>

      {forTemplate && (
        <Button
          onClick={() => {
            list.map((li) => {
              if (templateId)
                mutate({
                  language_key: "ru",
                  widget_type: li.name,
                  order: li.id,
                  options: "",
                  navigation_id: templateId,
                });
            });
            // if (onTemplateSave) onTemplateSave();
          }}
          className="align-self-end"
        >
          Save
        </Button>
      )}
    </section>
  );
};
