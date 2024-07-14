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
  onSelect: Dispatch<SetStateAction<(typeof mockTemplates)[0] | null>>;
}
const mockTemplates = [
  { name: "Template1", widgets: ["Carousel", "List", "Cards"] },
  { name: "Template2", widgets: ["Text", "Text"] },
];
export const TemplatesSelect = ({ onSelect }: TemplatesSelectProps) => {
  const {
    data: templatePages,
    isFetching: pagesIsFetching,
    error: pagesError,
  } = useQuery({
    queryKey: ["getTemplates"],
    queryFn: getTemplates,
  });
  const [templates, setTemplates] = useState<typeof mockTemplates>([]);
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
  const onValueSelect = (value: string) => {
    onSelect(templates.filter((t) => t.name == value)[0]);
  };

  return (
    <div className="flex gap-2 items-center">
      <Label>Выберите шаблон:</Label>
      <Select onValueChange={(value) => onValueSelect(value)}>
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
