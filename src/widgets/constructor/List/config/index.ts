import { EditOptionsProps } from "@/widgets/EditWidget/model/types";

export const ListEditOptions: EditOptionsProps = {
    widgetName: "List",
    widgetOptions: [
        { props: "title", type: "text", placeholder: "Заголовок" },
    ],
    contentOptions: [
        { props: "title", type: "text", placeholder: "Название" },
        { props: "image", type: "file", placeholder: "Файл" },
    ],
}