"use client";
import React, { Fragment, useRef, useState } from "react";
import { Types, useEditWidget, useEditWidgetContent } from "./model";
import { EditorMain, EditorItems } from "./ui";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/shared/ui";
import { Content } from "@/shared/types";
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
const AccordionEditOptions: EditOptionsProps = {
  widgetName: "Accordion",
  widgetOptions: [
    { props: "title", type: "text", placeholder: "Заголовок" },
  ],
  contentOptions: [
    { props: "title", type: "text", placeholder: "Заголовок" },
    { props: "content", type: "quill", placeholder: "Контент" },
  ],
};


const WidgetOptionList = [AccordionEditOptions, CardEditOptions];

export const EditWidget = ({ widgetId }: Types.EditWidgetProps) => {
  const { register, control, handleSubmit, widgetOptions, widget_type } = useEditWidget(
    widgetId,
    WidgetOptionList
  );


  const { contents, handleCreateContent, handleUpdateContent } =
    useEditWidgetContent(widgetId);

  // console.log(contents)

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
          <ContentManageModal
            handleCreateContent={handleCreateContent}
            handleUpdateContent={handleUpdateContent}
            variant="create"
            widgetOptionsList={WidgetOptionList}
            widget_type={widget_type}
          />
        }
        EditButton={(contents: Content) => {
          console.log(contents)
          return <ContentManageModal
            handleCreateContent={handleCreateContent}
            handleUpdateContent={handleUpdateContent}
            variant="update"
            contents={contents}
            widgetOptionsList={WidgetOptionList}
            widget_type={widget_type}
          />
        }

        }
      />
    </section>
  );
};




const ContentManageModal = ({
  handleCreateContent,
  handleUpdateContent,
  contents,
  widgetOptionsList,
  variant,
  widget_type
}: {
  handleCreateContent: any,
  handleUpdateContent: any,
  widget_type: string,
  contents?: Content | undefined,
  variant: "create" | "update";
  widgetOptionsList: EditOptionsProps[];
}) => {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { register, handleSubmit, control } = useForm({
    mode: "onBlur",
    defaultValues: {
      ...contents,
    },
  });

  const options = widgetOptionsList.find((item) => item.widgetName === widget_type)?.contentOptions;
  const handleFunc = variant === "create" ? handleCreateContent : handleUpdateContent;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className={variant === "create" ? `w-full` : ""}>
        <Button>Создать контент</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] ">
        <h1 className="block font-bold text-center mb-4">Создать контент</h1>
        <form
          onSubmit={handleSubmit(handleFunc)}
        >
          {options && options.map((option) =>
            <Fragment
              key={option.props}
            >
              {viewInputByType(option.type, option, register, control)}
            </Fragment>
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
