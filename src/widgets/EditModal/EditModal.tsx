import { useTemplateWidget } from "@/shared/lib/hooks";
import { InputComponent } from "@/shared/lib/types";
import { Button, WidgetView } from "@/shared/ui";
import { EditItem, getInput } from "./EditItem";
import { Fragment } from "react";
import { HistoryButton } from "@/features/HistoryButton/HistoryButton";
import { useTranslations } from "next-intl";

interface EditModalProps {
  variant?: "dialog" | "card";
  order: number;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
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
      widgetName={widgetName}
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
  const t = useTranslations("widget");
  return (
    <>
      {props && (
        <HistoryButton
          ids={{
            ruId: props.ruWidgetId,
            kzId: props.kzWidgetId,
            ruPageId: props.ru_navigation_id,
            kzPageId: props.kz_navigation_id,
          }}
        />
      )}
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
            {t("add")}
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
        {t("save")}
      </Button>
    </>
  );
};
