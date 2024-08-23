import { TemplateSelectType } from "@/shared/lib/types";
import { Dispatch, SetStateAction } from "react";

export interface IWidgetTemplateCheckboxProps {
    modalVariant: "dialog" | "card" | undefined;
    savedTemplate: string | null;
    hasTemplate: boolean;
    setHasTemplate: (value: boolean) => void;
    setSelectedTemplate: Dispatch<SetStateAction<TemplateSelectType | null>>
    templates: TemplateSelectType[];
    handleTemplate: (template: string) => void;
}