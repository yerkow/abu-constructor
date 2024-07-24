"use client";

import { PageEditorContent } from "@/features/PageEditor/PageEditorContent";
import { createPage, deletePage } from "@/shared/api/pages";
import { queryClient } from "@/shared/lib/client";
import { Template } from "@/shared/lib/types";
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
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreatePageTemplateProps {}
export const CreateTemplateDialog = ({}: CreatePageTemplateProps) => {
  const [templateId, setTemplateId] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Template>({ mode: "onBlur" });
  const { mutate, error, isPending } = useMutation({
    mutationKey: ["createPage"],
    mutationFn: createPage,
    onSuccess: (data) => {
      reset();
      setTemplateId(data.id);
      queryClient.invalidateQueries({
        queryKey: ["getTemplates"],
      });
    },
  });
  const onSave: SubmitHandler<Template> = (data) => {
    mutate({
      title: data.title,
      navigation_type: "template",
      slug: "template",
      order: 1,
      language_key: "ru",
      navigation_id: null,
    });
  };
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className={"mb-3"}>
          Создать шаблон
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        hideCloseBtn={false}
        className="max-w-sm sm:max-w-3xl"
      >
        <DialogHeader>
          <DialogTitle>Создание шаблона</DialogTitle>
        </DialogHeader>
        {templateId ? (
          <PageEditorContent
            forTemplate
            ids={{ ru: 1, kz: 1 }}
            templateId={templateId}
            onTemplateSave={() => {
              setOpen(false);
              setTemplateId(null);
            }}
          />
        ) : (
          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSave)}>
            <Input
              label="Название шаблона"
              {...register("title", { required: true })}
            />
            <Button loading={isPending} disabled={isPending} type="submit">
              Далее
            </Button>
          </form>
        )}
        <DialogFooter className=" gap-2 sm:justify-start">
          <DialogClose asChild>
            <Button
              onClick={() => {
                if (templateId) {
                  deletePage(templateId).then(() => {
                    setTemplateId(null);
                    queryClient.invalidateQueries({
                      queryKey: ["getTemplates"],
                    });
                  });
                }
              }}
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
