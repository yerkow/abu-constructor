"use client";
import { backendImageUrl } from "@/shared/lib/constants";
import { Input } from "@/shared/ui";
import { useState, ReactNode } from "react";

export const useUploadFile = ({
  id,
  img,
  writeChanges,
}: {
  id: string;
  img: string;
  writeChanges: (id: string, field: string, value: File | string) => void;
}) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(() => {
    if (img) {
      return `${backendImageUrl}${img}`;
    } else {
      return "";
    }
  });
  const Preview: ReactNode = image ? (
    <img className="w-20 h-20" src={image as string} alt="image" />
  ) : (
    <></>
  );
  const FileInput: ReactNode = (
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
          writeChanges(id, "image", file);
        }
      }}
    />
  );
  return { Preview, FileInput };
};
