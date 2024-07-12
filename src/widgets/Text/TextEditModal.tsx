"use client";
import { createWidget } from "@/shared/api/widgets";
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
import { ChangeEvent, useState } from "react";
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
export const TextEditModal = ({
  order,
  onSave,
}: {
  order: number;
  onSave: () => void;
}) => {
  const [title, setTitle] = useState({ ru: "", kz: "" });
  const [content, setContent] = useState({ ru: "", kz: "" });
  const ruId = useSearchParams().get("ruId");
  const kzId = useSearchParams().get("kzId");

  const { mutate, error, isPending } = useMutation({
    mutationKey: ["createWidget"],
    mutationFn: createWidget,
    onSuccess: () => {
      setTitle({ ru: "", kz: "" });
      setContent({ ru: "", kz: "" });
      onSave();
    },
  });
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ruId && kzId) {
      mutate({
        widget_type: "Text",
        navigation_id: Number(ruId),
        order,
        language_key: "ru",
        options: JSON.stringify({ heading: title.ru, content: content.ru }),
      });
      mutate({
        widget_type: "Text",
        navigation_id: Number(kzId),
        order,
        language_key: "kz",
        options: JSON.stringify({ heading: title.kz, content: content.kz }),
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Text</CardTitle>
        <CardDescription>There you can edit Text content</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
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
            disabled={isPending || !content.ru || !content.kz}
            loading={isPending}
            type="submit"
          >
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
