"use client";
import { getTemplates } from "@/shared/api/pages";
import { getTemplateWidgets, getWidgets } from "@/shared/api/widgets";
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { cache, Dispatch, SetStateAction, useEffect, useState } from "react";
interface TemplatesSelectProps {
  savedTemplate: string | null;
  onSelect: Dispatch<SetStateAction<(typeof mockTemplates)[0] | null>>;
}
const mockTemplates = [
  { name: "Template1", widgets: ["Carousel", "List", "Cards"] },
  { name: "Template2", widgets: ["Text", "Text"] },
];
export const TemplatesSelect = ({
  savedTemplate,
  onSelect,
}: TemplatesSelectProps) => {
  const {
    data: templatePages,
    isFetching: pagesIsFetching,
    error: pagesError,
  } = useQuery({
    queryKey: ["getTemplates"],
    queryFn: getTemplates,
  });
  const [templates, setTemplates] = useState<typeof mockTemplates>([]);
  const [template, setTemplate] = useState<string>("");
  useEffect(() => {
    if (templatePages) {
      try {
        const templates: typeof mockTemplates = [];
        templatePages.forEach((template) => {
          if (template.slug == "template") {
            const widgetNames: string[] = [];
            getTemplateWidgets(template.id).then((widgets) => {
              widgets.forEach((w) => widgetNames.push(w.widget_type));
            });
            templates.push({ name: template.title, widgets: widgetNames });
          }
        });
        setTemplates(templates);
      } catch (e) {
        setTemplates([]);
      }
    }
  }, [templatePages]);
  useEffect(() => {
    if (savedTemplate) {
      setTemplate(savedTemplate);

      onSelect(templates.filter((t) => t.name == savedTemplate)[0]);
    }
  }, [savedTemplate, templates]);
  const onValueSelect = (value: string) => {
    setTemplate(value);
    onSelect(templates.filter((t) => t.name == value)[0]);
  };

  return (
    <div className="flex gap-2 items-center">
      <Label>Выберите шаблон:</Label>
      <Select value={template} onValueChange={(value) => onValueSelect(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Шаблон" />
        </SelectTrigger>
        <SelectContent>
          {templates.map((t) => (
            <SelectItem key={t.name} value={t.name}>
              {t.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
