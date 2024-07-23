import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { ReactNode } from "react";

interface WidgetViewProps {
  variant: "card" | "dialog";
  cardTitle?: string;
  desc?: string;
  triggerTitle?: string;
  content: ReactNode;
}
export const WidgetView = ({
  variant = "card",
  cardTitle,
  desc,
  triggerTitle,
  content,
}: WidgetViewProps) => {
  return variant == "card" ? (
    <Card className="w-full  h-[calc(100vh-100px)]">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="flex  flex-col gap-3">{content}</CardContent>
    </Card>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>{triggerTitle}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-3xl">{content}</DialogContent>
    </Dialog>
  );
};
