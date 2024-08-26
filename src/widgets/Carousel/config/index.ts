import { EditOptionsProps } from "@/widgets/EditWidget/model/types";

export const CarouselEditOptions: EditOptionsProps = {
    widgetName: "Carousel",
    widgetOptions: [
    ],
    contentOptions: [
        { props: "content", type: "quill", placeholder: "Контент" },
        { props: "image", type: "file", placeholder: "Изображение" },
    ],
};