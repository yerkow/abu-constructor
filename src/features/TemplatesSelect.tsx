import { TemplateSelectType } from "@/shared/lib/types";
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
interface TemplatesSelectProps {
  savedTemplate: string | null;
  templates: TemplateSelectType[];
  onSelect: (template: TemplateSelectType) => void;
}

export const TemplatesSelect = ({
  templates,
  savedTemplate,
  onSelect,
}: TemplatesSelectProps) => {
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
