"use client";
import { IPage } from "@/shared/lib";
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
} from "@/shared/ui";
import { Settings } from "lucide-react";
import { useRef, useState } from "react";
import { PageEditor } from "../PageEditor/PageEditor";
const editPage = (data: IPage) => {
  let pages = localStorage.getItem("pages");
  if (pages) {
    pages = JSON.parse(pages);
    if (Array.isArray(pages)) {
      pages = pages.map((page) => {
        if (page.id == data.id) {
          return data;
        }
        return page;
      });
    }
    localStorage.setItem("pages", JSON.stringify(pages));
  } else {
    localStorage.setItem("pages", JSON.stringify([data]));
  }
};
interface EditPageDialogProps {
  page: IPage;
}
export const EditPageDialog = ({ page }: EditPageDialogProps) => {
  const [name, setName] = useState<{ ru: string; kz: string }>({
    ru: page.ru,
    kz: page.kz,
  });
  const [slug, setSlug] = useState(page.slug);
  const onEdit = () => {
    editPage({
      id: page.id,
      ...name,
      slug,
      pageType: page.pageType,
      navigation_id: page.navigation_id,
    });
    setName({ ru: "", kz: "" });
    setSlug("");
    if (closeRef.current) closeRef.current.click();
  };
  const closeRef = useRef<HTMLButtonElement>(null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Редактирование страницы ${page?.ru}</DialogTitle>
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
          <Input
            label="Slug страницы"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />

          {page.pageType == "content" && (
            <PageEditor slug={page.slug} pageId={page.id} />
          )}
        </section>
        <DialogFooter className=" gap-2 sm:justify-start">
          <DialogClose asChild>
            <Button ref={closeRef} type="button" variant="secondary">
              Отменить
            </Button>
          </DialogClose>

          <Button onClick={onEdit}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
