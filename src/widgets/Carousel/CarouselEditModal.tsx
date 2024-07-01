"use client";
import page from "@/app/page";
import { TemplatesSelect } from "@/features";
import { cn } from "@/shared/lib/utils";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EditItem,
  Input,
  Label,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  WidgetView,
} from "@/shared/ui";
import { CardsEditModal } from "@/widgets/Cards/CardsEditModal";
import { ListEditModal } from "@/widgets/List/ListEditModal";
import { TextEditModal } from "@/widgets/Text/TextEditModal";
import { Modal } from "@/widgets/Text/TextEditModal.stories";
import { Settings } from "lucide-react";
import { Fragment, useState } from "react";
interface CarouselEditModalProps {
  variant?: "dialog" | "card";
}
export const CarouselEditModal = ({
  variant = "card",
}: CarouselEditModalProps) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle="Edit Carousel"
      desc="There you can edit Carousel content"
      triggerTitle="Редактировать карусель"
      content={<ModalContent />}
    />
  );
};
const ModalContent = () => {
  const [count, setCount] = useState(0);
  const [hasTemplate, setHasTemplate] = useState(false);
  const [template, setTemplate] = useState<{
    name: string;
    widgets: string[];
  } | null>(null);
  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <Checkbox
          id="template"
          checked={hasTemplate}
          onCheckedChange={() =>
            setHasTemplate((prev) => {
              if (prev) {
                setTemplate(null);
              }
              return !prev;
            })
          }
        />
        <Label htmlFor="template" className="mt-1">
          Есть темплейт
        </Label>
      </div>
      {hasTemplate && <TemplatesSelect onSelect={setTemplate} />}
      <Button onClick={() => setCount(count + 1)} className="w-full">
        Add new Carousel Item
      </Button>
      <ScrollArea className="h-[500px]  rounded-md border p-4">
        {new Array(count).fill("0").map((_, idx) => (
          <EditCarouselItem
            key={idx}
            idx={idx}
            templateWidgets={template?.widgets}
          />
        ))}
      </ScrollArea>
    </>
  );
};
const EditCarouselItem = ({
  idx,
  templateWidgets,
}: {
  idx: number;
  templateWidgets?: string[];
}) => {
  const getTemplatesProps = (w: string) => {
    switch (w) {
      case "Cards":
        return <CardsEditModal variant="dialog" />;
      case "Carousel":
        return <CarouselEditModal variant="dialog" />;
      case "List":
        return <ListEditModal variant="dialog" />;
      case "Text":
        return <TextEditModal />;
      default:
        return null;
    }
  };

  return (
    <EditItem
      title={"Carousel Item" + (idx + 1)}
      buttons={
        <>
          <Button size={"sm"}>Save</Button>
          <Button size={"sm"}>Delete</Button>
        </>
      }
    >
      <Input label="Image" type="file" />

      <div className="flex gap-3 flex-col md:flex-row">
        <Input label="Content RU" />
        <Input label="Content KZ" />
      </div>

      {templateWidgets && (
        <div className="flex flex-col gap-3">
          <span>Настройки шаблона</span>
          {templateWidgets.map((w, idx) => (
            <Fragment key={idx}>{getTemplatesProps(w)}</Fragment>
          ))}
        </div>
      )}
    </EditItem>
  );
};
