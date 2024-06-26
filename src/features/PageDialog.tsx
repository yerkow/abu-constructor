import { cn } from "@/shared/lib/utils";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { Settings } from "lucide-react";
interface PageDialogProps {
  variant: "create" | "edit";
  page?: {
    id: number;
    ru: string;
    kz: string;
    slug: string;
  };
}
export const PageDialog = ({ variant, page }: PageDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className={cn(variant == "create" && "mb-3")}>
          {variant == "create" ? "Создать страницу" : <Settings />}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {variant == "create"
              ? "Создание страницы"
              : `Редактирование страницы ${page?.ru} `}
          </DialogTitle>
        </DialogHeader>
        <section className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-3">
            <Input label="Название на русском" />
            <Input label="Название на казахском" />
          </div>
          <div className="flex gap-2 flex-col ">
            <Label>Тип страницы</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Тип страницы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="group">Дочерние страницы</SelectItem>
                <SelectItem value="content">Контент</SelectItem>
                <SelectItem value="details">Детальнее</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input label="Slug страницы" />
        </section>
        <DialogFooter className=" gap-2 sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Отменить
            </Button>
          </DialogClose>

          <Button>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
