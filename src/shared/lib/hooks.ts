"use client";

import { createPage, deletePage, getTemplates } from "@/shared/api/pages";
import {
  createWidget,
  editWidget,
  getTemplateWidgets,
  getWidgetProps,
} from "@/shared/api/widgets";
import { queryClient } from "@/shared/lib/client";
import { backendImageUrl } from "@/shared/lib/constants";
import { TemplateSelectType, WidgetProps } from "@/shared/lib/types";
import { GetValuesByLang, saveToServerAndGetUrl } from "@/shared/lib/utils";
import { useToast } from "@/shared/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, ReactNode } from "react";

export const useTemplates = ({ savedTemplate }: { savedTemplate: string }) => {
  const [isSaved, setIsSaved] = useState(() => !!savedTemplate);
  const {
    data: templatePages,
    isFetching: pagesIsFetching,
    error: pagesError,
    isSuccess,
  } = useQuery({
    queryKey: ["getTemplates"],
    queryFn: getTemplates,
  });
  const [templates, setTemplates] = useState<TemplateSelectType[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateSelectType | null>(null);
  useEffect(() => {
    if (templatePages && isSuccess) {
      try {
        const templates: TemplateSelectType[] = [];
        templatePages.forEach((template) => {
          if (template.slug == "template") {
            const widgetNames: string[] = [];
            getTemplateWidgets(template.id).then((widgets) => {
              widgets.forEach((w) => widgetNames.push(w.widget_type));
            });
            templates.push({
              id: template.id,
              name: template.title,
              widgets: widgetNames,
            });
          }
        });

        setTemplates(templates);
      } catch (e) {
        setTemplates([]);
      }
    }
  }, [templatePages, isSuccess]);
  const onSelect = (
    template: string,
    saveWidgets: (widget: TemplateSelectType) => void,
  ) => {
    setSelectedTemplate((prev) => {
      const selected = templates.filter((t) => t.name === template)[0];
      saveWidgets(selected);
      return selected;
    });
  };

  return {
    isSaved,
    templates,
    setTemplates,
    selectedTemplate,
    setSelectedTemplate,
    onSelect,
  };
};
type useTemplateWidgetProps = {
  widgetName: string;
  queryKey: string;
  ruPageId: number | null;
  kzPageId: number | null;
  order: number;
  itemsStateFields: string[];
  widgetStateFields: string[];
  withTemplate: boolean;
};
const fieldsWithTemplate = ["savedTemplate", "templateWidgets"];
export function useTemplateWidget<StateProps>({
  widgetName,
  queryKey,
  ruPageId,
  kzPageId,
  itemsStateFields,
  widgetStateFields,
  withTemplate,
  order,
}: useTemplateWidgetProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const {
    mutate: createCardsWidget,
    isPending: createIsPending,
    error,
  } = useMutation({
    mutationKey: [`create${widgetName}Widget`],
    mutationFn: createWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setLoading(false);
      toast({
        title: "Виджет создан.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Ошибка при создании виджета.",
      });
      setLoading(false);
      console.log(error);
    },
  });
  const { mutate: editWidgetMutation, isPending: editIsPending } = useMutation({
    mutationKey: ["editCardsWidget"],
    mutationFn: editWidget,
    onSuccess: () => {
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast({
        title: "Виджет изменен.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Ошибка при изменении виджета.",
      });
      setLoading(false);
      console.log(error);
    },
  });

  const [widgetMainProps, setWidgetMainProps] = useState<any>({});

  const [props, setProps] = useState<WidgetProps | null>(null);

  useEffect(() => {
    if (ruPageId && kzPageId)
      getWidgetProps({ ruPageId, kzPageId, order }).then((data) => {
        setProps(data);
      });
  }, [ruPageId, kzPageId, order]);
  const [toCompare, setToCompare] = useState({});
  useEffect(() => {
    if (props) {
      setWidgetMainProps(
        widgetStateFields.reduce((obj: any, field: string) => {
          if (field.endsWith("Kz")) {
            obj[field] = props.kzOptions[field.slice(0, -2)];
          } else if (field.endsWith("Ru")) {
            obj[field] = props.ruOptions[field.slice(0, -2)];
          } else {
            obj[field] = props.ruOptions[field];
          }
          return obj;
        }, {}),
      );
      setToCompare({ ...widgetMainProps });
      const temp: Record<string, StateProps> = {};
      let items = props.ruOptions.items;
      if (Array.isArray(items)) {
        items.forEach((item: any, idx: number) => {
          temp[item.templateId] = itemsStateFields.reduce(
            (obj: any, field: string) => {
              if (field.endsWith("Kz")) {
                obj[field] = props.kzOptions.items[idx][field.slice(0, -2)];
              } else if (field.endsWith("Ru")) {
                obj[field] = item[field.slice(0, -2)];
              } else {
                obj[field] = item[field];
              }
              return obj;
            },
            withTemplate
              ? {
                  templateSlug: item.templateSlug,
                  href: item.href,
                }
              : {},
          );
        });
        setItems(temp);
        setToCompare((prev) => ({ ...prev, items: temp }));
      }
    }
  }, [props]);
  const [items, setItems] = useState<Record<string, any>>({});
  const [lockSaveBtn, setLockSaveBtn] = useState(true);
  useEffect(() => {
    if (
      JSON.stringify({ ...widgetMainProps, items }) !==
      JSON.stringify(toCompare)
    ) {
      setLockSaveBtn(false);
    } else {
      setLockSaveBtn(true);
    }
  }, [widgetMainProps, items]);

  const createTemplatePagesForCard = async () => {
    const ruPage = await createPage({
      title: "templatePage",
      slug: `/template-${Date.now()}`,
      navigation_id: null,
      navigation_type: "template",
      order: 1,
      language_key: "ru",
    });
    const kzPage = await createPage({
      title: "templatePage",
      slug: ruPage.slug,
      navigation_id: null,
      navigation_type: "template",
      order: 1,
      language_key: "kz",
    });

    return { ruPage, kzPage };
  };
  const addItem = async () => {
    try {
      let ruPage: any, kzPage: any;

      if (withTemplate) {
        ({ ruPage, kzPage } = await createTemplatePagesForCard());
      }

      const key = withTemplate
        ? `${ruPage.id}*${kzPage.id}`
        : Date.now().toString();

      const newItem = (
        withTemplate
          ? itemsStateFields
          : itemsStateFields.concat(fieldsWithTemplate)
      ).reduce(
        (obj: any, field: string) => {
          obj[field] = "";
          return obj;
        },
        withTemplate
          ? {
              templateSlug: ruPage.slug,
              page: { ru: ruPage, kz: kzPage },
            }
          : {},
      );

      setItems((prevItems) => ({
        ...prevItems,
        [key]: newItem,
      }));
    } catch (e) {
      console.log(e);
    }
  };
  const writeMainPropsChanges = (key: string, value: string) => {
    setWidgetMainProps({ ...widgetMainProps, [key]: value });
  };
  const writeItemsChanges = (
    id: string,
    field: string,
    value: string | File,
  ) => {
    if (!(id in items)) return;
    setItems((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };
  const onSave = async () => {
    if (ruPageId && kzPageId) {
      const RuItems = await Promise.all(
        Object.keys(items).map(async (key) => {
          const image = await saveToServerAndGetUrl(items[key].image);
          return {
            ...GetValuesByLang(
              "Ru",
              items[key],
              withTemplate
                ? itemsStateFields.concat(fieldsWithTemplate)
                : itemsStateFields,
            ),
            href: items[key].savedTemplate ? items[key].templateSlug : "",
            image,
            templateId: key,
            templateSlug: items[key].page?.ru.slug,
          };
        }),
      );
      const KzItems = await Promise.all(
        Object.keys(items).map(async (key) => {
          const image = await saveToServerAndGetUrl(items[key].image);
          return {
            ...GetValuesByLang(
              "Kz",
              items[key],
              withTemplate
                ? itemsStateFields.concat(fieldsWithTemplate)
                : itemsStateFields,
            ),
            href: items[key].savedTemplate ? items[key].templateSlug : "",
            image,
            templateId: key,
            templateSlug: items[key].page?.ru.slug,
          };
        }),
      );

      createCardsWidget({
        widget_type: widgetName,
        order,
        options: JSON.stringify({
          ...GetValuesByLang("Ru", widgetMainProps, widgetStateFields),
          items: RuItems,
          language_key: "ru",
          navigation_id: +ruPageId,
        }),
        language_key: "ru",
        navigation_id: +ruPageId,
      });
      createCardsWidget({
        widget_type: widgetName,
        order,
        options: JSON.stringify({
          ...GetValuesByLang("Kz", widgetMainProps, widgetStateFields),
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
        Object.keys(items).map(async (key) => {
          const image = await saveToServerAndGetUrl(items[key].image);
          return {
            ...GetValuesByLang(
              "Ru",
              items[key],
              withTemplate
                ? itemsStateFields.concat(fieldsWithTemplate)
                : itemsStateFields,
            ),
            image,
            href: items[key].savedTemplate ? items[key].templateSlug : "",
            templateSlug: items[key].templateSlug,
            templateId: key,
          };
        }),
      );

      const KzItems = await Promise.all(
        Object.keys(items).map(async (key) => {
          const image = await saveToServerAndGetUrl(items[key].image);
          return {
            ...GetValuesByLang(
              "Kz",
              items[key],
              withTemplate
                ? itemsStateFields.concat(fieldsWithTemplate)
                : itemsStateFields,
            ),
            image,
            href: items[key].href
              ? items[key].href
              : items[key].page
                ? items[key].page.ru.slug
                : items[key].templateSlug,
            templateId: key,
          };
        }),
      );
      if (ruPageId && kzPageId) {
        editWidgetMutation({
          id: props.ruWidgetId,
          navigation_id: ruPageId,
          body: {
            options: JSON.stringify({
              ...GetValuesByLang("Ru", widgetMainProps, widgetStateFields),
              items: RuItems,
            }),
          },
        });
        editWidgetMutation({
          id: props.kzWidgetId,
          navigation_id: kzPageId,
          body: {
            options: JSON.stringify({
              ...GetValuesByLang("Kz", widgetMainProps, widgetStateFields),
              items: KzItems,
            }),
          },
        });
      }
    }
  };

  const deleteItem = (id: string) => {
    setItems((prev) => {
      let temp = prev;
      delete temp[id];
      return { ...temp };
    });
    if (withTemplate) {
      const ids = id.split("*");
      ids.forEach((id) => {
        try {
          deletePage(+id);
        } catch (e) {
          console.log(e);
        }
      });
    }
  };
  return {
    addItem,
    writeChanges: writeItemsChanges,
    onSave,
    onEdit,
    lockSaveBtn,
    deleteItem,
    items,
    loading,
    setLoading,
    props,
    widgetMainProps,
    writeMainPropsChanges,
  };
}
