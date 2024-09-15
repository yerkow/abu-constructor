import { Button } from "@/shared/ui";
import React from "react";
import { widgetsList } from "../../";

interface IWidgetListSectionProps {
  id: string;
  handleWidgetCreate: any;
  trans: any;
}

export const WidgetListSection = ({
  handleWidgetCreate,
  trans,
  id,
}: IWidgetListSectionProps) => {
  return (
    <section className="flex flex-col ">
      <h3>{trans("leftTitle")}</h3>
      {widgetsList.map(({ displayName }, idx) => (
        <Button
          key={displayName + idx}
          onClick={() =>
            handleWidgetCreate({
              navigation_id: +id,
              widget_type: displayName,
              options: { created: true },
            })
          }
          size={"sm"}
          className="mb-3 text-black cursor-pointer px-10 py-3 rounded-sm text-center bg-slate-200"
        >
          {displayName}
        </Button>
      ))}
    </section>
  );
};
