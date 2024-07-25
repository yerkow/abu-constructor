import { TemplateSelectType } from "@/shared/lib/types";
import { CardsEditModal } from "@/widgets/Cards/CardsEditModal";
import { CarouselEditModal } from "@/widgets/Carousel/CarouselEditModal";
import { LinksEditModal } from "@/widgets/Links/LinksEditModal";
import { ListEditModal } from "@/widgets/List/ListEditModal";
import { TextEditModal } from "@/widgets/Text/TextEditModal";
import { Fragment } from "react";
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
const getTemplateWidgetList = (
  saved: string,
  selected: TemplateSelectType | null,
) => {
  if (selected) {
    return selected.widgets;
  }
  if (saved) {
    return JSON.parse(saved || "[]");
  }
  return [];
};
export const TemplateWidgetsList = ({
  id,
  saved,
  selectedTemplate,
}: {
  id: string;
  saved: string;
  selectedTemplate: TemplateSelectType | null;
}) => {
  return (
    <div className="flex flex-col gap-3 ">
      <span>Настройки шаблона</span>
      {getTemplateWidgetList(saved, selectedTemplate).map(
        (w: string, idx: number) => {
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
        },
      )}
    </div>
  );
};
