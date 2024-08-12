import { backendImageUrl } from "@/shared/lib/constants";
import { EditItemWrapper, Button } from "@/shared/ui";
import { useState } from "react";
import { EditCardItemProps, EditCardProps } from "./model/Cards.interface";
import { EditFile, EditSection } from "@/entities/";
import { TemplatesSelect } from "@/features";
import { useTemplates } from "@/shared/lib/hooks";
import { TemplateWidgetsList } from "../TemplateWidgetsList";


export const EditCardItem = ({
  id,
  deleteCard,
  item,
  writeChanges,
  modalVariant = "card",
}: EditCardItemProps) => {
  const { isSaved, templates, selectedTemplate, onSelect } =
    useTemplates({
      savedTemplate: item.savedTemplate,
    });

  const [image, setImage] = useState<string | ArrayBuffer | null>(() => {
    if (item.image) {
      return `${backendImageUrl}${item.image}`;
    } else {
      return "";
    }
  });

  return (
    <EditItemWrapper
      buttons={
        <>
          <Button onClick={deleteCard}>Удалить</Button>
        </>
      }
      title={"Card" + id}
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
      <EditCardSection card={item} id={id} writeChanges={writeChanges} />
      <EditFile id={id} image={image} setImage={setImage} writeChanges={writeChanges} />
      {(item.templateWidgets || selectedTemplate) && (
        <TemplateWidgetsList
          id={id}
          saved={item.templateWidgets}
          selectedTemplate={selectedTemplate}
        />
      )}
    </EditItemWrapper>
  );
};


const EditCardSection = ({ writeChanges, card, id }: {
  writeChanges: (id: string, field: string, value: string) => void;
  card: EditCardProps;
  id: string;
}) => {
  return (
    <>
      <EditSection
        inputList={[
          {
            label: "Заголовок карточки(ru)",
            value: card.titleRu,
            type: "text",
            onChange: (value: string) => writeChanges(id, "titleRu", value)
          },
          {
            label: "Заголовок карточки(kz)",
            value: card.titleKz,
            type: "text",
            onChange: (value: string) => writeChanges(id, "titleKz", value)
          }
        ]}
      />
      <EditSection
        inputList={[
          {
            label: "Содержание карточки(ru)",
            value: card.contentRu,
            type: "text",
            onChange: (value: string) => writeChanges(id, "contentRu", value)
          },
          {
            label: "Содержание карточки(kz)",
            value: card.contentKz,
            type: "text",
            onChange: (value: string) => writeChanges(id, "contentKz", value)
          }
        ]}
      />
    </>
  )
}