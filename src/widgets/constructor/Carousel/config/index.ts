import { EditOptionsProps } from "@/widgets/common/EditWidget/model/types";

export const CarouselEditOptions: EditOptionsProps = {
  widgetName: "Carousel",
  widgetOptions: [
    {
      props: "variant",
      type: "select",
      placeholder: "Вариант",
      values: [
        { value: "small", label: "Малый" },
        { value: "medium", label: "Средний" },
        { value: "large", label: "Большой" },
      ],
    },
    {
      props: "perView",
      type: "select",
      placeholder: "Количество видимых слайдов",
      values: [
        { value: "1", label: "Один" },
        { value: "2", label: "Два" },
        { value: "3", label: "Три" },
      ],
    },
  ],
  contentOptions: [
    { props: "content", type: "quill", placeholder: "Контент" },
    { props: "image", type: "file", placeholder: "Изображение" },
  ],
};
