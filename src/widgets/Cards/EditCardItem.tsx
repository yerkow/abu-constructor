import { TemplatesSelect } from "@/features";
import { backendImageUrl } from "@/shared/lib/constants";
import { useTemplates } from "@/shared/lib/hooks";
import { TemplateSelectType } from "@/shared/lib/types";
import { Button, EditItem, Input } from "@/shared/ui";
import { CardsEditModal } from "@/widgets/Cards/CardsEditModal";
import { CarouselEditModal } from "@/widgets/Carousel/CarouselEditModal";
import { LinksEditModal } from "@/widgets/Links/LinksEditModal";
import { ListEditModal } from "@/widgets/List/ListEditModal";
import { TemplateWidgetsList } from "@/widgets/TemplateWidgetsList";
import { TextEditModal } from "@/widgets/Text/TextEditModal";
import { Fragment, useState } from "react";

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
  const [image, setImage] = useState<string | ArrayBuffer | null>(() => {
    if (card.image) {
      return `${backendImageUrl}${card.image}`;
    } else {
      return "";
    }
  });
  return (
    <EditItem
      buttons={
        <>
          <Button onClick={deleteCard}>Delete</Button>
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
      {image && <img className="w-20 h-20" src={image as string} alt="image" />}
      <Input
        type="file"
        label="Image"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            writeChanges(id, "image", file);
            const reader = new FileReader();

            reader.onload = function (event) {
              if (event.target) setImage(event.target.result);
            };
            reader.readAsDataURL(file);

            writeChanges(id, "image", file);
          }
        }}
      />
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
