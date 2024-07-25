import { TemplatesSelect } from "@/features";
import { useUploadFile } from "@/shared/lib";
import { useTemplates } from "@/shared/lib/hooks";
import {
  Button,
  EditItem,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { TemplateWidgetsList } from "@/widgets/TemplateWidgetsList";
import { DeleteIcon } from "lucide-react";

export const EditInfoItem = ({
  modalVariant,
  id,
  deleteCard: deleteItem,
  card: item,
  writeChanges,
}: {
  modalVariant?: string;
  id: string;
  card: any;
  writeChanges: (id: string, field: string, value: string | File) => void;
  deleteCard: () => void;
}) => {
  //getWidgetProps for template
  const { isSaved, templates, setTemplates, selectedTemplate, onSelect } =
    useTemplates({
      savedTemplate: item.savedTemplate,
    });
  const { Preview, FileInput } = useUploadFile({
    id,
    writeChanges,
    file: item.image,
  });
  return (
    <EditItem
      buttons={
        <>
          <Button onClick={deleteItem} size={"icon"}>
            <DeleteIcon />
          </Button>
        </>
      }
      title={"Карточка " + id}
    >
      {modalVariant === "card" && (
        <TemplatesSelect
          savedTemplate={isSaved ? item.savedTemplate : ""}
          templates={templates}
          onSelect={(template) => {
            onSelect(template, (w) => {
              writeChanges(id, "templateWidgets", JSON.stringify(w.widgets));
              writeChanges(id, "savedTemplate", w.name);
            });
          }}
        />
      )}
      <div className="flex gap-2 items-center">
        <Label>Выберите положение картинки</Label>
        <Select
          value={item.variant}
          onValueChange={(value) => writeChanges(id, "imagePosition", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Положение картинки" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="right">Справа</SelectItem>
            <SelectItem value="left">Слева</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Заголовок RU"
          type="text"
          value={item.titleRu}
          onChange={(e) => writeChanges(id, "titleRu", e.target.value)}
        />
        <Input
          label="Заголовок KZ"
          type="text"
          value={item.titleKz}
          onChange={(e) => writeChanges(id, "titleKz", e.target.value)}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Контент RU"
          type="text"
          value={item.contentRu}
          onChange={(e) => writeChanges(id, "contentRu", e.target.value)}
        />
        <Input
          label="Контент KZ"
          type="text"
          value={item.contentKz}
          onChange={(e) => writeChanges(id, "contentKz", e.target.value)}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Текст ссылки RU"
          type="text"
          value={item.linkTextRu}
          onChange={(e) => writeChanges(id, "linkTextRu", e.target.value)}
        />
        <Input
          label="Текст ссылки KZ"
          type="text"
          value={item.linkTextKz}
          onChange={(e) => writeChanges(id, "linkTextKz", e.target.value)}
        />
      </div>
      {Preview}
      {FileInput}
      {(item.templateWidgets || selectedTemplate) && (
        <TemplateWidgetsList
          id={id}
          saved={item.templateWidgets}
          selectedTemplate={selectedTemplate}
        />
      )}
    </EditItem>
  );
};
