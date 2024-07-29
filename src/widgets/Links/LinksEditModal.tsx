import { BaseEditModalProps } from "@/shared/lib/types";
import { EditModal } from "@/widgets/EditModal/EditModal";
const mainKeys = ["variant", "titleRu", "titleKz"];
const mainInputs = [
  { label: "Заголовок RU", value: "text" },
  { label: "Заголовок KZ", value: "text" },
];

const itemKeys = ["nameRu", "nameKz", "linkRu", "linkKz"];
const itemInputs = [
  { label: "Название RU", value: "text" },
  { label: "Название KZ", value: "text" },
  { label: "Ccылка RU", value: "text" },
  { label: "Ccылка KZ", value: "text" },
];

export const LinksEditModal = (props: BaseEditModalProps) => {
  const modalProps = {
    ...props,
    widgetName: "Links",
    cardTitle: "Редактировать ссылки",
    desc: "Здесь вы можете отредактировать виджет ссылки",
    triggerTitle: "Редактировать ссылки",
    mainKeys,
    mainInputs,
    itemKeys,
    itemInputs,
    withTemplate: false,
  };
  return <EditModal {...modalProps} />;
};
