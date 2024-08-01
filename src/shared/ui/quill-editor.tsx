"use client";
import ReactQuill from "react-quill";
import { Label } from "./label";
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

interface QuillEditor {
  value?: ReactQuill.Value;
  onChange: (value: string) => void;
  label?: string;
}
const QuillEditor = ({ value, onChange, label }: QuillEditor) => {
  return (
    <div>
      <Label>{label}</Label>
      <ReactQuill
        value={value}
        className="overflow-y-auto max-h-[200px]"
        onChange={onChange}
        modules={quillModules}
        theme="snow"
      />
    </div>
  );
};
export default QuillEditor;
