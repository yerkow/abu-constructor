import { TemplatesSelect } from "@/features";
import { useUploadFile } from "@/shared/lib";
import { useTemplates } from "@/shared/lib/hooks";
import { Button, EditItem, Input } from "@/shared/ui";
import { TemplateWidgetsList } from "@/widgets/TemplateWidgetsList";
import { DeleteIcon } from "lucide-react";

export const EditCardItem = ({
  modalVariant,
  id,
  deleteCard,
  card,
  writeChanges,
}: {
  modalVariant?: string;
  id: string;
  card: any;
  writeChanges: (id: string, field: string, value: string | File) => void;
  deleteCard: () => void;
}) => {
  console.log(card);

  //getWidgetProps for template
  const { isSaved, templates, setTemplates, selectedTemplate, onSelect } =
    useTemplates({
      savedTemplate: card.savedTemplate,
    });
  const { Preview, FileInput } = useUploadFile({
    id,
    writeChanges,
    img: card.image,
  });
  return (
    <EditItem
      buttons={
        <>
          <Button onClick={deleteCard} size={"icon"}>
            <DeleteIcon />
          </Button>
        </>
      }
      title={"Карточка " + id}
    >
      {modalVariant === "card" && (
        <TemplatesSelect
          savedTemplate={isSaved ? card.savedTemplate : ""}
          templates={templates}
          onSelect={(template) => {
            onSelect(template, (w) => {
              writeChanges(id, "templateWidgets", JSON.stringify(w.widgets));
              writeChanges(id, "savedTemplate", w.name);
            });
          }}
        />
      )}

      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Заголовок RU"
          type="text"
          value={card.titleRu}
          onChange={(e) => writeChanges(id, "titleRu", e.target.value)}
        />
        <Input
          label="Заголовок KZ"
          type="text"
          value={card.titleKz}
          onChange={(e) => writeChanges(id, "titleKz", e.target.value)}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Контент RU"
          type="text"
          value={card.contentRu}
          onChange={(e) => writeChanges(id, "contentRu", e.target.value)}
        />
        <Input
          label="Контент KZ"
          type="text"
          value={card.contentKz}
          onChange={(e) => writeChanges(id, "contentKz", e.target.value)}
        />
      </div>
      {Preview}
      {FileInput}
      {(card.templateWidgets || selectedTemplate) && (
        <TemplateWidgetsList
          id={id}
          saved={card.templateWidgets}
          selectedTemplate={selectedTemplate}
        />
      )}
    </EditItem>
  );
};
