"use client";
import React, { useRef, useState } from "react";
import { Types, useEditWidget, useEditWidgetContent } from "./model";
import { EditorMain, EditorItems } from "./ui";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  Input,
} from "@/shared/ui";
import { Content } from "@/shared/types";
import { UseMutateFunction } from "@tanstack/react-query";
import { EditOptionsProps, IContentCreationParams } from "./model/types";
import { useForm } from "react-hook-form";
import { viewInputByType } from "./ui";

const CardEditOptions: EditOptionsProps = {
  widgetName: "Cards",
  widgetOptions: [
    { props: "title", type: "text", placeholder: "Заголовок" },
    {
      props: "variant",
      type: "select",
      placeholder: "Вид карточек",
      values: [
        { value: "base", label: "Стандарт" },
        { value: "horizontal", label: "Горизонтальный" },
      ],
    },
  ],
  contentOptions: [
    { props: "title", type: "text", placeholder: "Заголовок" },
    { props: "content", type: "quill", placeholder: "Контент" },
    { props: "image", type: "file", placeholder: "Изображение" },
  ],
};

export const EditWidget = ({ widgetId }: Types.EditWidgetProps) => {
  const { register, control, handleSubmit, widgetOptions } = useEditWidget(
    widgetId,
    CardEditOptions
  );

  const { contents, handleCreateContent, handleUpdateContent } =
    useEditWidgetContent(widgetId);

  return (
    <section>
      <EditorMain
        register={register}
        widgetOptions={widgetOptions}
        handleSubmit={handleSubmit}
        control={control}
      />
      <EditorItems
        contents={contents}
        createButton={
          <ContentCreateModal
            handleCreateContent={handleCreateContent}
            options={CardEditOptions.contentOptions}
            widgetId={+widgetId}
          />
        }
        handleCreateContent={handleCreateContent}
        handleUpdateContent={handleUpdateContent}
      />
    </section>
  );
};

const ContentCreateModal = ({
  handleCreateContent,
  options,
  widgetId,
}: {
  handleCreateContent: UseMutateFunction<
    Content,
    Error,
    Types.IContentCreationParams,
    unknown
  >;
  options: Array<any>;
  widgetId: number;
}) => {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const { register, handleSubmit, control } = useForm<
    Pick<Types.IContentCreationParams, "data">
  >({
    mode: "onBlur",
    defaultValues: {},
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-full">
        <Button>Создать контент</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] ">
        <h1 className="block font-bold text-center mb-4">Создать контент</h1>
        <form
          onSubmit={handleSubmit((data) => {
            // console.log(data);
            handleCreateContent({ ...data, widgetId });
          })}
        >
          {options.map((option) =>
            viewInputByType(option.type, option, register, control)
          )}
          <Button className="w-full" type="submit">
            Создать
          </Button>
        </form>
        <DialogFooter>
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
