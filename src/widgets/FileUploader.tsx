"use client";
import { backendImageUrl } from "@/shared/lib/constants";
import { Input } from "@/shared/ui";
import { useState } from "react";

interface FileUploaderProps {
  id?: string;
  file: string;
  forImage: boolean;
  field: string;
  writeChanges: (val: {
    id?: string;
    field: string;
    value: File | string;
  }) => void;
}
export const FileUploader = ({
  id,
  file,
  writeChanges,
  field,
  forImage,
}: FileUploaderProps) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(() => {
    if (file) {
      return `${backendImageUrl}${file}`;
    } else {
      return "";
    }
  });
  return (
    <>
      {forImage && image && (
        <img className="w-20 h-20" src={image as string} alt="image" />
      )}
      <Input
        type="file"
        label="Image"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
              if (event.target) setImage(event.target.result);
            };
            reader.readAsDataURL(file);
            writeChanges({ id, field, value: file });
          }
        }}
      />
    </>
  );
};
