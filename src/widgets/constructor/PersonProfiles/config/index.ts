import { EditOptionsProps } from "@/widgets/common/EditWidget/model/types";

export const PersonProfilesEditOptions: EditOptionsProps = {
    widgetName: "PersonProfiles",
    widgetOptions: [
        { props: "title", type: "text", placeholder: "Заголовок" },
    ],
    contentOptions: [
        { props: "image", type: "file", placeholder: "Фото" },
        { props: "full_name", type: "text", placeholder: "ФИО" },
        { props: "job_title", type: "text", placeholder: "Должность" },
        { props: "description", type: "quill", placeholder: "Описание" },
    ],
}