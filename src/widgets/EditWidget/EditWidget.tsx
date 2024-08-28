"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Types, useEditWidget, useEditWidgetContent } from "./model";
import { EditorMain, EditorItems } from "./ui";
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
import { Content } from "@/shared/types";
import { EditOptionsProps } from "./model/types";
import { useForm } from "react-hook-form";
import { viewInputByType } from "./ui";
import { WidgetOptionList } from "..";
import { useMutation } from "@tanstack/react-query";
import { fetchCreateNavigationItem } from "@/features/Modals/NavigationCreateModal/api";
import { locales } from "@/i18n";
import { useParams } from "next/navigation";
import { fetchWidgetRemoveById } from "../NavigationPageContent/api";
import { queryClient } from "@/shared/lib/client";
import { backendUrl } from "@/shared/lib/constants";

export const EditWidget = ({ widgetId }: Types.EditWidgetProps) => {
  const { register, control, handleSubmit, widgetOptions, widget_type } =
    useEditWidget(widgetId, WidgetOptionList);

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
        CreateButton={<ContentManageModal
          handleCreateContent={handleCreateContent}
          handleUpdateContent={handleUpdateContent}
          variant="create"
          widgetOptionsList={WidgetOptionList}
          widget_type={widget_type} />
        }
        EditButton={(contents: Content, id: number) => {
          return (
            <ContentManageModal
              handleCreateContent={handleCreateContent}
              handleUpdateContent={handleUpdateContent}
              variant="update"
              contents={contents}
              id={id}
              widgetOptionsList={WidgetOptionList}
              widget_type={widget_type}
            />
          );
        }}
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
  id,
  widget_type,
}: {
  handleCreateContent: any;
  handleUpdateContent: any;
  widget_type: string;
  id?: number | undefined;
  contents?: any | undefined;
  variant: "create" | "update";
  widgetOptionsList: EditOptionsProps[];
}) => {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { register, handleSubmit, control, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      content: {},
      id: id,
    },
  });

  useEffect(() => {
    if (contents) {
      reset((prevValues) => ({
        ...prevValues,
        content: contents,
      }));
    }
  }, [contents]);

  const options = widgetOptionsList.find(
    (item) => item.widgetName === widget_type
  )?.contentOptions;
  const handleFunc =
    variant === "create" ? handleCreateContent : handleUpdateContent;

  const onSubmit = async (data: any) => {
    await handleFunc(data);
    closeRef.current?.click();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className={variant === "create" ? `w-full` : ""}>
        <Button>
          {variant === "create" ? "Создать контент" : "Редактировать"}{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] max-h-[95%] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>
            {variant === "create" ? "Создать" : "Редактировать"} контент
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {options &&
            options.map((option) => (
              <Fragment key={option.props}>
                {viewInputByType(option.type, option, register, control)}
              </Fragment>
            ))}
          {
            variant === "update" && (
              <TemplateSection content_id={id as number} />
            )
          }

          <Button className="w-full" type="submit">
            {variant === "create" ? "Создать" : "Изменить"}
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


// TODO
// 1. При true в чекед создать новую навигацию(detail) && false удалить навигацию(detail) по его id
// 2. В поле options текущего контента добавить флаг templtate: true
// 3. в поле content текущего контента добавить поле link: slug (от созданной навигации(detail))
// 4. Возможность выбора шаблона для получения списка подготовленных виджетов
// 5. При наполении виджета данными из шаблона, отправлять эти виджеты в список виджетов текущей навигации(detail)

const TemplateSection = ({ content_id }: { content_id: number }) => {

  console.log(content_id)

  const [isTemplate, setIsTemplate] = useState(false)
  // const [createdNavigationId, setCreatedNavigationId] = useState<number | null>(null)
  const navigation_id = useParams().id as string



  const { mutate: fetchUpdateContent } = useMutation({
    mutationKey: ['contents', content_id],
    mutationFn: async (data: any) => {
      await fetch(`${backendUrl}/contents/${content_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }
  })

  const { mutate: fetchCreateNavigation } = useMutation({
    mutationKey: ['navigations'],
    mutationFn: fetchCreateNavigationItem,
    onSuccess: (data) => {
      fetchUpdateContent({
        content: {
          link: data.slug,
        },
        options: {
          template: isTemplate
        }
      })
    }
  })
  const handleCreateNavigation = async () => {
    const sendData = {
      title: {
        ru: ' ',
        kz: ' ',
        en: ' ',
      },
      navigation_type: 'detail',
      parent_id: +navigation_id,
      slug: String(new Date().getTime()),
    }

    fetchCreateNavigation(sendData)
  }

  const { mutate: handleDeleteById, error, isPending } = useMutation({
    mutationKey: [`navigations`],
    mutationFn: async ({ id }: { id: number }) => {
      await fetch(`http://localhost:3003/api/navigations/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["navigations"]
      });
    },
  });

  useEffect(() => {
    if (isTemplate) {
      handleCreateNavigation()
    }
    // else {
    //   handleDeleteById({ id: 50 })
    // }
  }, [isTemplate])


  return (
    <section>
      <label >Есть шаблон?</label>
      <input
        type="checkbox"
        checked={isTemplate}
        onChange={(e) => setIsTemplate(e.target.checked)}
      />
    </section>
  )
}