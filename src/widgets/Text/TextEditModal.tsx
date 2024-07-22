"use client";
import {
  createWidget,
  editWidget,
  getTemplateWidgets,
  getWidgetProps,
} from "@/shared/api/widgets";
import { queryClient } from "@/shared/lib/client";
import { Widget, WidgetProps } from "@/shared/lib/types";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  useToast,
  WidgetView,
} from "@/shared/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const quillModules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};
interface TextEditModalProps {
  modalVariant?: "card" | "dialog";
  order: number;
  queryKey: string;
  ruPageId: number | null;
  kzPageId: number | null;
}
export const TextEditModal = ({
  variant = "card",
  order,
  ruPageId,
  kzPageId,
  queryKey,
}: {
  variant?: "dialog" | "card";
  order: number;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
}) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle="Edit Text"
      desc="There you can edit Text content"
      triggerTitle="Редактировать текст"
      content={
        <ModalContent
          modalVariant={variant}
          ruPageId={ruPageId}
          kzPageId={kzPageId}
          order={order}
          queryKey={queryKey}
        />
      }
    />
  );
};
const ModalContent = ({
  queryKey,
  ruPageId,
  kzPageId,
  order,
}: TextEditModalProps) => {
  const { toast } = useToast();
  const [props, setProps] = useState<WidgetProps | null>(null);
  useEffect(() => {
    if (ruPageId && kzPageId)
      getWidgetProps({ ruPageId, kzPageId, order }).then((data) => {
        setProps(data);
      });
  }, [ruPageId, kzPageId, order]);
  useEffect(() => {
    if (props) {
      setTitle({ ru: props.ruOptions.heading, kz: props.kzOptions.heading });
      setContent({ ru: props.ruOptions.content, kz: props.kzOptions.content });
    }
  }, [props]);
  const [title, setTitle] = useState({
    ru: "",
    kz: "",
  });
  const [content, setContent] = useState({
    ru: "",
    kz: "",
  });
  const {
    mutate: createMutate,
    error: createError,
    isPending: createIsPending,
  } = useMutation({
    mutationKey: ["createWidget"],
    mutationFn: createWidget,
    onSuccess: () => {
      setTitle({ ru: "", kz: "" });
      setContent({ ru: "", kz: "" });
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast({
        title: "Виджет создан.",
      });
    },
  });
  const {
    mutate: editMutate,
    error: editError,
    isPending: editIsPending,
  } = useMutation({
    mutationKey: ["createWidget"],
    mutationFn: editWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast({
        title: "Виджет изменен.",
      });
    },
  });

  const handleSave = () => {
    if (props) {
      if (ruPageId && kzPageId) {
        editMutate({
          id: props.ruWidgetId,
          navigation_id: ruPageId,
          body: {
            options: JSON.stringify({ heading: title.ru, content: content.ru }),
          },
        });
        editMutate({
          id: props.kzWidgetId,
          navigation_id: kzPageId,
          body: {
            options: JSON.stringify({ heading: title.kz, content: content.kz }),
          },
        });
      }
    } else {
      if (ruPageId && kzPageId) {
        createMutate({
          widget_type: "Text",
          navigation_id: Number(ruPageId),
          order,
          language_key: "ru",
          options: JSON.stringify({ heading: title.ru, content: content.ru }),
        });
        createMutate({
          widget_type: "Text",
          navigation_id: Number(kzPageId),
          order,
          language_key: "kz",
          options: JSON.stringify({ heading: title.kz, content: content.kz }),
        });
      }
    }
  };

  return (
    <section className="flex flex-col gap-3 h-full">
      <div className="flex flex-col   gap-3">
        <Input
          label="Title RU"
          type="text"
          value={title.ru}
          required
          onChange={(e) => setTitle({ ...title, ru: e.target.value })}
        />
        <Input
          label="Title KZ"
          type="text"
          required
          value={title.kz}
          onChange={(e) => setTitle({ ...title, kz: e.target.value })}
        />
      </div>
      <div className="flex flex-col flex-grow   gap-3 w-full justify-between">
        <div>
          <Label>Content RU</Label>
          <ReactQuill
            value={content.ru}
            className="h-[250px] overflow-scroll"
            onChange={(value) => setContent({ ...content, ru: value })}
            modules={quillModules}
            theme="snow"
          />
        </div>
        <div>
          <Label>Content KZ</Label>
          <ReactQuill
            value={content.kz}
            className="h-[250px] overflow-scroll"
            onChange={(value) => setContent({ ...content, kz: value })}
            modules={quillModules}
            theme="snow"
          />
        </div>
      </div>
      <Button
        disabled={createIsPending || !content.ru || !content.kz}
        loading={createIsPending}
        onClick={handleSave}
        type="button"
      >
        Save
      </Button>
    </section>
  );
};
