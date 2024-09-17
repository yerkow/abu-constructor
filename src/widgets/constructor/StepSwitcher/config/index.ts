import { EditOptionsProps } from "@/widgets/common/EditWidget/model/types";

export const StepSwitcherEditOptions: EditOptionsProps = {
    widgetName: "StepSwitcher",
    widgetOptions: [{ props: "title", type: "text", placeholder: "Заголовок" }],
    contentOptions: [
        { props: "title", type: "text", placeholder: "Заголовок шага" },
    ],
};
