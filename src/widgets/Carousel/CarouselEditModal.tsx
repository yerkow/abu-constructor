import { BaseEditModalProps } from "@/shared/lib/types";
import { EditModal } from "@/widgets/EditModal/EditModal";
const itemKeys = ["contentRu", "contentKz", "image"];
const itemInputs = [
  { label: "Контент RU", value: "text" },
  { label: "Контент KZ", value: "text" },
  { value: "file" },
];

export const CarouselEditModal = (props: BaseEditModalProps) => {
  const modalProps = {
    ...props,
    widgetName: "Carousel",
    mainKeys: [],
    mainInputs: [],
    itemKeys,
    itemInputs,
    withTemplate: true,
  };
  return <EditModal {...modalProps} />;
};
