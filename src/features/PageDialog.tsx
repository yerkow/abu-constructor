"use client";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { Settings } from "lucide-react";
import { useRef, useState } from "react";
import { PageEditor } from "./PageEditor/PageEditor";
interface PageDialogProps {
  variant: "create" | "edit";
  parentId?: number;
  withContent: boolean;
  page?: {
    id: number;
    ru: string;
    kz: string;
    slug: string;
  };
}
const createPage = (data: {
  ru: string;
  kz: string;
  pageType: string;
  slug: string;
  id: number;
}) => {
  let pages = localStorage.getItem("pages");
  if (pages) {
    pages = JSON.parse(pages);
    if (Array.isArray(pages)) {
      pages.push(data);
    }
    localStorage.setItem("pages", JSON.stringify(pages));
  } else {
    localStorage.setItem("pages", JSON.stringify([data]));
  }
};
export const PageDialog = ({ variant, page, withContent }: PageDialogProps) => {
  const [name, setName] = useState<{ ru: string; kz: string }>({
    ru: "",
    kz: "",
  });
  const [slug, setSlug] = useState("");
  const [pageType, setPageType] = useState("");
  const onSave = () => {
    createPage({ ...name, pageType, slug, id: Date.now() });
    setName({ ru: "", kz: "" });
    setSlug("");
    setPageType("");
    if (closeRef.current) closeRef.current.click();
  };
  const closeRef = useRef<HTMLButtonElement>(null);
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
            <Input
              label="Название на русском"
              value={name.ru}
              onChange={(e) => setName({ ...name, ru: e.target.value })}
            />
            <Input
              label="Название на казахском"
              value={name.kz}
              onChange={(e) => setName({ ...name, kz: e.target.value })}
            />
          </div>
          {!withContent && (
            <Select onValueChange={(value) => setPageType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Тип страницы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"content"}>Content</SelectItem>
                <SelectItem value={"group"}>Group</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Input
            label="Slug страницы"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />

          {withContent && <PageEditor />}
        </section>
        <DialogFooter className=" gap-2 sm:justify-start">
          <DialogClose asChild>
            <Button ref={closeRef} type="button" variant="secondary">
              Отменить
            </Button>
          </DialogClose>

          <Button onClick={onSave}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
