import { TemplateSelectType } from "@/shared/lib/types";
import { getEditModal } from "@/shared/lib/utils";
import { AccordionEditModal } from "@/widgets/Accordion/AccordionEditModal";
import { CardsEditModal } from "@/widgets/Cards/CardsEditModal";
import { CarouselEditModal } from "@/widgets/Carousel/CarouselEditModal";
import { GalleryEditModal } from "@/widgets/Gallery/GalleryEditModal";
import { InfoEditModal } from "@/widgets/Info/InfoEditModal";
import { LinksEditModal } from "@/widgets/Links/LinksEditModal";
import { ListEditModal } from "@/widgets/List/ListEditModal";
import { TextEditModal } from "@/widgets/Text/TextEditModal";
import { Fragment } from "react";
const getTemplateWidgetList = (
  saved: string,
  selected: TemplateSelectType | null,
) => {
  if (selected) {
    console.log(selected.widgets);
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
          const ruPageId = id.split("*")[0];
          const kzPageId = id.split("*")[1];
          return (
            <Fragment key={idx}>
              {getEditModal(
                w,
                idx,
                ruPageId,
                kzPageId,
                "getTemplateWidgets",
                true,
              )}
            </Fragment>
          );
        },
      )}
    </div>
  );
};
