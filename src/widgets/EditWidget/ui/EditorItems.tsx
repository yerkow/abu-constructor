import { Content } from "@/shared/types";
import { UseMutateFunction } from "@tanstack/react-query";
import React from "react";
import { Types } from "../model";

interface EditorItemProps {
  contents: Content[] | undefined;
  createButton: any;
  handleCreateContent: UseMutateFunction<
    Content,
    Error,
    Types.IContentCreationParams,
    unknown
  >;
  handleUpdateContent: UseMutateFunction<
    Content,
    Error,
    Types.IContentUpdateParams,
    unknown
  >;
}

export const EditorItems = ({
  contents,
  createButton,
  handleCreateContent,
  handleUpdateContent,
}: EditorItemProps) => {
  return (
    <section className="mt-7">
      <h1 className="block font-bold text-center mb-4">Настройки контент</h1>
      {createButton}
    </section>
  );
};
