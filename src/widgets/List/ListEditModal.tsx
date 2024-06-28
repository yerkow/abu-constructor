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
  ScrollArea,
} from "@/shared/ui";
import { Label } from "@radix-ui/react-label";
import { DeleteIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { CardsEditModal } from "../Cards/CardsEditModal";
import { CarouselEditModal } from "../Carousel/CarouselEditModal";
import { TextEditModal } from "../Text/TextEditModal";
const mock = [
  { id: 1, content: "Content1", href: "/test/1" },
  { id: 2, content: "Content2", href: "/test/1" },
  { id: 3, content: "Content3", href: "/test/1" },
  { id: 4, content: "Content4", href: "/test/1" },
];
export const ListEditModal = () => {
  const [isFiles, setIsFiles] = useState(false);
  const [listCount, setListCount] = useState(mock);
  const [hasTemplate, setHasTemplate] = useState(false);
  const [template, setTemplate] = useState<{
    name: string;
    widgets: string[];
  } | null>(null);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit List</CardTitle>
        <CardDescription>There you can edit List content</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <Label>List of Files</Label>
          <Checkbox
            onCheckedChange={() => {
              setIsFiles(!isFiles);
            }}
            checked={isFiles}
          />
        </div>
        <div className="flex items-center gap-2">
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
          <Label htmlFor="template">Есть темплейт</Label>
        </div>
        {hasTemplate && <TemplatesSelect onSelect={setTemplate} />}
        <Button
          className="w-full"
          onClick={() =>
            setListCount([
              ...listCount,
              {
                id: +mock[mock.length - 1].id + 1,
                content: "",
                href: "",
              },
            ])
          }
        >
          Add new List item
        </Button>
        <ScrollArea className="h-[320px] rounded-md border p-4">
          {listCount.map((item, idx) => (
            <EditListItem
              list={listCount}
              key={item.id}
              item={item}
              idx={idx + 1}
              isFiles={isFiles}
              templateWidgets={template?.widgets}
            />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const EditListItem = ({
  isFiles,
  idx,
  list,
  item,
  templateWidgets,
}: {
  isFiles: boolean;
  idx: number;
  list: typeof mock;
  item: (typeof mock)[0];
  templateWidgets?: string[];
}) => {
  const [col, setCOl] = useState(0);
  const getTemplatesProps = (w: string) => {
    switch (w) {
      case "Cards":
        return <CardsEditModal />;
      case "Carousel":
        return <CarouselEditModal />;
      case "List":
        return <ListEditModal />;
      case "Text":
        return <TextEditModal />;
      default:
        return null;
    }
  };

  return (
    <EditItem
      title={"List " + idx + 1}
      buttons={
        <>
          <Button size={"sm"}>Save</Button>
          <Button size={"sm"}>
            <DeleteIcon />
          </Button>
        </>
      }
    >
      <div className="flex gap-3">
        <Input label="Content RU" type="text" />
        <Input label="Content KZ" type="text" />
      </div>

      {isFiles ? (
        <Input type="file" label="Document" />
      ) : (
        <Input label="Link" type="text" />
      )}
      {/* {templateWidgets &&
        templateWidgets.map((w, idx) => (
          <Fragment key={idx}>{getEditModalByWidget(w)()}</Fragment>
        ))} */}
      {templateWidgets &&
        templateWidgets.map((w, idx) => (
          <Fragment key={idx}>{getTemplatesProps(w)}</Fragment>
        ))}
    </EditItem>
  );
};

const checkIsEditted = (
  items: typeof mock,
  item: {
    id: number;
    href: string | File;
    contentRU: string;
    contentKZ: string;
  }
) => {
  const base = items.filter((i) => i.id == item.id);
  if (item.contentRU == "" || item.contentKZ == "") {
    return true;
  }
  return base[0].content == item.contentRU && base[0].href == item.href;
};
