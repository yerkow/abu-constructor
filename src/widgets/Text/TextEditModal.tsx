import { BaseEditModalProps } from "@/shared/lib/types";
import { EditModal } from "@/widgets/EditModal/EditModal";
const mainKeys = ["headingRu", "headingKz", "contentRu", "contentKz"];
const mainInputs = [
  { label: "Заголовок RU", value: "text" },
  { label: "Заголовок KZ", value: "text" },
  { label: "Контент RU", value: "quill" },
  { label: "Контент KZ", value: "quill" },
];

export const TextEditModal = (props: BaseEditModalProps) => {
  const modalProps = {
    ...props,
    widgetName: "Text",
    cardTitle: "Редактировать текст",
    desc: "Здесь вы можете отредактировать виджет текст",
    triggerTitle: "Редактировать текст",
    mainKeys,
    mainInputs,
    itemKeys: [],
    itemInputs: [],
    withTemplate: false,
  };
  return <EditModal {...modalProps} />;
};
