"use client";
import { EditWidgetContentDialog } from "@/features";
import { capitalize } from "@/shared/lib";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/shared/ui";
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
import {
  createWidget,
  deleteWidget,
  editWidget,
  getWidgets,
} from "@/shared/api/widgets";
import { queryClient } from "@/shared/lib/client";
import { usePathname, useSearchParams } from "next/navigation";
import { LinksEditModal } from "@/widgets/Links/LinksEditModal";
const widgetsList = ["Cards", "Carousel", "List", "Text", "Links"];
//TODO: Pass it there, not in EditBtn
const getModal = (
  modal: string,
  order: number,
  ruPageId: string | null,
  kzPageId: string | null,
) => {
  if (ruPageId && kzPageId) {
    const baseProps = {
      order,
      ruPageId: +ruPageId,
      kzPageId: +kzPageId,
      queryKey: "pageEditWidgets",
    };

    switch (modal) {
      case "Cards":
        return <CardsEditModal {...baseProps} />;
      case "Carousel":
        return <CarouselEditModal {...baseProps} />;
      case "List":
        return <ListEditModal {...baseProps} />;
      case "Text":
        return <TextEditModal {...baseProps} />;
      case "Links":
        return <LinksEditModal {...baseProps} />;
    }
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
    queryKey: [`pageEditWidgets`],
    queryFn: async () => {
      if (!forTemplate) {
        const data = await getWidgets(ids);
        return data;
      }
    },
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (forTemplate) {
      setList([]);
      queryClient.removeQueries({ queryKey: ["pageEditWidgets"] });
    }
  }, [forTemplate]);
  useEffect(() => {
    if (!isFetching && data)
      setList(
        data
          .map((widget) => ({
            id: widget.order,
            name: widget.widget_type,
            props: widget,
          }))
          .sort((a, b) => a.id - b.id),
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
  const onWidgetDelete = async (id: number) => {
    const widgetToDelete = list.find((li) => li.id === id);
    if (widgetToDelete && widgetToDelete.props) {
      deleteMutation({
        id: widgetToDelete.props.ruId,
        navigation_id: widgetToDelete.props.ru_navigation_id,
      }),
        deleteMutation({
          id: widgetToDelete.props.kzId,
          navigation_id: widgetToDelete.props.kz_navigation_id,
        });
    }
    updateOrder(list.filter((li) => li.id !== id));
  };

  const updateOrder = async (listState: typeof list) => {
    try {
      const updatedList = listState.map((li, idx) => {
        if (li.props && ruId && kzId) {
          editWidget({
            id: li.props.ruId,
            body: { order: idx + 1 },
            navigation_id: +ruId,
          }),
            editWidget({
              id: li.props.kzId,
              body: { order: idx + 1 },
              navigation_id: +kzId,
            });
          return { ...li, id: idx + 1 };
        } else {
          return { ...li, id: idx + 1 };
        }
      });
      setList(updatedList);
    } catch (error) {
      console.error("Error updating widget order:", error);
    }
  };
  const ruId = useSearchParams().get("ruId");
  const kzId = useSearchParams().get("kzId");
  const templateSave = () => {
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
  };
  const onSave = () => {
    updateOrder(list);
  };

  return (
    <section>
      <section className=" h-[calc(100vh-300px)] w-[90%] grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5">
        <section className="flex flex-col gap-2">
          <h3>Список виджетов</h3>
          {widgetsList.map((widget) => (
            <span
              className=" cursor-pointer px-5 py-3 rounded-sm text-center bg-slate-200"
              key={widget}
              onClick={() => {
                if (!isFetching)
                  setList([...list, { id: list.length + 1, name: widget }]);
              }}
            >
              {widget}
            </span>
          ))}
        </section>
        <section>
          <h3 className="text-center mb-2">Контент</h3>
          {isFetching ? (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin w-10 h-10 align-middle" />
            </div>
          ) : list.length == 0 ? (
            <h4 className="text-center text-xl text-slate-500">Нет контента</h4>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
            >
              <ul className="max-h-[600px] overflow-auto flex flex-col gap-3">
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
                        <DeleteWidgetDialog
                          name={item.name}
                          loading={deleteIsPending}
                          deleteWidget={() => onWidgetDelete(item.id)}
                        />
                      }
                      editContentBtn={
                        forTemplate ? (
                          <></>
                        ) : (
                          <EditWidgetContentDialog
                            name={item.name}
                            modal={getModal(item.name, item.id, ruId, kzId)}
                          />
                        )
                      }
                    />
                  ))}
                </SortableContext>
              </ul>
            </DndContext>
          )}
        </section>
      </section>
      <Button
        onClick={forTemplate ? templateSave : onSave}
        className="w-full  col-span-2 align-self-end"
      >
        {!forTemplate ? "Изменить порядок виджетов" : "Coxранить"}
      </Button>
    </section>
  );
};

const DeleteWidgetDialog = ({
  name,
  loading,
  deleteWidget,
}: {
  name: string;
  loading: boolean;
  deleteWidget: () => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <DeleteIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Удаление виджета</DialogHeader>
        <DialogDescription>
          Вы действительно хотите удалить виджет {name}
        </DialogDescription>
        <DialogFooter className="flex gap-10">
          <Button
            className="flex-1"
            disabled={loading}
            size={"icon"}
            onClick={deleteWidget}
          >
            Удалить
          </Button>
          <DialogClose asChild className="flex-1">
            <Button type="button" variant="secondary" className="w-full">
              Отменить
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
