import { EditOptionsProps } from "@/widgets/EditWidget/model/types";

export const TabsEditOptions: EditOptionsProps = {
  widgetName: "Tabs",
  widgetOptions: [{ props: "title", type: "text", placeholder: "Заголовок" }],
  contentOptions: [
    { props: "title", type: "text", placeholder: "Название" },
    { props: "icon", type: "file", placeholder: "Иконка" },
  ],
};
