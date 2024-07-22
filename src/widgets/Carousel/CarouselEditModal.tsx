"use client";
import page from "@/app/page";
import { TemplatesSelect } from "@/features";
import { createPage, deletePage } from "@/shared/api/pages";
import {
  createWidget,
  editWidget,
  getWidgetProps,
  uploadFile,
} from "@/shared/api/widgets";
import { queryClient } from "@/shared/lib/client";
import { useTemplates, useTemplateWidget } from "@/shared/lib/hooks";
import {
  BackedPage,
  TemplateSelectType,
  WidgetProps,
} from "@/shared/lib/types";
import { cn, saveToServerAndGetUrl } from "@/shared/lib/utils";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EditItem,
  Input,
  Label,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
  WidgetView,
} from "@/shared/ui";
import { CardsEditModal } from "@/widgets/Cards/CardsEditModal";
import { EditCarouselItem } from "@/widgets/Carousel/EditCarouselItem";
import { ListEditModal } from "@/widgets/List/ListEditModal";
import { TextEditModal } from "@/widgets/Text/TextEditModal";
import { Modal } from "@/widgets/Text/TextEditModal.stories";
import { useMutation } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
export type EditCarouselItemProps = {
  titleRu: string;
  titleKz: string;
  contentRu: string;
  templateSlug: string;
  contentKz: string;
  image: File | null;
  href?: string;
  page?: {
    ru: BackedPage;
    kz: BackedPage;
  };
};
type CarouselState = Record<string, EditCarouselItemProps>;
interface CarouselEditModalProps {
  variant?: "dialog" | "card";
  order: number;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
}
export const CarouselEditModal = ({
  variant = "card",
  order,
  ruPageId,
  kzPageId,
  queryKey,
}: CarouselEditModalProps) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle="Edit Carousel"
      desc="There you can edit Carousel content"
      triggerTitle="Редактировать карусель"
      content={
        <ModalContent
          modalVariant={variant}
          ruPageId={ruPageId}
          kzPageId={kzPageId}
          order={order}
          queryKey={queryKey}
        />
      }
    />
  );
};
const ModalContent = ({
  ruPageId,
  kzPageId,
  order,
  queryKey,
  modalVariant,
}: {
  modalVariant?: "dialog" | "card";
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
  order: number;
}) => {
  const {
    addItem,
    deleteItem,
    onEdit,
    onSave,
    props,
    loading,
    setLoading,
    hasTemplate,
    savedTemplate,
    items,
    writeChanges,
    writeMainPropsChanges,
    templates,
    handleTemplate,
    widgetMainProps,
    setSelectedTemplate,
    selectedTemplate,
    setHasTemplate,
  } = useTemplateWidget({
    widgetName: "Carousel",
    ruPageId,
    kzPageId,
    queryKey,
    order,
    widgetStateFields: [],
    itemsStateFields: ["contentRu", "contentKz", "image"],
  });

  return (
    <>
      {modalVariant === "card" && (
        <>
          {!savedTemplate ? (
            <div className="flex items-center gap-2">
              <Checkbox
                id="template"
                checked={hasTemplate}
                onCheckedChange={() => setHasTemplate(!hasTemplate)}
              />
              <Label htmlFor="template" className="mt-1">
                Есть темплейт
              </Label>
            </div>
          ) : (
            <span>Использованный шаблон {savedTemplate}</span>
          )}
          {hasTemplate && !savedTemplate && (
            <TemplatesSelect
              savedTemplate={savedTemplate}
              templates={templates}
              onSelect={handleTemplate}
            />
          )}
        </>
      )}
      <Button onClick={addItem} className="w-full">
        Add new Carousel Item
      </Button>
      <section className="max-h-[460px] flex flex-col gap-10 overflow-y-scroll w-full  rounded-md border p-4 ">
        {Object.keys(items).map((key, idx) => (
          <EditCarouselItem
            writeChanges={writeChanges}
            carouselItem={items[key]}
            deleteCarouselItem={() => deleteItem(key)}
            key={idx}
            id={key}
            templateWidgets={
              selectedTemplate ? selectedTemplate.widgets : undefined
            }
          />
        ))}
      </section>
      <Button
        loading={loading}
        disabled={loading}
        onClick={() => {
          setLoading(true);
          props ? onEdit() : onSave();
        }}
      >
        Save
      </Button>
    </>
  );
};
