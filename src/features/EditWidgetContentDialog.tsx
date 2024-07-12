"use client";
import { Widget } from "@/shared/lib/types";
import { Button, Dialog, DialogContent, DialogTrigger } from "@/shared/ui";
import { Settings } from "lucide-react";
import { cloneElement, ReactNode, useState } from "react";

export const EditWidgetContentDialog = ({
  modal,
  order,
  widget,
}: {
  modal: ReactNode;
  order: number;
  widget: Widget;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* save widget order on click */}
        <Button size={"icon"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-full ">
        {/* TODO */}
        {cloneElement(modal as React.ReactElement<any>, {
          order,
          onSave: () => {},
          ruOptions: JSON.parse(widget.ruOptions || ""),
          kzOptions: JSON.parse(widget.kzOptions || ""),
          ruWidgetId: widget.ruId,
          kzWidgetId: widget.kzId,
        })}
      </DialogContent>
    </Dialog>
  );
};
