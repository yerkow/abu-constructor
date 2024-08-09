"use client";
import { HistoryContent } from "./HistoryContent";
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  Button,
} from "@/shared/ui";
import { History } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
interface HistoryButtonProps {
  ids: { ruId: number; kzId: number; ruPageId: number; kzPageId: number };
}
export const HistoryButton = ({ ids }: HistoryButtonProps) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("widget.history");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="default" onClick={() => setOpen(true)}>
        <History />
      </Button>
      <DialogContent className="min-w-[calc(100vw-200px)] h-[calc(100svh-200px)]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("desc")}</DialogDescription>
        </DialogHeader>
        {open && <HistoryContent ids={ids} />}
      </DialogContent>
    </Dialog>
  );
};
