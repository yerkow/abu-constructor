import { useTemplateWidget } from "@/shared/lib/hooks";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  WidgetView,
} from "@/shared/ui";
import { EditCardItem } from "@/widgets/Cards/EditCardItem";
import { EditInfoItem } from "@/widgets/Info/EditInfoItem";

interface InfoEditModalProps {
  variant?: "dialog" | "card";
  order: number;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
}
export const InfoEditModal = ({
  variant = "card",
  order,
  ruPageId,
  kzPageId,
  queryKey,
}: InfoEditModalProps) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle="Редактировать инфо виджет"
      desc="Здесь вы можете отредактировать виджет инфо"
      triggerTitle="Редактировать инфо"
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
    widgetName: "Info",
    ruPageId,
    kzPageId,
    queryKey,
    order,
    widgetStateFields: ["titleRu", "titleKz", "contentRu", "contentKz"],
    itemsStateFields: [
      "titleRu",
      "titleKz",
      "contentRu",
      "contentKz",
      "image",
      "imagePosition",
      "linkTextRu",
      "linkTextKz",
      "savedTemplate",
      "templateWidgets",
    ],
  });

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Заголовок RU"
          type="text"
          value={widgetMainProps.titleRu}
          onChange={(e) => writeMainPropsChanges("titleRu", e.target.value)}
        />
        <Input
          label="Заголовок KZ"
          type="text"
          value={widgetMainProps.titleKz}
          onChange={(e) => writeMainPropsChanges("titleKz", e.target.value)}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Контент RU"
          type="text"
          value={widgetMainProps.contentRu}
          onChange={(e) => writeMainPropsChanges("contentRu", e.target.value)}
        />
        <Input
          label="Контент KZ"
          type="text"
          value={widgetMainProps.contentkz}
          onChange={(e) => writeMainPropsChanges("contentkz", e.target.value)}
        />
      </div>
      <Button onClick={addItem} className="w-full">
        Добавить
      </Button>
      <section className="max-h-[460px] flex flex-col gap-10 overflow-y-scroll w-full  rounded-md border p-4 ">
        {Object.keys(items).map((key, idx) => (
          <EditInfoItem
            modalVariant={modalVariant}
            writeChanges={writeChanges}
            card={items[key]}
            deleteCard={() => deleteItem(key)}
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
        Сохранить
      </Button>
    </>
  );
};
