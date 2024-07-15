"use client";
import { TemplatesSelect } from "@/features";
import { createPage, deletePage } from "@/shared/api/pages";
import {
  createWidget,
  editWidget,
  getWidgets,
  uploadFile,
} from "@/shared/api/widgets";
import { queryClient } from "@/shared/lib/client";
import { useSaveToLocalStorage } from "@/shared/lib/hooks";
import { BackedPage, Widget } from "@/shared/lib/types";
import {
  Button,
  Checkbox,
  EditItem,
  Input,
  Label,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  WidgetView,
} from "@/shared/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { CarouselEditModal } from "../Carousel/CarouselEditModal";
import { ListEditModal } from "../List/ListEditModal";
import { TextEditModal } from "../Text/TextEditModal";
import { EditCardItem } from "@/widgets/Cards/EditCardItem";
type Options = { title: string; items: any[]; variant: string };
interface CardsEditModalProps {
  variant?: "dialog" | "card";
  order: number;
  ruOptions?: Options | null;
  kzOptions?: Options | null;
  ruWidgetId?: number | null | undefined;
  kzWidgetId?: number | null | undefined;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
}
export const CardsEditModal = ({
  variant = "card",
  order,
  kzOptions,
  ruOptions,
  ruPageId,
  kzPageId,
  ruWidgetId,
  kzWidgetId,
  queryKey,
}: CardsEditModalProps) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle="Edit Cards"
      desc="There you can edit Cards content"
      triggerTitle="Редактировать карточки"
      content={
        <ModalContent
          ruPageId={ruPageId}
          kzPageId={kzPageId}
          ruWidgetId={ruWidgetId}
          kzWidgetId={kzWidgetId}
          ruOptions={ruOptions}
          kzOptions={kzOptions}
          order={order}
          queryKey={queryKey}
        />
      }
    />
  );
};

export type EditCardProps = {
  titleRu: string;
  titleKz: string;
  contentRu: string;
  contentKz: string;
  image: File | null;
  page?: {
    ru: BackedPage;
    kz: BackedPage;
  };
};
type CardsState = Record<string, EditCardProps>;
const ModalContent = ({
  order,
  ruOptions,
  kzOptions,
  queryKey,
  ruWidgetId,
  kzWidgetId,
  ruPageId,
  kzPageId,
}: {
  ruWidgetId: number | null | undefined;
  kzWidgetId: number | null | undefined;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
  order: number;
  ruOptions?: Options | null;
  kzOptions?: Options | null;
}) => {
  const {
    mutate: createCardsWidget,
    isPending: createIsPending,
    error,
  } = useMutation({
    mutationKey: ["createCardsWidget"],
    mutationFn: createWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
  const { mutate: editCardsWidget, isPending: editIsPending } = useMutation({
    mutationKey: ["editCardsWidget"],
    mutationFn: editWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const [hasTemplate, setHasTemplate] = useState(false);
  const slug = useSearchParams().get("edittingSlug");
  const [template, setTemplate] = useState<{
    name: string;
    widgets: string[];
  } | null>(null);
  const [savedTemplate, setSavedTemplate] = useState<string | null>(null);
  const [variant, setVariant] = useState(
    ruOptions ? ruOptions.variant : "base",
  );
  const [title, setTitle] = useState({
    ru: ruOptions ? ruOptions.title : "",
    kz: kzOptions ? kzOptions.title : "",
  });
  const [cards, setCards] = useState<CardsState>(() => {
    const temp: CardsState = {};
    if (ruOptions && kzOptions) {
      if (ruOptions.items[0]) {
        if (ruOptions.items[0]?.templateName) {
          setSavedTemplate(ruOptions.items[0]?.templateName);
          setHasTemplate(true);
        }
      }
      ruOptions.items.forEach((card, idx) => {
        temp[card.templateId ? card.templateId : Date.now()] = {
          titleRu: card.title,
          titleKz: kzOptions.items[idx].title,
          contentRu: card.content,
          contentKz: kzOptions.items[idx].content,
          image: card.image,
        };
      });
    }
    return temp;
  });
  const addCard = async () => {
    try {
      const ruPage = await createPage({
        title: "templatePage",
        slug: `/${template ? template.name.toLowerCase().replace(/\s/g, "") : "template"}-${Date.now()}`,
        navigation_id: null,
        navigation_type: "template",
        order: 1,
        language_key: "ru",
      });
      const kzPage = await createPage({
        title: "templatePage",
        slug: `/${template ? template.name.toLowerCase().replace(/\s/g, "") : "template"}-${Date.now()}`,
        navigation_id: null,
        navigation_type: "template",
        order: 1,
        language_key: "kz",
      });
      setCards({
        ...cards,
        [`${ruPage.id}*${kzPage.id}`]: {
          titleRu: "",
          titleKz: "",
          contentRu: "",
          contentKz: "",
          image: null,
          page: { ru: ruPage, kz: kzPage },
        },
      });
    } catch (e) {}
  };
  const saveImageAndGetUrl = async (image: File | null | string) => {
    if (typeof image == "string") {
      return image;
    }
    if (image) {
      const { file_name } = await uploadFile(image);
      return file_name;
    } else {
      return "";
    }
  };
  const writeChanges = (id: string, field: string, value: string | File) => {
    if (!(id in cards)) return;
    setCards({ ...cards, [id]: { ...cards[id], [field]: value } });
  };
  const onSave = async () => {
    if (ruPageId && kzPageId) {
      const RuItems = await Promise.all(
        Object.keys(cards).map(async (key) => {
          if (!hasTemplate) {
            const ids = key.split("*");
            try {
              deletePage(+ids[0]);
            } catch (e) {
              console.error(e);
            }
          }
          const image = await saveImageAndGetUrl(cards[key].image);
          return {
            title: cards[key].titleRu,
            content: cards[key].contentRu,
            image,
            href: cards[key].page?.ru.slug,
            templateId: key,
            templateName: template ? template.name : null,
          };
        }),
      );
      const KzItems = await Promise.all(
        Object.keys(cards).map(async (key) => {
          if (!hasTemplate) {
            const ids = key.split("*");
            try {
              deletePage(+ids[0]);
            } catch (e) {
              console.error(e);
            }
          }
          const image = await saveImageAndGetUrl(cards[key].image);
          return {
            title: cards[key].titleKz,
            content: cards[key].contentKz,
            image,
            href: cards[key].page?.ru.slug,
            templateId: key,
            templateName: template ? template.name : null,
          };
        }),
      );
      createCardsWidget({
        widget_type: "Cards",
        order,
        options: JSON.stringify({
          title: title.ru,
          variant,
          items: RuItems,
          language_key: "ru",
          navigation_id: +ruPageId,
        }),
        language_key: "ru",
        navigation_id: +ruPageId,
      });
      createCardsWidget({
        widget_type: "Cards",
        order,
        options: JSON.stringify({
          title: title.kz,
          variant,
          items: KzItems,
        }),
        language_key: "kz",
        navigation_id: +kzPageId,
      });
    }
  };
  const onEdit = async () => {
    if (ruWidgetId && kzWidgetId) {
      const RuItems = await Promise.all(
        Object.keys(cards).map(async (key) => {
          if (!hasTemplate) {
            const ids = key.split("*");
            try {
              deletePage(+ids[0]);
            } catch (e) {
              console.error(e);
            }
          }
          const image = await saveImageAndGetUrl(cards[key].image);
          return {
            title: cards[key].titleRu,
            content: cards[key].contentRu,
            image: image,
            href: cards[key].page?.ru.slug,
            templateId: key,
            templateName: template ? template.name : null,
          };
        }),
      );
      const KzItems = await Promise.all(
        Object.keys(cards).map(async (key) => {
          if (!hasTemplate) {
            const ids = key.split("*");
            try {
              deletePage(+ids[0]);
            } catch (e) {
              console.error(e);
            }
          }
          const image = await saveImageAndGetUrl(cards[key].image);
          return {
            title: cards[key].titleKz,
            content: cards[key].contentKz,
            image,
            href: cards[key].page?.ru.slug,
            templateId: key,
            templateName: template ? template.name : null,
          };
        }),
      );

      editCardsWidget({
        id: ruWidgetId,
        body: {
          options: JSON.stringify({
            title: title.ru,
            variant,
            items: RuItems,
          }),
        },
      });
      editCardsWidget({
        id: kzWidgetId,
        body: {
          options: JSON.stringify({
            title: title.kz,
            variant,
            items: KzItems,
          }),
        },
      });
    }
  };

  const deleteCard = (id: string) => {
    setCards((prev) => {
      let temp = prev;
      delete temp[id];
      return { ...temp };
    });
    const ids = id.split("*");
    ids.forEach((id) => {
      try {
        deletePage(+id);
      } catch (e) {}
    });
  };
  return (
    <>
      <div className="flex gap-2 items-center">
        <Label>Select card variant</Label>
        <Select value={variant} onValueChange={(value) => setVariant(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="base">Base</SelectItem>
            <SelectItem value="horizontal">Horizontal</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
      {hasTemplate && (
        <TemplatesSelect savedTemplate={savedTemplate} onSelect={setTemplate} />
      )}
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Title RU"
          type="text"
          value={title.ru}
          onChange={(e) => setTitle({ ...title, ru: e.target.value })}
        />
        <Input
          label="Title KZ"
          type="text"
          value={title.kz}
          onChange={(e) => setTitle({ ...title, kz: e.target.value })}
        />
      </div>
      <Button onClick={addCard} className="w-full">
        Add new Card
      </Button>
      <ScrollArea className="h-[320px] rounded-md border p-4 ">
        {Object.keys(cards).map((key, idx) => (
          <EditCardItem
            writeChanges={writeChanges}
            card={cards[key]}
            deleteCard={() => deleteCard(key)}
            key={idx}
            id={key}
            templateWidgets={template?.widgets}
          />
        ))}
      </ScrollArea>
      <Button
        loading={createIsPending || editIsPending}
        disabled={createIsPending || editIsPending}
        onClick={ruOptions ? onEdit : onSave}
      >
        Save
      </Button>
    </>
  );
};
