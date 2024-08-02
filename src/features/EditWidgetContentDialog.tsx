"use client";
import { Widget } from "@/shared/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";
import { Settings, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { cloneElement, ReactNode, useState } from "react";

export const EditWidgetContentDialog = ({
  modal,
  name,
}: {
  modal: ReactNode;
  name: string;
}) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("pages.pageEditorContent");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* save widget order on click */}
        <Button size={"icon"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent
        alertBtn={true}
        onInteractOutside={(e) => e.preventDefault()}
        className="max-w-sm sm:max-w-full "
      >
        <DialogHeader>
          <DialogTitle className="hidden">
            {t("edit.title")} {name}
          </DialogTitle>
          <DialogDescription className="hidden">
            {t("edit.desc")} {name}
          </DialogDescription>
        </DialogHeader>
        <CloseButton close={() => setOpen(false)} />
        {modal}
      </DialogContent>
    </Dialog>
  );
};

const CloseButton = ({ close }: { close: () => void }) => {
  const t = useTranslations("pages.pageEditorContent");
  return (
    <AlertDialog>
      <AlertDialogTrigger className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="w-4 h-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("close.title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("close.desc")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("close.decline")}</AlertDialogCancel>
          <AlertDialogAction onClick={close}>
            {t("close.close")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
