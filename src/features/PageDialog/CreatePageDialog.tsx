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
import { useMutation } from "@tanstack/react-query";
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
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSave)}>
          <Input
            label="Название на русском"
            {...register("ru", { required: true })}
            error={errors.ru?.message}
          />
          <Input
            label="Название на казахском"
            {...register("kz", { required: true })}
            error={errors.kz?.message}
          />
          <Select
            value={pageType}
            defaultValue="content"
            onValueChange={(value) => setPageType(value as PageType)}
          >
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
            {...register("slug", { required: true })}
            error={errors.slug?.message}
          />
          <Input
            type="number"
            label="Номер страницы"
            {...register("order", { required: true })}
            error={errors.order?.message}
          />
          <Button loading={isPending} disabled={isPending} type="submit">
            Сохранить
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
              Отменить
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
