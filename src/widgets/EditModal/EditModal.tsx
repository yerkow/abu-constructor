import { useTemplateWidget } from "@/shared/lib/hooks";
import { InputComponent } from "@/shared/lib/types";
import { Button, WidgetView } from "@/shared/ui";
import { EditItem, getInput } from "./EditItem";
import { Fragment } from "react";

interface EditModalProps {
  variant?: "dialog" | "card";
  order: number;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
  cardTitle: string;
  desc: string;
  triggerTitle: string;
  mainKeys: string[];
  mainInputs: InputComponent[];
  itemKeys: string[];
  itemInputs: InputComponent[];
  withTemplate: boolean;
  widgetName: string;
}
export const EditModal = ({
  variant = "card",
  order,
  ruPageId,
  kzPageId,
  queryKey,
  cardTitle,
  desc,
  triggerTitle,
  mainKeys,
  mainInputs,
  itemKeys,
  widgetName,
  itemInputs,
  withTemplate,
}: EditModalProps) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle={cardTitle}
      desc={desc}
      triggerTitle={triggerTitle}
      content={
        <ModalContent
          widgetName={widgetName}
          modalVariant={variant}
          ruPageId={ruPageId}
          kzPageId={kzPageId}
          withTemplate={withTemplate}
          order={order}
          queryKey={queryKey}
          mainKeys={mainKeys}
          mainInputs={mainInputs}
          itemInputs={itemInputs}
          itemKeys={itemKeys}
        />
      }
    />
  );
};
interface ModalContentProps {
  modalVariant?: "dialog" | "card";
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
  order: number;
  mainKeys: string[];
  mainInputs: InputComponent[];
  itemKeys: string[];
  itemInputs: InputComponent[];
  withTemplate: boolean;
  widgetName: string;
}
const ModalContent = ({
  ruPageId,
  kzPageId,
  order,
  queryKey,
  modalVariant,
  mainKeys,
  mainInputs,
  itemKeys,
  itemInputs,
  withTemplate,
  widgetName,
}: ModalContentProps) => {
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
    widgetName,
    ruPageId,
    kzPageId,
    queryKey,
    order,
    withTemplate,
    widgetStateFields: mainKeys,
    itemsStateFields: itemKeys,
  });

  return (
    <>
      <div className="flex flex-col gap-2">
        {mainInputs.map((input, idx) => (
          <Fragment key={idx}>
            {getInput(
              input,
              mainKeys[idx],
              writeMainPropsChanges,
              widgetMainProps,
            )}
          </Fragment>
        ))}
      </div>
      {itemKeys.length > 0 && (
        <>
          <Button onClick={addItem} className="w-full">
            Добавить
          </Button>
          <section className="max-h-[460px] flex flex-col gap-10 overflow-y-auto w-full  rounded-md border p-4 ">
            {Object.keys(items).map((key, idx) => (
              <EditItem
                inputs={itemInputs}
                keys={itemKeys}
                modalVariant={modalVariant}
                writeChanges={writeChanges}
                item={items[key]}
                deleteItem={() => deleteItem(key)}
                key={idx}
                id={key}
                title="Элемент"
                withTemplate={withTemplate}
              />
            ))}
          </section>
        </>
      )}
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
