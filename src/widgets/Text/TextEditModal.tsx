"use client";
import { createWidget, editWidget } from "@/shared/api/widgets";
import { queryClient } from "@/shared/lib/client";
import { Widget } from "@/shared/lib/types";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
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
  ruOptions?: { heading: string; content: string };
  kzOptions?: { heading: string; content: string };
  order: number;
  ruPageId: number | null;
  kzPageId: number | null;
  ruWidgetId?: number | null | undefined;
  kzWidgetId?: number | null | undefined;
}
export const TextEditModal = ({
  ruOptions,
  kzOptions,
  ruWidgetId,
  kzWidgetId,
  ruPageId,
  kzPageId,
  order,
}: TextEditModalProps) => {
  const [title, setTitle] = useState({
    ru: ruOptions ? ruOptions.heading : "",
    kz: kzOptions ? kzOptions.heading : "",
  });
  const [content, setContent] = useState({
    ru: ruOptions ? ruOptions.content : "",
    kz: kzOptions ? kzOptions.content : "",
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
      queryClient.invalidateQueries({ queryKey: ["getWidgets"] });
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
      queryClient.invalidateQueries({ queryKey: ["getWidgets"] });
    },
  });

  const handleSave = () => {
    if (ruOptions && kzOptions) {
      if (ruWidgetId && kzWidgetId) {
        editMutate({
          id: ruWidgetId,
          body: {
            options: JSON.stringify({ heading: title.ru, content: content.ru }),
          },
        });
        editMutate({
          id: kzWidgetId,
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
    <Card>
      <CardHeader>
        <CardTitle>Edit Text</CardTitle>
        <CardDescription>There you can edit Text content</CardDescription>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-3">
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
          <div className="flex flex-col  gap-3 w-full justify-between">
            <div>
              <Label>Content RU</Label>
              <ReactQuill
                value={content.ru}
                onChange={(value) => setContent({ ...content, ru: value })}
                modules={quillModules}
                theme="snow"
              />
            </div>
            <div>
              <Label>Content KZ</Label>
              <ReactQuill
                value={content.kz}
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
      </CardContent>
    </Card>
  );
};
