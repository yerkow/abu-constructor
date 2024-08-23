import { EditOptionsProps } from "@/widgets/EditWidget/model/types";

export const AccordionEditOptions: EditOptionsProps = {
    widgetName: "Accordion",
    widgetOptions: [
        { props: "title", type: "text", placeholder: "Заголовок" },
    ],
    contentOptions: [
        { props: "title", type: "text", placeholder: "Заголовок" },
        { props: "content", type: "quill", placeholder: "Контент" },
    ],
};