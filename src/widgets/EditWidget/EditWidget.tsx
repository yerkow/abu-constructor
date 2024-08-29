"use client";
import React from "react";
import { Types, useEditWidget, useEditWidgetContent } from "./model";
import { EditorMain, EditorItems } from "./ui";
import { Content } from "@/shared/types";
import { WidgetOptionList } from "..";
import { ContentManageModal } from "@/features/Modals/ContentManageModal/ContentManageModal";
import { TemplateSection } from "../TemplateSection/TemplateSection";

export const EditWidget = ({ widgetId }: Types.EditWidgetProps) => {
  const { register, control, handleSubmit, widgetOptions, widget_type } =
    useEditWidget(widgetId, WidgetOptionList);

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
        CreateButton={<ContentManageModal
          handleCreateContent={handleCreateContent}
          handleUpdateContent={handleUpdateContent}
          variant="create"
          widgetOptionsList={WidgetOptionList}
          widget_type={widget_type} />
        }
        EditButton={(contents: Content, id: number) => {
          return (
            <ContentManageModal
              handleCreateContent={handleCreateContent}
              handleUpdateContent={handleUpdateContent}
              variant="update"
              TemplateSection={TemplateSection}
              contents={contents}
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

