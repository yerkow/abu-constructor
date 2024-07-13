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
import { CardProps } from "@/widgets/Cards/Card";
import { useSaveToLocalStorage } from "@/shared/lib/hooks";
import { useSearchParams } from "next/navigation";
import { BackedPage, Langs } from "@/shared/lib/types";
import { createPage, deletePage } from "@/shared/api/pages";

interface CardsEditModalProps {
  variant?: "dialog" | "card";
  order: number;
}

export const CardsEditModal = ({
  variant = "card",
  order,
}: CardsEditModalProps) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle="Edit Cards"
      desc="There you can edit Cards content"
      triggerTitle="Редактировать карточки"
      content={<ModalContent order={order} />}
    />
  );
};
const cardBase = {
  title: { ru: "", kz: "" },
  content: { ru: "", kz: "" },
  image: "",
};
type CardsState = Record<
  string,
  {
    title: Langs;
    content: Langs;
    image: string;
    page: {
      ru: BackedPage;
      kz: BackedPage;
    };
  }
>;
const ModalContent = ({ order }: { order: number }) => {
  const [count, setCount] = useState(0);
  const [hasTemplate, setHasTemplate] = useState(false);
  const slug = useSearchParams().get("edittingSlug");
  const { saveToLocalStorage } = useSaveToLocalStorage();
  const [template, setTemplate] = useState<{
    name: string;
    widgets: string[];
  } | null>(null);
  const [variant, setVariant] = useState("base");
  const [title, setTitle] = useState({ ru: "", kz: "" });
  const [cards, setCards] = useState<CardsState>({});
  const addCard = async () => {
    try {
      const ruPage = await createPage({
        title: "templatePage",
        slug: `${template ? template.name : "template"}/${Date.now()}`,
        navigation_id: null,
        navigation_type: "template",
        order: 1,
        language_key: "ru",
      });
      const kzPage = await createPage({
        title: "templatePage",
        slug: `${template ? template.name : "template"}/${Date.now()}`,
        navigation_id: null,
        navigation_type: "template",
        order: 1,
        language_key: "kz",
      });
      setCards({
        ...cards,
        [`${ruPage.id}*${kzPage.id}`]: {
          title: { ru: "", kz: "" },
          image: "",
          content: { ru: "", kz: "" },
          page: { ru: ruPage, kz: kzPage },
        },
      });
    } catch (e) {}
  };
  console.log(Object.keys(cards));

  const saveCard = () => {};
  const deleteCard = (id: string) => {
    setCards((prev) => {
      let temp = prev;
      delete temp[id];
      return { ...temp };
    });
    const ids = id.split("*");
    ids.forEach((id) => {
      try {
        deletePage(+id);
      } catch (e) {}
    });
  };
  const handleSave = () => {};
  return (
    <>
      <Button onClick={handleSave}>Save</Button>
      <div className="flex gap-2 items-center">
        <Label>Select card variant</Label>
        <Select onValueChange={(value) => setVariant(value)}>
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
        <Input
          label="Title RU"
          type="text"
          value={title.ru}
          onChange={(e) => setTitle({ ...title, ru: e.target.value })}
        />
        <Input
          label="Title KZ"
          type="text"
          value={title.kz}
          onChange={(e) => setTitle({ ...title, kz: e.target.value })}
        />
      </div>
      <Button onClick={addCard} className="w-full">
        Add new Card
      </Button>
      <ScrollArea className="h-[320px] rounded-md border p-4 ">
        {Object.keys(cards).map((key, idx) => (
          <EditCardItem
            deleteCard={() => deleteCard(key)}
            saveCard={saveCard}
            key={idx}
            id={key}
            templateWidgets={template?.widgets}
          />
        ))}
      </ScrollArea>
    </>
  );
};
const EditCardItem = ({
  id,
  saveCard,
  deleteCard,
  templateWidgets,
}: {
  id: string;
  templateWidgets?: string[];
  saveCard: () => void;
  deleteCard: () => void;
}) => {
  const getTemplatesProps = (w: string, order: number) => {
    switch (w) {
      case "Cards":
        return <CardsEditModal order={order} variant="dialog" />;
      case "Carousel":
        return <CarouselEditModal variant="dialog" />;
      case "List":
        return <ListEditModal variant="dialog" />;
      case "Text":
        return <TextEditModal order={order} />;
      default:
        return null;
    }
  };
  const [title, setTitle] = useState({ ru: "", kz: "" });
  const [content, setContent] = useState({ ru: "", kz: "" });
  const [href, setHref] = useState("");
  return (
    <EditItem
      buttons={
        <>
          <Button onClick={() => saveCard()}>Save</Button>
          <Button onClick={deleteCard}>Delete</Button>
        </>
      }
      title={"Card" + id}
    >
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Card title  RU"
          type="text"
          value={title.ru}
          onChange={(e) => setTitle({ ...title, ru: e.target.value })}
        />
        <Input
          label="Card title KZ"
          type="text"
          value={title.kz}
          onChange={(e) => setTitle({ ...title, kz: e.target.value })}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Content RU"
          type="text"
          value={content.ru}
          onChange={(e) => setContent({ ...content, ru: e.target.value })}
        />
        <Input
          label="Content KZ"
          type="text"
          value={content.kz}
          onChange={(e) => setContent({ ...content, kz: e.target.value })}
        />
      </div>
      <Input type="file" label="Image" />
      {templateWidgets && (
        <div className="flex flex-col gap-3 ">
          <span>Настройки шаблона</span>
          {templateWidgets.map((w, idx) => (
            <Fragment key={idx}>{getTemplatesProps(w, idx)}</Fragment>
          ))}
        </div>
      )}
    </EditItem>
  );
};
