"use client";
import { Widget } from "@/shared/lib/types";
import { Button, Dialog, DialogContent, DialogTrigger } from "@/shared/ui";
import { Settings } from "lucide-react";
import { useSearchParams } from "next/navigation";
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
  const ruId = useSearchParams().get("ruId");
  const kzId = useSearchParams().get("kzId");
  const baseProps = {
    order,
    ruPageId: ruId,
    kzPageId: kzId,
    queryKey: "getWidgets",
  };
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
        {cloneElement(modal as React.ReactElement<any>, baseProps)}
      </DialogContent>
    </Dialog>
  );
};
