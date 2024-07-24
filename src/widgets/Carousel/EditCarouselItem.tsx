import { backendImageUrl } from "@/shared/lib/constants";
import { Button, EditItem, Input } from "@/shared/ui";
import { CardsEditModal } from "@/widgets/Cards/CardsEditModal";
import { CarouselEditModal } from "@/widgets/Carousel/CarouselEditModal";
import { LinksEditModal } from "@/widgets/Links/LinksEditModal";
import { ListEditModal } from "@/widgets/List/ListEditModal";
import { TextEditModal } from "@/widgets/Text/TextEditModal";
import { Fragment, useState } from "react";

export const EditCarouselItem = ({
  id,
  deleteCarouselItem,
  carouselItem,
  templateWidgets,
  writeChanges,
}: {
  id: string;
  carouselItem: any;
  writeChanges: (id: string, field: string, value: string | File) => void;
  templateWidgets?: string[];
  deleteCarouselItem: () => void;
}) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(() => {
    if (carouselItem.image) {
      return `${backendImageUrl}${carouselItem.image}`;
    } else {
      return "";
    }
  });

  const getTemplatesProps = (w: string, order: number, baseProps: any) => {
    switch (w) {
      case "Cards":
        return <CardsEditModal variant="dialog" {...baseProps} />;
      case "Carousel":
        return <CarouselEditModal variant="dialog" {...baseProps} />;
      case "List":
        return <ListEditModal variant="dialog" {...baseProps} />;
      case "Text":
        return <TextEditModal variant="dialog" {...baseProps} />;
      case "Links":
        return <LinksEditModal variant="dialog" {...baseProps} />;

      default:
        return null;
    }
  };

  return (
    <EditItem
      title={"Carousel Item" + id}
      buttons={
        <>
          <Button onClick={deleteCarouselItem} size={"sm"}>
            Delete
          </Button>
        </>
      }
    >
      <Input
        type="file"
        label="Image"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
              if (event.target) setImage(event.target.result);
            };
            reader.readAsDataURL(file);

            writeChanges(id, "image", file);
          }
        }}
      />

      {image && <img className="w-20 h-20" src={image as string} alt="image" />}

      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Content RU"
          type="text"
          value={carouselItem.contentRu}
          onChange={(e) => writeChanges(id, "contentRu", e.target.value)}
        />
        <Input
          label="Content KZ"
          type="text"
          value={carouselItem.contentKz}
          onChange={(e) => writeChanges(id, "contentKz", e.target.value)}
        />
      </div>

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
