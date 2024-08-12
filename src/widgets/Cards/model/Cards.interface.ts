import { BackedPage } from "@/shared/lib/types";

export interface CardsEditModalProps {
    variant?: "dialog" | "card";
    order: number;
    ruPageId: number | null;
    kzPageId: number | null;
    queryKey: string;
}


export type EditCardProps = {
    titleRu: string;
    titleKz: string;
    contentRu: string;
    contentKz: string;
    savedTemplate: string;
    templateWidgets: string;
    href?: string;
    image: File | null;
    templateSlug: string;
    page?: {
        ru: BackedPage;
        kz: BackedPage;
    };
};


export interface EditCardItemProps {
    id: string;
    deleteCard: () => void;
    modalVariant: "dialog" | "card";
    item: EditCardProps;
    templateWidgets?: string[];
    writeChanges: (id: string, field: string, value: string | File) => void;
}
