"use client";
import { useTemplateWidget } from "@/shared/lib/hooks";
import { Button, Input, Label, WidgetView } from "@/shared/ui";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const quillModules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};
interface TextEditModalProps {
  modalVariant?: "card" | "dialog";
  order: number;
  queryKey: string;
  ruPageId: number | null;
  kzPageId: number | null;
}
export const TextEditModal = ({
  variant = "card",
  order,
  ruPageId,
  kzPageId,
  queryKey,
}: {
  variant?: "dialog" | "card";
  order: number;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
}) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle="Edit Text"
      desc="There you can edit Text content"
      triggerTitle="Редактировать текст"
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
  queryKey,
  ruPageId,
  kzPageId,
  order,
}: TextEditModalProps) => {
  const {
    onEdit,
    onSave,
    lockSaveBtn,
    props,
    loading,
    setLoading,
    items,
    writeMainPropsChanges,
    widgetMainProps,
  } = useTemplateWidget({
    widgetName: "Text",
    ruPageId,
    kzPageId,
    queryKey,
    order,
    widgetStateFields: ["headingRu", "headingKz", "contentRu", "contentKz"],
    itemsStateFields: [],
  });
  console.log(widgetMainProps);

  return (
    <section className="flex h-full  flex-col gap-3  ">
      <div className="flex flex-col   gap-3">
        <Input
          label="Заголовок RU"
          type="text"
          value={widgetMainProps.headingRu}
          required
          onChange={(e) => writeMainPropsChanges("headingRu", e.target.value)}
        />
        <Input
          label="Заголовок KZ"
          type="text"
          required
          value={widgetMainProps.headingKz}
          onChange={(e) => writeMainPropsChanges("headingKz", e.target.value)}
        />
      </div>
      <div className="flex flex-col flex-grow   gap-3 w-full justify-between">
        <div>
          <Label>Контент RU</Label>
          <ReactQuill
            value={widgetMainProps.contentRu}
            className=" overflow-y-auto max-h-[200px]"
            onChange={(value) => writeMainPropsChanges("contentRu", value)}
            modules={quillModules}
            theme="snow"
          />
        </div>
        <div>
          <Label>Контент KZ</Label>
          <ReactQuill
            value={widgetMainProps.contentKz}
            className="overflow-y-auto max-h-[200px]"
            onChange={(value) => writeMainPropsChanges("contentKz", value)}
            modules={quillModules}
            theme="snow"
          />
        </div>
      </div>
      <Button
        disabled={loading || lockSaveBtn}
        loading={loading}
        onClick={() => {
          setLoading(true);
          props ? onEdit() : onSave();
        }}
        type="button"
      >
        Сохранить
      </Button>
    </section>
  );
};
