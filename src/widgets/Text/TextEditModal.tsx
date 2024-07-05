"use client";
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
import { useState } from "react";
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
export const TextEditModal = () => {
  const [title, setTitle] = useState({ ru: "", kz: "" });
  const [content, setContent] = useState({ ru: "", kz: "" });
  const handleSubmit = () => {
    localStorage.setItem(
      "widget",
      JSON.stringify({
        id: Date.now(),
        widget_type: "text",
        options: JSON.stringify({ heading: title.ru, content: content.ru }),
        order: 1,
      })
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Text</CardTitle>
        <CardDescription>There you can edit Text content</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              label="Title RU"
              type="text"
              value={title.ru}
              onChange={(e) => setTitle({ ...title, ru: e.target.value })}
            />
            <Input
              label="Title KZ"
              type="text"
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
          <Button type="submit">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
};
