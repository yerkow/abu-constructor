"use client";
import { TemplatesSelect } from "@/features";
import { createPage, deletePage } from "@/shared/api/pages";
import {
  createWidget,
  editWidget,
  getWidgetProps,
  getWidgets,
  uploadFile,
} from "@/shared/api/widgets";
import { queryClient } from "@/shared/lib/client";
import {
  BackedPage,
  TemplateSelectType,
  Widget,
  WidgetProps,
} from "@/shared/lib/types";
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
  useToast,
  WidgetView,
} from "@/shared/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { CarouselEditModal } from "../Carousel/CarouselEditModal";
import { ListEditModal } from "../List/ListEditModal";
import { TextEditModal } from "../Text/TextEditModal";
import { EditCardItem } from "@/widgets/Cards/EditCardItem";
import { useTemplates } from "@/shared/lib/hooks";
import { saveToServerAndGetUrl } from "@/shared/lib/utils";
interface CardsEditModalProps {
  variant?: "dialog" | "card";
  order: number;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
}
export const CardsEditModal = ({
  variant = "card",
  order,
  ruPageId,
  kzPageId,
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

export type EditCardProps = {
  titleRu: string;
  titleKz: string;
  contentRu: string;
  contentKz: string;
  href?: string;
  image: File | null;
  templateSlug: string;
  page?: {
    ru: BackedPage;
    kz: BackedPage;
  };
};
type CardsState = Record<string, EditCardProps>;
type Template = {
  name: string;
  widgets: string[];
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
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const {
    mutate: createCardsWidget,
    isPending: createIsPending,
    error,
  } = useMutation({
    mutationKey: ["createCardsWidget"],
    mutationFn: createWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setLoading(false);
      toast({
        title: "Виджет создан.",
      });
    },
  });
  const { mutate: editCardsWidget, isPending: editIsPending } = useMutation({
    mutationKey: ["editCardsWidget"],
    mutationFn: editWidget,
    onSuccess: () => {
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast({
        title: "Виджет изменен.",
      });
    },
  });

  const [hasTemplate, setHasTemplate] = useState(false);
  const slug = useSearchParams().get("edittingSlug");
  const { templates, setTemplates, selectedTemplate, setSelectedTemplate } =
    useTemplates();
  const handleTemplate = (template: TemplateSelectType) => {
    setSelectedTemplate(template);
  };
  const [savedTemplate, setSavedTemplate] = useState<string | null>(null);
  useEffect(() => {
    if (savedTemplate) {
      setSelectedTemplate(templates.filter((t) => t.name === savedTemplate)[0]);
    }
  }, [savedTemplate]);
  const [variant, setVariant] = useState("base");
  const [title, setTitle] = useState({
    ru: "",
    kz: "",
  });

  //fetch props if edit
  const [props, setProps] = useState<WidgetProps | null>(null);
  useEffect(() => {
    if (ruPageId && kzPageId)
      getWidgetProps({ ruPageId, kzPageId, order }).then((data) => {
        setProps(data);
      });
  }, [ruPageId, kzPageId, order]);
  useEffect(() => {
    if (props) {
      setTitle({ ru: props.ruOptions.title, kz: props.kzOptions.title });
      setVariant(props.ruOptions.variant);
      const temp: CardsState = {};
      let cards = props.ruOptions.items;
      if (Array.isArray(cards)) {
        if (cards[0]) {
          const templateName = cards[0].templateName;
          if (
            templateName &&
            templates.findIndex((t) => t.name === templateName) !== -1
          ) {
            setSavedTemplate(cards[0]?.templateName);
            setHasTemplate(true);
          }
        }
        // cards = cards.filter((card) => {
        //   if (
        //     card.templateName &&
        //     templates.findIndex((t) => t.name === card.templateName) !== -1
        //   ) {
        //     return true;
        //   }
        //   return false;
        // });
        cards.forEach((card: any, idx: number) => {
          temp[card.templateId] = {
            templateSlug: card.templateSlug,
            titleRu: card.title,
            titleKz: props.kzOptions.items[idx].title,
            href: card.href,
            contentRu: card.content,
            contentKz: props.kzOptions.items[idx].content,
            image: card.image,
          };
        });
      }
      setCards(temp);
    }
  }, [props]);

  const [cards, setCards] = useState<CardsState>({});
  const createTemplatePagesForCard = async () => {
    const ruPage = await createPage({
      title: "templatePage",
      slug: `/${selectedTemplate ? selectedTemplate.name.toLowerCase().replace(/\s/g, "") : "template"}-${Date.now()}`,
      navigation_id: selectedTemplate ? selectedTemplate.id : null,
      navigation_type: "template",
      order: 1,
      language_key: "ru",
    });
    const kzPage = await createPage({
      title: "templatePage",
      slug: ruPage.slug,
      navigation_id: selectedTemplate ? selectedTemplate.id : null,
      navigation_type: "template",
      order: 1,
      language_key: "kz",
    });

    return { ruPage, kzPage };
  };
  const addCard = async () => {
    try {
      const { ruPage, kzPage } = await createTemplatePagesForCard();
      setCards({
        ...cards,
        [`${ruPage.id}*${kzPage.id}`]: {
          titleRu: "",
          titleKz: "",
          contentRu: "",
          contentKz: "",
          image: null,
          templateSlug: ruPage.slug,
          page: { ru: ruPage, kz: kzPage },
        },
      });
    } catch (e) {}
  };
  const writeChanges = (id: string, field: string, value: string | File) => {
    if (!(id in cards)) return;
    setCards({ ...cards, [id]: { ...cards[id], [field]: value } });
  };
  const onSave = async () => {
    if (ruPageId && kzPageId) {
      const RuItems = await Promise.all(
        Object.keys(cards).map(async (key) => {
          // if (!hasTemplate) {
          //   const ids = key.split("*");
          //   try {
          //     deletePage(+ids[0]);
          //   } catch (e) {
          //     console.error(e);
          //   }
          // }
          const image = await saveToServerAndGetUrl(cards[key].image);
          return {
            title: cards[key].titleRu,
            content: cards[key].contentRu,
            image,
            href: hasTemplate ? cards[key].page?.ru.slug : "",
            templateId: key,
            templateSlug: cards[key].page?.ru.slug,
            templateName: selectedTemplate ? selectedTemplate.name : null,
          };
        }),
      );
      const KzItems = await Promise.all(
        Object.keys(cards).map(async (key) => {
          // if (!hasTemplate) {
          //   const ids = key.split("*");
          //   try {
          //     deletePage(+ids[0]);
          //   } catch (e) {
          //     console.error(e);
          //   }
          // }
          const image = await saveToServerAndGetUrl(cards[key].image);
          return {
            title: cards[key].titleKz,
            content: cards[key].contentKz,
            image,
            href: hasTemplate ? cards[key].page?.kz.slug : "",
            templateId: key,
            templateSlug: cards[key].page?.ru.slug,
            templateName: selectedTemplate ? selectedTemplate.name : null,
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
    if (props) {
      const RuItems = await Promise.all(
        Object.keys(cards).map(async (key) => {
          // if (!hasTemplate) {
          //   if (key.includes("*")) {
          //     const ids = key.split("*");
          //     try {
          //       deletePage(+ids[0]);
          //     } catch (e) {
          //       console.error(e);
          //     }
          //   }
          // }
          const image = await saveToServerAndGetUrl(cards[key].image);
          return {
            title: cards[key].titleRu,
            content: cards[key].contentRu,
            image: image,
            href: cards[key].href
              ? cards[key].href
              : cards[key].page
                ? cards[key].page.ru.slug
                : cards[key].templateSlug,
            templateId: key,
            templateName: savedTemplate
              ? savedTemplate
              : selectedTemplate
                ? selectedTemplate.name
                : null,
          };
        }),
      );

      const KzItems = await Promise.all(
        Object.keys(cards).map(async (key) => {
          // if (!hasTemplate) {
          //   if (key.includes("*")) {
          //     const ids = key.split("*");
          //     try {
          //       deletePage(+ids[0]);
          //     } catch (e) {
          //       console.error(e);
          //     }
          //   }
          // }
          const image = await saveToServerAndGetUrl(cards[key].image);
          return {
            title: cards[key].titleKz,
            content: cards[key].contentKz,
            //TODO: wrong check if templates is saved  and selectedTEmplate is null
            href: cards[key].href
              ? cards[key].href
              : cards[key].page
                ? cards[key].page.ru.slug
                : cards[key].templateSlug,
            image,
            templateId: key,
            templateName: savedTemplate
              ? savedTemplate
              : selectedTemplate
                ? selectedTemplate.name
                : null,
          };
        }),
      );
      if (ruPageId && kzPageId) {
        editCardsWidget({
          id: props.ruWidgetId,
          navigation_id: ruPageId,
          body: {
            options: JSON.stringify({
              title: title.ru,
              variant,
              items: RuItems,
            }),
          },
        });
        editCardsWidget({
          id: props.kzWidgetId,
          navigation_id: kzPageId,
          body: {
            options: JSON.stringify({
              title: title.kz,
              variant,
              items: KzItems,
            }),
          },
        });
      }
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
      } catch (e) {
        console.log(e);
      }
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
      {modalVariant === "card" && (
        <>
          {savedTemplate ? (
            <span>Использованный шаблон {savedTemplate}</span>
          ) : (
            <div className="flex items-center gap-2">
              <Checkbox
                id="template"
                checked={hasTemplate}
                onCheckedChange={() => {
                  setHasTemplate(!hasTemplate);
                  setSelectedTemplate(null);
                }}
              />
              <Label htmlFor="template" className="mt-1">
                Есть темплейт
              </Label>
            </div>
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
      <section className="max-h-[460px] flex flex-col gap-10 overflow-y-scroll w-full  rounded-md border p-4 ">
        {Object.keys(cards).map((key, idx) => (
          <EditCardItem
            writeChanges={writeChanges}
            card={cards[key]}
            deleteCard={() => deleteCard(key)}
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
