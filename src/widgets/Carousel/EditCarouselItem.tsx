import { TemplatesSelect } from "@/features";
import { useUploadFile } from "@/shared/lib";
import { useTemplates } from "@/shared/lib/hooks";
import { Button, EditItemWrapper, Input } from "@/shared/ui";
import { TemplateWidgetsList } from "@/widgets/TemplateWidgetsList";
import { DeleteIcon } from "lucide-react";

export const EditCarouselItem = ({
  id,
  deleteCarouselItem,
  carouselItem,
  templateWidgets,
  writeChanges,
  modalVariant,
}: {
  id: string;
  modalVariant?: string;
  carouselItem: any;
  writeChanges: (id: string, field: string, value: string | File) => void;
  templateWidgets?: string[];
  deleteCarouselItem: () => void;
}) => {
  const { isSaved, templates, setTemplates, selectedTemplate, onSelect } =
    useTemplates({
      savedTemplate: carouselItem.savedTemplate,
    });
  const { Preview, FileInput } = useUploadFile({
    id,
    writeChanges,
    img: carouselItem.image,
  });

  return (
    <EditItemWrapper
      title={"Слайд" + id}
      buttons={
        <>
          <Button onClick={deleteCarouselItem} size={"icon"}>
            <DeleteIcon />
          </Button>
        </>
      }
    >
      {modalVariant === "card" && (
        <TemplatesSelect
          savedTemplate={isSaved ? carouselItem.savedTemplate : ""}
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
          label="Контент RU"
          type="text"
          value={carouselItem.contentRu}
          onChange={(e) => writeChanges(id, "contentRu", e.target.value)}
        />
        <Input
          label="Контент KZ"
          type="text"
          value={carouselItem.contentKz}
          onChange={(e) => writeChanges(id, "contentKz", e.target.value)}
        />
      </div>
      {Preview}
      {FileInput}
      {(carouselItem.templateWidgets || selectedTemplate) && (
        <TemplateWidgetsList
          id={id}
          saved={carouselItem.templateWidgets}
          selectedTemplate={selectedTemplate}
        />
      )}
    </EditItemWrapper>
  );
};
