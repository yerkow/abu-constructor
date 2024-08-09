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
import { SubmitHandler, useForm } from "react-hook-form";
import { editPage } from "@/shared/api/pages";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/client";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";

interface EditPageDialogProps {
  page: IPage;
}
export const EditPageDialog = ({ page }: EditPageDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Omit<IPage, "id">>({
    mode: "onBlur",
    defaultValues: {
      ru: page.ru,
      kz: page.kz,
      order: page.order,
      slug: page.slug,
      navigation_type: page.navigation_type,
      navigation_id: page.navigation_id,
    },
  });
  const { mutate, error, isPending } = useMutation({
    mutationKey: ["editPage"],
    mutationFn: editPage,
    onSuccess: () => {
      reset();
      if (closeRef.current) closeRef.current.click();
      queryClient.invalidateQueries({ queryKey: ["childPages"] });
      queryClient.invalidateQueries({ queryKey: ["mainPages"] });
    },
  });

  const closeRef = useRef<HTMLButtonElement>(null);
  const onEdit: SubmitHandler<Omit<IPage, "id">> = ({
    ru,
    kz,
    slug,
    order,
    navigation_id,
    navigation_type,
  }) => {
    if (page.ruId && page.kzId && ru && kz) {
      mutate({
        id: page.ruId,
        data: {
          title: ru,
          slug,
          order,
        },
      });
      mutate({
        id: page.kzId,
        data: {
          title: kz,
          slug,
          order,
        },
      });
    }
  };
  const [open, setOpen] = useState(false);
  const t = useTranslations("pages");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {t("edit.title")} - {page?.ru}
          </DialogTitle>
          <DialogDescription>{t("edit.desc")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onEdit)} className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              label={t("form.nameRu")}
              {...register("ru", { required: true })}
            />
            <Input
              label={t("form.nameKz")}
              {...register("kz", { required: true })}
            />
          </div>
          <Input
            label={t("form.slug")}
            {...register("slug", { required: true })}
          />
          <Input
            type="number"
            label={t("form.number")}
            {...register("order", { required: true })}
          />

          {page.navigation_type == "content" && page.ruId && page.kzId && (
            <PageEditor
              ids={{ ru: page.ruId.toString(), kz: page.kzId.toString() }}
            />
          )}
          <Button type="submit" loading={isPending} disabled={isPending}>
            {t("form.save")}
          </Button>
        </form>
        <DialogFooter className=" gap-2 sm:justify-start">
          <DialogClose asChild>
            <Button
              className="w-full"
              ref={closeRef}
              type="button"
              variant="secondary"
            >
              {t("edit.decline")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
