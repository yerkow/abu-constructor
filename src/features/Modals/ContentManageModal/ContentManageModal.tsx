import { backendUrl } from "@/shared/lib/constants";
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
import { EditOptionsProps } from "@/widgets/common/EditWidget/model/types";
import { viewInputByType } from "@/widgets/common/EditWidget/ui";
import { useMutation } from "@tanstack/react-query";
import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";


interface ContentManageModalProps {
  handleCreateContent: any;
  handleUpdateContent: any;
  widget_type: string;
  id?: number | undefined;
  TemplateSection?: any;
  contents?: any | undefined;
  action: "create" | "update";
  widget_variant?: string;
  widgetOptionsList: EditOptionsProps[];
}

export const ContentManageModal = ({
  handleCreateContent,
  handleUpdateContent,
  contents,
  widgetOptionsList,
  action,
  TemplateSection,
  id,
  widget_variant,
  widget_type,
}: ContentManageModalProps) => {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { register, handleSubmit, control, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      content: {},
      id,
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
    action === "create" ? handleCreateContent : handleUpdateContent;
  const onSubmit = async (data: any) => {
    await handleFunc(data);
    closeRef.current?.click();
    reset();
  };

  const { mutate: fetchRemoveContent } = useMutation({
    mutationKey: ["content", id],
    mutationFn: async (id: number | undefined) => {
      if (!id) return;
      const response = await fetch(`${backendUrl}/contents/${id}`, {
        method: "DELETE",
      });
      return response.json();
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className={action === "create" ? `w-full` : ""}>
        <Button>
          {action === "create" ? "Создать контент" : "Редактировать"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] max-h-[95%] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>
            {action === "create" ? "Создать" : "Редактировать"} контент
          </DialogTitle>
          <DialogDescription>
            Здесь вы можете управлять контентом
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          {Array.isArray(options)
            ? options?.map((option) => {
              return (
                <Fragment key={option.props}>
                  {viewInputByType(
                    option.type,
                    option,
                    register,
                    control,
                    setIsUploading
                  )}
                </Fragment>
              );
            })
            : options?.(widget_variant as string).map((option) => {
              return (
                <Fragment key={option.props}>
                  {viewInputByType(
                    option.type,
                    option,
                    register,
                    control,
                    setIsUploading
                  )}
                </Fragment>
              );
            })}

          <Button className="w-full" type="submit" disabled={isUploading}>
            {action === "create" ? "Создать" : "Изменить"}
          </Button>
        </form>
        {action === "update" && (
          <>
            <TemplateSection content_id={id} />
            <Button onClick={() => fetchRemoveContent(id)}>
              Удалить контент
            </Button>
          </>
        )
        }

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