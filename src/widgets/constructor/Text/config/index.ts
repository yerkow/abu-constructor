import { EditOptionsProps } from "@/widgets/common/EditWidget/model/types";

export const TextEditOptions: EditOptionsProps = {
  widgetName: "Text",
  widgetOptions: [
    { props: "title", type: "text", placeholder: "Заголовок" },
    { props: "content", type: "quill", placeholder: "Контент" },
  ],
  contentOptions: [],
};
