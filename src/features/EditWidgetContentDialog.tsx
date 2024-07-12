"use client";
import { Button, Dialog, DialogContent, DialogTrigger } from "@/shared/ui";
import { Settings } from "lucide-react";
import { cloneElement, ReactNode, useState } from "react";

export const EditWidgetContentDialog = ({
  modal,
  order,
}: {
  modal: ReactNode;
  order: number;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* save widget order on click */}
        <Button size={"icon"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-full ">
        {cloneElement(modal as React.ReactElement<any>, {
          order,
          onSave: () => {
            setOpen(false);
          },
        })}
      </DialogContent>
    </Dialog>
  );
};
