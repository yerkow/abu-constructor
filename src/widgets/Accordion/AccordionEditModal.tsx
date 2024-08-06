import { BaseEditModalProps } from "@/shared/lib/types";
import { EditModal } from "@/widgets/EditModal/EditModal";

const itemKeys = ["questionRu", "questionKz", "answerRu", "answerKz"];
const itemInputs = [
  {
    label: "Вопрос RU",
    value: "text",
  },
  {
    label: "Вопрос KZ",
    value: "text",
  },
  {
    label: "Ответ RU",
    value: "text",
  },
  {
    label: "Ответ KZ",
    value: "text",
  },
];
function AccordionEditModal(props: BaseEditModalProps) {
  const modalProps = {
    ...props,
    widgetName: "Accordion",
    mainKeys: [],
    mainInputs: [],
    itemKeys,
    itemInputs,
    withTemplate: false,
  };
  return <EditModal {...modalProps} />;
}
AccordionEditModal.displayName = "AccordionEditModal";
export default AccordionEditModal;
