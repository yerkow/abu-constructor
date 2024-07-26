import { TemplatesSelect } from "@/features";
import { useTemplateWidget } from "@/shared/lib/hooks";
import { Button, Input, WidgetView } from "@/shared/ui";
import { EditAccordionItem } from "@/widgets/Accordion/EditAccordionItem";
import { EditLinksItem } from "@/widgets/Links/EditLinksItem";

interface AccordionEditModalProps {
  variant?: "dialog" | "card";
  order: number;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
}
export const AccordionEditModal = ({
  variant = "card",
  order,
  ruPageId,
  kzPageId,
  queryKey,
}: AccordionEditModalProps) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle="Редактировать Accordion"
      desc="Здесь мы можете отредактировать виджен Accordion"
      triggerTitle="Редактировать ссылки"
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
    lockSaveBtn,
    props,
    loading,
    setLoading,
    items,
    writeChanges,
    writeMainPropsChanges,
    widgetMainProps,
  } = useTemplateWidget({
    widgetName: "Accordion",
    ruPageId,
    kzPageId,
    queryKey,
    order,
    widgetStateFields: [],
    itemsStateFields: ["questionRu", "questionKz", "answerRu", "answerKz"],
  });

  return (
    <>
      <Button onClick={addItem} className="w-full">
        Добавить
      </Button>
      <section className="max-h-[460px] flex flex-col gap-10 overflow-y-scroll w-full  rounded-md border p-4 ">
        {Object.keys(items).map((key, idx) => (
          <EditAccordionItem
            writeChanges={writeChanges}
            item={items[key]}
            deleteItem={() => deleteItem(key)}
            key={idx}
            id={key}
          />
        ))}
      </section>
      <Button
        loading={loading}
        disabled={loading || lockSaveBtn}
        onClick={() => {
          setLoading(true);
          props ? onEdit() : onSave();
        }}
      >
        Cохранить
      </Button>
    </>
  );
};
