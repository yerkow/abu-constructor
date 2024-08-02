"use client";
import { PageEditor } from "@/features/PageEditor/PageEditor";
import { queryClient } from "@/shared/lib/client";
import { createPage, deletePage } from "@/shared/api/pages";
import {
  Button,
  Input,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogClose,
  Dialog,
  DialogDescription,
} from "@/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { DeleteIcon, Settings } from "lucide-react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
export const DeletePageBtn = ({
  name,
  ids,
  queryKey,
}: {
  queryKey: string[];
  name: string | null;
  ids: Record<string, number>;
}) => {
  const { mutate, error, isPending } = useMutation({
    mutationKey: [`deletePage`],
    mutationFn: deletePage,
    onSuccess: () => {
      if (closeRef.current) closeRef.current.click();
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
  const closeRef = useRef<HTMLButtonElement>(null);
  const onDelete = () => {
    Object.keys(ids).map((key) => {
      mutate(ids[key as keyof typeof ids]);
    });
  };
  const t = useTranslations("pages.delete");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <DeleteIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {t("title")} - {name}
          </DialogTitle>
          <DialogDescription>{t("desc")}</DialogDescription>
        </DialogHeader>
        <DialogFooter className=" gap-2 sm:justify-center">
          <DialogClose asChild>
            <Button ref={closeRef} type="button" variant="secondary">
              {t("decline")}
            </Button>
          </DialogClose>
          <Button onClick={onDelete} loading={isPending} disabled={isPending}>
            {t("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
