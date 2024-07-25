import { TemplatesSelect } from "@/features";
import { useTemplateWidget } from "@/shared/lib/hooks";
import { Button, Input, WidgetView } from "@/shared/ui";
import { EditLinksItem } from "@/widgets/Links/EditLinksItem";

interface LinksEditModalProps {
  variant?: "dialog" | "card";
  order: number;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
}
export const LinksEditModal = ({
  variant = "card",
  order,
  ruPageId,
  kzPageId,
  queryKey,
}: LinksEditModalProps) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle="Редактировать Links"
      desc="Здесь мы можете отредактировать виджен Links"
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
    props,
    loading,
    setLoading,
    items,
    writeChanges,
    writeMainPropsChanges,
    widgetMainProps,
  } = useTemplateWidget({
    widgetName: "Links",
    ruPageId,
    kzPageId,
    queryKey,
    order,
    widgetStateFields: ["titleRu", "titleKz"],
    itemsStateFields: ["nameRu", "nameKz", "linkRu", "linkKz"],
  });

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Заголовок на русском"
          type="text"
          value={widgetMainProps.titleRu}
          onChange={(e) => writeMainPropsChanges("titleRu", e.target.value)}
        />
        <Input
          label="Заголовок на казахском"
          type="text"
          value={widgetMainProps.titleKz}
          onChange={(e) => writeMainPropsChanges("titleKz", e.target.value)}
        />
      </div>

      <Button onClick={addItem} className="w-full">
        Добавить
      </Button>
      <section className="max-h-[460px] flex flex-col gap-10 overflow-y-scroll w-full  rounded-md border p-4 ">
        {Object.keys(items).map((key, idx) => (
          <EditLinksItem
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
        disabled={loading}
        onClick={() => {
          setLoading(true);
          props ? onEdit() : onSave();
        }}
      >
        Save
      </Button>
    </>
  );
};
