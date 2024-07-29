import { BaseEditModalProps } from "@/shared/lib/types";
import { EditModal } from "@/widgets/EditModal/EditModal";
const mainKeys = ["variant", "titleRu", "titleKz"];
const mainInputs = [
  {
    value: "select",
    select: {
      placeholder: "Вид карточек ",
      values: [
        { value: "base", label: "Стандартный" },
        { value: "horizontal", label: "Горизонтальный" },
      ],
    },
  },
  { label: "Заголовок RU", value: "text" },
  { label: "Заголовок KZ", value: "text" },
];

const itemKeys = ["titleRu", "titleKz", "contentRu", "contentKz", "image"];
const itemInputs = [
  { label: "Заголовок RU", value: "text" },
  { label: "Заголовок KZ", value: "text" },
  { label: "Контент RU", value: "text" },
  { label: "Контент KZ", value: "text" },
  { value: "file" },
];

export const CardsEditModal = (props: BaseEditModalProps) => {
  const modalProps = {
    ...props,
    widgetName: "Cards",
    cardTitle: "Редактировать карточки",
    desc: "Здесь вы можете отредактировать виджен карточки",
    triggerTitle: "Редактировать карточки",
    mainKeys,
    mainInputs,
    itemKeys,
    itemInputs,
    withTemplate: true,
  };
  return <EditModal {...modalProps} />;
};
