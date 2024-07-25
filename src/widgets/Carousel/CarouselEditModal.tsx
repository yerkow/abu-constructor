"use client";
import { TemplatesSelect } from "@/features";
import { useTemplateWidget } from "@/shared/lib/hooks";
import { BackedPage } from "@/shared/lib/types";
import { Button, Checkbox, Label, WidgetView } from "@/shared/ui";
import { EditCarouselItem } from "@/widgets/Carousel/EditCarouselItem";
interface CarouselEditModalProps {
  variant?: "dialog" | "card";
  order: number;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
}
export const CarouselEditModal = ({
  variant = "card",
  order,
  ruPageId,
  kzPageId,
  queryKey,
}: CarouselEditModalProps) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle="Редактировать карусель"
      desc="Здесь Вы можете редактировать виджен карусель"
      triggerTitle="Редактировать карусель"
      content={
        <ModalContent
          modalVariant={variant}
          ruPageId={ruPageId}
          kzPageId={kzPageId}
          order={order}
          queryKey={queryKey}
        />
      }
    />
  );
};
const ModalContent = ({
  ruPageId,
  kzPageId,
  order,
  queryKey,
  modalVariant,
}: {
  modalVariant?: "dialog" | "card";
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
  order: number;
}) => {
  const {
    addItem,
    deleteItem,
    onEdit,
    onSave,
    props,
    loading,
    setLoading,
    items,
    writeChanges,
    writeMainPropsChanges,
    widgetMainProps,
  } = useTemplateWidget({
    widgetName: "Carousel",
    ruPageId,
    kzPageId,
    queryKey,
    order,
    widgetStateFields: [],
    itemsStateFields: [
      "contentRu",
      "contentKz",
      "image",
      "savedTemplate",
      "templateWidgets",
    ],
  });

  return (
    <>
      <Button onClick={addItem} className="w-full">
        Добавить
      </Button>
      <section className="max-h-[460px] flex flex-col gap-10 overflow-y-scroll w-full  rounded-md border p-4 ">
        {Object.keys(items).map((key, idx) => (
          <EditCarouselItem
            writeChanges={writeChanges}
            carouselItem={items[key]}
            deleteCarouselItem={() => deleteItem(key)}
            key={idx}
            id={key}
            modalVariant={modalVariant}
          />
        ))}
      </section>
      <Button
        loading={loading}
        disabled={loading}
        onClick={() => {
          setLoading(true);
          props ? onEdit() : onSave();
        }}
      >
        Сохранить
      </Button>
    </>
  );
};
