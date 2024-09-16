"use client";
import React from "react";
import { Types, useEditWidget, useEditWidgetContent } from "./model";
import { EditorMain, EditorItems } from "./ui";
import { IContent } from "@/shared/types";
import { WidgetOptionList } from "../..";
import { ContentManageModal } from "@/features/Modals/ContentManageModal/ContentManageModal";
import { TemplateSection } from "../TemplateSection/TemplateSection";

export const EditWidget = ({ widgetId }: Types.EditWidgetProps) => {
  const {
    register,
    control,
    handleSubmit,
    widgetOptions,
    widget_type,
    widget_variant,
  } = useEditWidget(widgetId, WidgetOptionList);

  const { contents, handleCreateContent, handleUpdateContent } =
    useEditWidgetContent(widgetId);

  return (
    <section>
      <EditorMain
        register={register}
        widgetOptions={widgetOptions}
        handleSubmit={handleSubmit}
        control={control}
      />
      <EditorItems
        contents={contents}
        CreateButton={
          <ContentManageModal
            handleCreateContent={handleCreateContent}
            handleUpdateContent={handleUpdateContent}
            action="create"
            widget_variant={widget_variant}
            widgetOptionsList={WidgetOptionList}
            widget_type={widget_type}
          />
        }
        EditButton={(contents: IContent, id: number) => {
          return (
            <ContentManageModal
              handleCreateContent={handleCreateContent}
              handleUpdateContent={handleUpdateContent}
              action="update"
              TemplateSection={TemplateSection}
              contents={contents}
              widget_variant={widget_variant}
              id={id}
              widgetOptionsList={WidgetOptionList}
              widget_type={widget_type}
            />
          );
        }}
      />
    </section>
  );
};
