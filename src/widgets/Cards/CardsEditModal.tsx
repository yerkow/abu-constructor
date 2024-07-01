"use client";
import { TemplatesSelect } from "@/features";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
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
import { Fragment, useState } from "react";
import { CarouselEditModal } from "../Carousel/CarouselEditModal";
import { ListEditModal } from "../List/ListEditModal";
import { TextEditModal } from "../Text/TextEditModal";
const mock = {
  title: "Test title",
  variant: "base",
  items: [],
};
interface CardsEditModalProps {
  variant?: "dialog" | "card";
}

export const CardsEditModal = ({ variant = "card" }: CardsEditModalProps) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle="Edit Cards"
      desc="There you can edit Cards content"
      triggerTitle="Редактировать карточки"
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
  console.log(template);

  return (
    <>
      <div className="flex gap-2 items-center">
        <Label>Select card variant</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="base">Base</SelectItem>
            <SelectItem value="horizontal">Horizontal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="template"
          checked={hasTemplate}
          onCheckedChange={() => setHasTemplate(!hasTemplate)}
        />
        <Label htmlFor="template" className="mt-1">
          Есть темплейт
        </Label>
      </div>
      {hasTemplate && <TemplatesSelect onSelect={setTemplate} />}
      <div className="flex flex-col md:flex-row gap-3">
        <Input label="Title RU" type="text" />
        <Input label="Title KZ" type="text" />
      </div>
      <Button onClick={() => setCount(count + 1)} className="w-full">
        Add new Card
      </Button>
      <ScrollArea className="h-[320px] rounded-md border p-4 ">
        {new Array(count).fill("0").map((_, idx) => (
          <EditCardItem
            key={idx}
            idx={idx}
            templateWidgets={template?.widgets}
          />
        ))}
      </ScrollArea>
    </>
  );
};
const EditCardItem = ({
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
      buttons={
        <>
          <Button size={"sm"}>Save</Button>
          <Button size={"sm"}>Delete</Button>
        </>
      }
      title={"Card" + idx + 1}
    >
      <div className="flex flex-col md:flex-row gap-3">
        <Input label="Card title  RU" type="text" />
        <Input label="Card title KZ" type="text" />
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <Input label="Content RU" type="text" />
        <Input label="Content KZ" type="text" />
      </div>
      <Input type="file" label="Image" />
      {templateWidgets && (
        <div className="flex flex-col gap-3 ">
          <span>Настройки шаблона</span>
          {templateWidgets.map((w, idx) => (
            <Fragment key={idx}>{getTemplatesProps(w)}</Fragment>
          ))}
        </div>
      )}
    </EditItem>
  );
};
