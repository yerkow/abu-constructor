"use client";
import { Widget } from "@/shared/lib/types";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shared/ui";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Settings } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { cloneElement, ReactNode, useState } from "react";

export const EditWidgetContentDialog = ({
  modal,
  name,
}: {
  modal: ReactNode;
  name: string;
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
        <DialogHeader>
          <DialogTitle className="hidden">Виджет {name}</DialogTitle>
          <DialogDescription className="hidden">
            Редактирование виджета {name}
          </DialogDescription>
        </DialogHeader>
        {modal}
      </DialogContent>
    </Dialog>
  );
};
