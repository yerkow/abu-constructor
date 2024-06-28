"use client";
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
interface TemplatesSelectProps {
  onSelect: Dispatch<SetStateAction<(typeof mockTemplates)[0] | null>>;
}
const mockTemplates = [
  { name: "Template1", widgets: ["Carousel", "Text"] },
  { name: "Template2", widgets: ["Text", "Text"] },
];
export const TemplatesSelect = ({ onSelect }: TemplatesSelectProps) => {
  const [templates, setTemplates] = useState<typeof mockTemplates>([]);
  useEffect(() => {
    setTemplates(mockTemplates);
  }, []);
  const onValueSelect = (value: string) => {
    onSelect(mockTemplates.filter((t) => t.name == value)[0]);
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
