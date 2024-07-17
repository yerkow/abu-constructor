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
import { useTemplates } from "@/shared/lib/hooks";
import {
  BackedPage,
  TemplateSelectType,
  WidgetProps,
} from "@/shared/lib/types";
import { cn } from "@/shared/lib/utils";
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
  const { toast } = useToast();
  const {
    mutate: createCarouselWidget,
    isPending: createIsPending,
    error,
  } = useMutation({
    mutationKey: ["createCarouselWidget"],
    mutationFn: createWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast({
        title: "Виджет создан.",
      });
    },
  });
  const { mutate: editCarouselWidget, isPending: editIsPending } = useMutation({
    mutationKey: ["editCarouselWidget"],
    mutationFn: editWidget,
    onSuccess: () => {
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
      const temp: CarouselState = {};
      const carouselItems = props.ruOptions.items;
      if (Array.isArray(carouselItems)) {
        if (carouselItems[0]) {
          if (carouselItems[0]?.templateName) {
            setSavedTemplate(carouselItems[0]?.templateName);
            setHasTemplate(true);
          }
        }
        carouselItems.forEach((carouselItem, idx) => {
          temp[carouselItem.templateId ? carouselItem.templateId : Date.now()] =
            {
              titleRu: carouselItem.title,
              href: carouselItem.href,
              titleKz: props.kzOptions.items[idx].title,
              contentRu: carouselItem.content,
              contentKz: props.kzOptions.items[idx].content,
              image: carouselItem.image,
            };
        });
      }
      setCarouselItems(temp);
    }
  }, [props]);

  const [carouselItems, setCarouselItems] = useState<CarouselState>({});
  const addCarouselItem = async () => {
    try {
      const ruPage = await createPage({
        title: "templatePage",
        slug: `/${selectedTemplate ? selectedTemplate.name.toLowerCase().replace(/\s/g, "") : "template"}-${Date.now()}`,
        navigation_id: null,
        navigation_type: "template",
        order: 1,
        language_key: "ru",
      });
      const kzPage = await createPage({
        title: "templatePage",
        slug: `/${selectedTemplate ? selectedTemplate.name.toLowerCase().replace(/\s/g, "") : "template"}-${Date.now()}`,
        navigation_id: null,
        navigation_type: "template",
        order: 1,
        language_key: "kz",
      });
      setCarouselItems({
        ...carouselItems,
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
    if (!(id in carouselItems)) return;
    setCarouselItems({
      ...carouselItems,
      [id]: { ...carouselItems[id], [field]: value },
    });
  };
  const onSave = async () => {
    if (ruPageId && kzPageId) {
      const RuItems = await Promise.all(
        Object.keys(carouselItems).map(async (key) => {
          if (!hasTemplate) {
            const ids = key.split("*");
            try {
              deletePage(+ids[0]);
            } catch (e) {
              console.error(e);
            }
          }
          const image = await saveImageAndGetUrl(carouselItems[key].image);
          return {
            title: carouselItems[key].titleRu,
            content: carouselItems[key].contentRu,
            image,
            href: hasTemplate ? carouselItems[key].page?.ru.slug : "",
            templateId: key,
            templateName: selectedTemplate ? selectedTemplate.name : null,
          };
        }),
      );
      const KzItems = await Promise.all(
        Object.keys(carouselItems).map(async (key) => {
          if (!hasTemplate) {
            const ids = key.split("*");
            try {
              deletePage(+ids[0]);
            } catch (e) {
              console.error(e);
            }
          }
          const image = await saveImageAndGetUrl(carouselItems[key].image);
          return {
            title: carouselItems[key].titleKz,
            content: carouselItems[key].contentKz,
            image,
            href: carouselItems[key].page?.ru.slug,
            templateId: key,
            templateName: selectedTemplate ? selectedTemplate.name : null,
          };
        }),
      );
      createCarouselWidget({
        widget_type: "Carousel",
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
      createCarouselWidget({
        widget_type: "Carousel",
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
  console.log(Object.values(carouselItems).map((c) => c.href));

  const onEdit = async () => {
    if (props) {
      const RuItems = await Promise.all(
        Object.keys(carouselItems).map(async (key) => {
          if (!hasTemplate) {
            const ids = key.split("*");
            try {
              deletePage(+ids[0]);
            } catch (e) {
              console.error(e);
            }
          }

          const image = await saveImageAndGetUrl(carouselItems[key].image);
          return {
            title: carouselItems[key].titleRu,
            content: carouselItems[key].contentRu,
            image: image,
            href: carouselItems[key].href
              ? carouselItems[key].href
              : carouselItems[key].page?.ru.slug,
            templateId: key,
            templateName: selectedTemplate ? selectedTemplate.name : null,
          };
        }),
      );
      const KzItems = await Promise.all(
        Object.keys(carouselItems).map(async (key) => {
          if (!hasTemplate) {
            const ids = key.split("*");
            try {
              deletePage(+ids[0]);
            } catch (e) {
              console.error(e);
            }
          }
          const image = await saveImageAndGetUrl(carouselItems[key].image);
          return {
            title: carouselItems[key].titleKz,
            content: carouselItems[key].contentKz,
            href: carouselItems[key].href
              ? carouselItems[key].href
              : carouselItems[key].page?.kz.slug,

            image,
            templateId: key,
            templateName: selectedTemplate ? selectedTemplate.name : null,
          };
        }),
      );

      editCarouselWidget({
        id: props.ruWidgetId,
        body: {
          options: JSON.stringify({
            title: title.ru,
            variant,
            items: RuItems,
          }),
        },
      });
      editCarouselWidget({
        id: props.kzWidgetId,
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

  const deleteCarouselItem = (id: string) => {
    setCarouselItems((prev) => {
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
      <Button onClick={addCarouselItem} className="w-full">
        Add new Carousel Item
      </Button>
      <section className="max-h-[460px] flex flex-col gap-10 overflow-y-scroll w-full  rounded-md border p-4 ">
        {Object.keys(carouselItems).map((key, idx) => (
          <EditCarouselItem
            writeChanges={writeChanges}
            carouselItem={carouselItems[key]}
            deleteCarouselItem={() => deleteCarouselItem(key)}
            key={idx}
            id={key}
            templateWidgets={
              selectedTemplate ? selectedTemplate.widgets : undefined
            }
          />
        ))}
      </section>
      <Button
        loading={createIsPending || editIsPending}
        disabled={createIsPending || editIsPending}
        onClick={props ? onEdit : onSave}
      >
        Save
      </Button>
    </>
  );
};
