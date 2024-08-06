"use client";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";
import { PageEditorContent } from "./PageEditorContent";
import { usePathname, useRouter } from "next/navigation";
import { Langs } from "@/shared/lib/types";
import { useTranslations } from "next-intl";

export const PageEditor = ({ ids }: { ids: Langs }) => {
  const router = useRouter();
  const path = usePathname();
  const t = useTranslations("pages.pageEditor");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            router.push(`${path}?ruId=${ids.ru}&kzId=${ids.kz}`);
          }}
          size={"sm"}
        >
          {t("btn")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-[90%]  gap-4 ">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("desc")}</DialogDescription>
        </DialogHeader>
        {/* TODO */}
        <PageEditorContent ids={ids} />
        <DialogFooter className=" gap-2 sm:justify-end">
          <DialogClose
            asChild
            onClick={() => {
              router.back();
            }}
          >
            <Button type="button" variant="secondary" className="w-full">
              {t("decline")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
