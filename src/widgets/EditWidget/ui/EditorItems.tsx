import { Content } from "@/shared/types";
import { UseMutateFunction } from "@tanstack/react-query";
import React from "react";
import { Button } from "@/shared/ui";

interface EditorItemProps {
  contents: Content[] | undefined;
  createButton: any;
  EditButton: any;
}

export const EditorItems = ({
  contents,
  createButton,
  EditButton,

}: EditorItemProps) => {


  return (
    <section className="mt-7">
      <h1 className="block font-bold text-center mb-4">Настройки контент</h1>
      {createButton}
      <ul className="mt-4">
        {
          contents?.map((content, idx) => (
            <li key={content.id} className="flex justify-between items-center gap-2 rounded-sm px-5 py-3 bg-slate-100 cursor-grab">
              <p>Элемент - #{idx + 1}</p>
              {EditButton(content.content, content.id)}
            </li>
          ))
        }
      </ul>
    </section>
  );
};
