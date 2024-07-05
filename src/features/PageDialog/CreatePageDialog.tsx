"use client";

import { IPage, PageType } from "@/shared/lib";
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
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { PageEditor } from "../PageEditor/PageEditor";

const createPage = (data: IPage) => {
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
interface CreatePageDialogProps {
  parentPage?: IPage;
}
export const CreatePageDialog = ({ parentPage }: CreatePageDialogProps) => {
  const [name, setName] = useState<{ ru: string; kz: string }>({
    ru: "",
    kz: "",
  });
  const { id } = useParams();
  const [slug, setSlug] = useState(parentPage ? parentPage.slug + "/" : "");
  const [pageType, setPageType] = useState<PageType>("group");
  const onSave = () => {
    createPage({
      ...name,
      pageType,
      slug,
      id: Date.now(),
      navigation_id: !Array.isArray(id) ? +id : null,
    });
    setName({ ru: "", kz: "" });
    setSlug("");
    if (closeRef.current) closeRef.current.click();
  };
  const closeRef = useRef<HTMLButtonElement>(null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className={"mb-3"}>
          Создать страницу
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Создание страницы</DialogTitle>
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
          <Select onValueChange={(value) => setPageType(value as PageType)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Тип страницы" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"content"}>Content</SelectItem>
              <SelectItem value={"group"}>Group</SelectItem>
            </SelectContent>
          </Select>
          <Input
            label="Slug страницы"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </section>
        {pageType == "content" && <PageEditor />}
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
