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
import { usePathname, useRouter } from "next/navigation";
import { Langs } from "@/shared/lib/types";

export const PageEditor = ({ ids }: { ids: Langs }) => {
  const router = useRouter();
  const path = usePathname();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            router.push(`${path}?ruId=${ids.ru}&kzId=${ids.kz}`);
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
        {/* TODO */}
        <PageEditorContent ids={ids} />
        <DialogFooter className=" gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Отменить
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
