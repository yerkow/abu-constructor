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
import { useState } from "react";
interface HistoryButtonProps {
  ids: { ruId: number; kzId: number; ruPageId: number; kzPageId: number };
}
export const HistoryButton = ({ ids }: HistoryButtonProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="default" onClick={() => setOpen(true)}>
        <History />
      </Button>
      <DialogContent className="min-w-[calc(100vw-200px)] h-[calc(100svh-200px)]">
        <DialogHeader>
          <DialogTitle>История</DialogTitle>
          <DialogDescription>
            Здесь отображаются все изменения
          </DialogDescription>
        </DialogHeader>
        {open && <HistoryContent ids={ids} />}
      </DialogContent>
    </Dialog>
  );
};
