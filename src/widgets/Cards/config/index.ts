import { EditOptionsProps } from "@/widgets/EditWidget/model/types";

export const CardEditOptions: EditOptionsProps = {
    widgetName: "Cards",
    widgetOptions: [
        { props: "title", type: "text", placeholder: "Заголовок" },
        {
            props: "variant",
            type: "select",
            placeholder: "Вид карточек",
            values: [
                { value: "base", label: "Стандарт" },
                { value: "horizontal", label: "Горизонтальный" },
            ],
        },
    ],
    contentOptions: [
        { props: "title", type: "text", placeholder: "Заголовок" },
        { props: "content", type: "quill", placeholder: "Контент" },
        { props: "image", type: "file", placeholder: "Изображение" },
    ],
};