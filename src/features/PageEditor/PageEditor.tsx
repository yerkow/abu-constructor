"use client";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";
import { PageEditorContent } from "./PageEditorContent";
import { usePageContent } from "@/shared/providers";
import { usePathname, useRouter } from "next/navigation";

export const PageEditor = ({ pageId }: { pageId: number }) => {
  const setPageContent = usePageContent();
  const router = useRouter();
  const path = usePathname();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            router.push(`${path}?editting=${pageId}`);
          }}
          size={"sm"}
        >
          Контент страницы
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Содержание страницы</DialogTitle>
        </DialogHeader>
        <PageEditorContent pageId={pageId} />
        <DialogFooter className=" gap-2 sm:justify-end">
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
