import { BaseEditModalProps } from "@/shared/lib/types";
import { EditModal } from "@/widgets/EditModal/EditModal";

const itemKeys = ["contentRu", "contentKz", "file"];
const itemInputs = [
  { label: "Название RU", value: "text" },
  { label: "Название KZ", value: "text" },
  { value: "file" },
];

export const ListEditModal = (props: BaseEditModalProps) => {
  const modalProps = {
    ...props,
    widgetName: "List",
    cardTitle: "Редактировать список",
    desc: "Здесь вы можете отредактировать виджет список",
    triggerTitle: "Редактировать список",
    mainKeys: [],
    mainInputs: [],
    itemKeys,
    itemInputs,
    withTemplate: false,
  };
  return <EditModal {...modalProps} />;
};
