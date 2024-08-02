"use client";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

interface WidgetViewProps {
  variant: "card" | "dialog";
  widgetName: string;
  content: ReactNode;
}
export const WidgetView = ({
  variant = "card",
  widgetName,
  content,
}: WidgetViewProps) => {
  const t = useTranslations("widget.edit");
  return variant == "card" ? (
    <Card className="w-full h-auto">
      <CardHeader>
        <CardTitle>
          {t("cardTitle")} {widgetName}
        </CardTitle>
        <CardDescription>
          {t("desc")} {widgetName}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex max-h-[calc(100svh-200px)] overflow-y-auto  flex-col gap-3">
        {content}
      </CardContent>
    </Card>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          {t("triggerTitle")} {widgetName}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-3xl">{content}</DialogContent>
    </Dialog>
  );
};
