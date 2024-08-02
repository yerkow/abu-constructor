"use client";

import { createPage } from "@/shared/api/pages";
import { IPage, PageType } from "@/shared/lib";
import { queryClient } from "@/shared/lib/client";
import { BackedPage } from "@/shared/lib/types";
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
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreatePageDialogProps {
  ruParentId?: number;
  kzParentId?: number;
  slug?: string;
}
export const CreatePageDialog = ({
  ruParentId,
  kzParentId,
  slug,
}: CreatePageDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Omit<IPage, "id">>({ mode: "onBlur", defaultValues: { slug } });

  const { mutate, error, isPending } = useMutation({
    mutationKey: ["createPage"],
    mutationFn: createPage,
    onSuccess: () => {
      reset();
      if (closeRef.current) closeRef.current.click();
      queryClient.invalidateQueries({
        queryKey: !(ruParentId && kzParentId) ? ["mainPages"] : [`childPages`],
      });
    },
  });
  const { id } = useParams();

  const [pageType, setPageType] = useState<PageType>("content");
  const onSave: SubmitHandler<Omit<IPage, "id">> = (data) => {
    if (data.ru && data.kz) {
      mutate({
        title: data.ru,
        navigation_type: pageType,
        slug: data.slug,
        order: data.order,
        language_key: "ru",
        navigation_id: ruParentId ? ruParentId : null,
      });
      mutate({
        title: data.kz,
        navigation_type: pageType,
        slug: data.slug,
        order: data.order,
        language_key: "kz",
        navigation_id: kzParentId ? kzParentId : null,
      });
    }
  };
  const closeRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations("pages");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className={"mb-3"}>
          {t("create.btn")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("create.title")}</DialogTitle>
          <DialogDescription>{t("create.desc")}</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSave)}>
          <Input
            label={t("form.nameRu")}
            {...register("ru", { required: true })}
            error={errors.ru?.message}
          />
          <Input
            label={t("form.nameKz")}
            {...register("kz", { required: true })}
            error={errors.kz?.message}
          />
          <div className="flex flex-col gap-3">
            <Label htmlFor="pageType">{t("form.select.placeholder")}</Label>
            <Select
              value={pageType}
              onValueChange={(value) => setPageType(value as PageType)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("form.select.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"content"}>
                  {t("form.select.content")}
                </SelectItem>
                <SelectItem value={"group"}>
                  {t("form.select.group")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            label={t("form.slug")}
            {...register("slug", { required: true })}
            error={errors.slug?.message}
          />
          <Input
            type="number"
            label={t("form.number")}
            {...register("order", { required: true })}
            error={errors.order?.message}
          />
          <Button loading={isPending} disabled={isPending} type="submit">
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
              {t("create.decline")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
