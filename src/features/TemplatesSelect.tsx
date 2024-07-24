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
  onSelect: (template: string) => void;
}

export const TemplatesSelect = ({
  templates,
  savedTemplate,
  onSelect,
}: TemplatesSelectProps) => {
  return (
    <>
      {savedTemplate ? (
        <span>Использованный шаблон {savedTemplate}</span>
      ) : (
        <div className="flex gap-2 items-center">
          <Label>Выберите шаблон:</Label>
          <Select onValueChange={(value) => onSelect(value)}>
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
      )}
    </>
  );
};
