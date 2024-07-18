"use client";

import { getTemplates } from "@/shared/api/pages";
import { getTemplateWidgets } from "@/shared/api/widgets";
import { TemplateSelectType } from "@/shared/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export const useTemplates = () => {
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
  const onSelect = (template: string) => {
    setSelectedTemplate(templates.filter((t) => t.name === template)[0]);
  };
  return {
    templates,
    setTemplates,
    selectedTemplate,
    setSelectedTemplate,
    onSelect,
  };
};
