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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Text</CardTitle>
        <CardDescription>There you can edit Text content</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-3">
            <Input label="Title RU" type="text" />
            <Input label="Title KZ" type="text" />
          </div>
          <div className="flex flex-col  gap-3 w-full justify-between">
            <div>
              <Label>Content RU</Label>
              <ReactQuill modules={quillModules} theme="snow" />
            </div>
            <div>
              <Label>Content KZ</Label>
              <ReactQuill modules={quillModules} theme="snow" />
            </div>
          </div>
          <Button>Save</Button>
        </form>
      </CardContent>
    </Card>
  );
};
