import { EditOptionsProps } from "@/widgets/common/EditWidget/model/types";

export const LinkEditOptions: EditOptionsProps = {
  widgetName: "Links",
  widgetOptions: [{ props: "title", type: "text", placeholder: "Заголовок" }],
  contentOptions: [
    { props: "title", type: "text", placeholder: "Название" },
    { props: "link", type: "text", placeholder: "Ссылка на сторонний ресурс" },
  ],
};
