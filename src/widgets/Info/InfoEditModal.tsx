import { BaseEditModalProps } from "@/shared/lib/types";
import { EditModal } from "@/widgets/EditModal/EditModal";
const mainKeys = ["titleRu", "titleKz", "contentRu", "contentKz"];
const mainInputs = [
  { label: "Заголовок RU", value: "text" },
  { label: "Заголовок KZ", value: "text" },
  { label: "Контент RU", value: "text" },
  { label: "Контент KZ", value: "text" },
];
const itemKeys = [
  "imagePosition",
  "titleRu",
  "titleKz",
  "contentRu",
  "contentKz",
  "linkTextRu",
  "linkTextKz",
];
const itemInputs = [
  {
    value: "select",
    select: {
      placeholder: "Положение картинки",
      values: [
        { value: "right", label: "Справа" },
        { value: "left", label: "Слева" },
      ],
    },
  },
  { label: "Заголовок RU", value: "text" },
  { label: "Заголовок KZ", value: "text" },
  { label: "Контент RU", value: "text" },
  { label: "Контент KZ", value: "text" },
  { label: "Текст ссылки RU", value: "text" },
  { label: "Текст ссылки KZ", value: "text" },
];

function InfoEditModal(props: BaseEditModalProps) {
  const modalProps = {
    ...props,
    widgetName: "Info",
    mainKeys,
    mainInputs,
    itemKeys,
    itemInputs,
    withTemplate: true,
  };
  return <EditModal {...modalProps} />;
}
InfoEditModal.displayName = "InfoEditModal";
export default InfoEditModal;
