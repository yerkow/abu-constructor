import { BaseEditModalProps } from "@/shared/lib/types";
import { EditModal } from "@/widgets/EditModal/EditModal";

const itemKeys = ["contentRu", "contentKz", "file"];
const itemInputs = [
  { label: "Название RU", value: "text" },
  { label: "Название KZ", value: "text" },
  { value: "file" },
];

function ListEditModal(props: BaseEditModalProps) {
  const modalProps = {
    ...props,
    widgetName: "List",
    mainKeys: [],
    mainInputs: [],
    itemKeys,
    itemInputs,
    withTemplate: false,
  };
  return <EditModal {...modalProps} />;
}
ListEditModal.displayName = "ListEditModal";
export default ListEditModal;
