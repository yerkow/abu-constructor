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
          <Input label="Title" type="text" />
          <Label>Content</Label>
          <ReactQuill modules={quillModules} theme="snow" />
          <Button>Save</Button>
        </form>
      </CardContent>
    </Card>
  );
};
