import React from "react";
import { viewInputByType } from "./ViewInputByType";
import { Button } from "@/shared/ui";
import { Types } from "../model";

export const EditorMain = ({
  register,
  widgetOptions,
  handleSubmit,
  control,
}: Types.EditorMainProps) => {
  return (
    <section className="flex flex-col">
      <h1 className="block font-bold text-center mb-4">Главные настройки</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {widgetOptions?.widgetOptions && widgetOptions.widgetOptions.map((option: any, idx) => (
          <React.Fragment key={idx}>
            {viewInputByType(option.type, option, register, control)}
          </React.Fragment>
        ))}
        <Button type="submit">Сохранить</Button>
      </form>
    </section>
  );
};
