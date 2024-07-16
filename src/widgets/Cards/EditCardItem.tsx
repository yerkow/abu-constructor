import { getWidgets } from "@/shared/api/widgets";
import { Widget } from "@/shared/lib/types";
import { EditItem, Button, Input } from "@/shared/ui";
import { CardProps } from "@/widgets/Cards/Card";
import { CardsEditModal, EditCardProps } from "@/widgets/Cards/CardsEditModal";
import { CarouselEditModal } from "@/widgets/Carousel/CarouselEditModal";
import { ListEditModal } from "@/widgets/List/ListEditModal";
import { TextEditModal } from "@/widgets/Text/TextEditModal";
import { useQuery } from "@tanstack/react-query";
import { useState, Fragment, useEffect } from "react";

export const EditCardItem = ({
  id,
  deleteCard,
  card,
  templateWidgets,
  writeChanges,
}: {
  id: string;
  card: EditCardProps;
  writeChanges: (id: string, field: string, value: string | File) => void;
  templateWidgets?: string[];
  deleteCard: () => void;
}) => {
  //getWidgetProps for template
  const [image, setImage] = useState<string | ArrayBuffer | null>(() => {
    if (card.image) {
      return `http://77.243.80.138/media/${card.image}`;
    } else {
      return "";
    }
  });
  const {
    data: templateWidgetsProps,
    isFetching,
    error: fetchError,
  } = useQuery({
    queryKey: [`getTemplateWidgets`],
    queryFn: async () => {
      const ids = id.split("*");
      const data = await getWidgets({ ru: ids[0], kz: ids[1] });

      return data;
    },
  });

  const getTemplatesProps = (w: string, order: number, baseProps: any) => {
    switch (w) {
      case "Cards":
        return <CardsEditModal variant="dialog" {...baseProps} />;
      case "Carousel":
        return <CarouselEditModal variant="dialog" />;
      case "List":
        return <ListEditModal variant="dialog" />;
      case "Text":
        return <TextEditModal variant="dialog" {...baseProps} />;
      default:
        return null;
    }
  };
  const [title, setTitle] = useState({ ru: "", kz: "" });
  const [content, setContent] = useState({ ru: "", kz: "" });
  return (
    <EditItem
      buttons={
        <>
          <Button onClick={deleteCard}>Delete</Button>
        </>
      }
      title={"Card" + id}
    >
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Card title  RU"
          type="text"
          value={card.titleRu}
          onChange={(e) => writeChanges(id, "titleRu", e.target.value)}
        />
        <Input
          label="Card title KZ"
          type="text"
          value={card.titleKz}
          onChange={(e) => writeChanges(id, "titleKz", e.target.value)}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Content RU"
          type="text"
          value={card.contentRu}
          onChange={(e) => writeChanges(id, "contentRu", e.target.value)}
        />
        <Input
          label="Content KZ"
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
      {templateWidgets && (
        <div className="flex flex-col gap-3 ">
          <span>Настройки шаблона</span>
          {templateWidgets?.map((w, idx) => {
            const baseProps = {
              order: idx,
              ruPageId: +id.split("*")[0],
              kzPageId: +id.split("*")[1],
              queryKey: "getTemplateWidgets",
            };

            return (
              <Fragment key={idx}>
                {getTemplatesProps(w, idx, baseProps)}
              </Fragment>
            );
          })}
        </div>
      )}
    </EditItem>
  );
};
