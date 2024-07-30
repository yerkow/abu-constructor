"use client";
import { backendImageUrl } from "@/shared/lib/constants";
import { Input } from "@/shared/ui";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FileUploaderProps {
  id?: string;
  file: string;
  field: string;
  label: string;
  writeChanges: (val: {
    id?: string;
    field: string;
    value: File | string;
  }) => void;
}
export const FileUploader = ({
  id,
  file,
  label,
  writeChanges,
  field,
}: FileUploaderProps) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  useEffect(() => {
    if (file) {
      setImage(`${backendImageUrl}${file}`);
    }
  }, [file]);
  return (
    <div className="flex flex-col gap-4">
      {field == "image" && image && (
        <Image width={80} height={80} src={image as string} alt="image" />
      )}
      {field == "file" && typeof file === "string" && file.length > 0 && (
        <a
          href={`${backendImageUrl}${file as string}`}
          target="_blank"
          className="text-lg"
        >
          Посмотреть прикрепленный файл
        </a>
      )}

      <Input
        type="file"
        label={label}
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
    </div>
  );
};
