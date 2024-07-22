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
  useToast,
  WidgetView,
} from "@/shared/ui";
import { Label } from "@radix-ui/react-label";
import { DeleteIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { CardsEditModal } from "../Cards/CardsEditModal";
import { CarouselEditModal } from "../Carousel/CarouselEditModal";
import { TextEditModal } from "../Text/TextEditModal";
import { createWidget, editWidget, getWidgetProps } from "@/shared/api/widgets";
import { WidgetProps } from "@/shared/lib/types";
import { queryClient } from "@/shared/lib/client";
import { useMutation } from "@tanstack/react-query";
import { saveToServerAndGetUrl } from "@/shared/lib/utils";
import { backendImageUrl } from "@/shared/lib/constants";
type EditListItemProps = {
  contentRu: string;
  contentKz: string;
  file: File | null | string;
};
type ListState = Record<string, EditListItemProps>;
interface ListEditModalProps {
  variant?: "card" | "dialog";
  order: number;
  queryKey: string;
  ruPageId: number | null;
  kzPageId: number | null;
}
export const ListEditModal = ({
  variant = "card",
  order,
  ruPageId,
  kzPageId,
  queryKey,
}: ListEditModalProps) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle="Edit List"
      desc="There you can edit List content"
      triggerTitle="Редактировать лист"
      content={
        <ModalContent
          variant={variant}
          ruPageId={ruPageId}
          kzPageId={kzPageId}
          order={order}
          queryKey={queryKey}
        />
      }
    />
  );
};
const ModalContent = ({
  queryKey,
  ruPageId,
  kzPageId,
  order,
}: ListEditModalProps) => {
  // const [isFiles, setIsFiles] = useState(false);
  // const [hasTemplate, setHasTemplate] = useState(false);
  const { toast } = useToast();
  const {
    mutate: createListWidget,
    isPending: createIsPending,
    error,
  } = useMutation({
    mutationKey: ["createListWidget"],
    mutationFn: createWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast({
        title: "Виджет создан.",
      });
    },
  });
  const { mutate: editListWidget, isPending: editIsPending } = useMutation({
    mutationKey: ["editListWidget"],
    mutationFn: editWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast({
        title: "Виджет изменен.",
      });
    },
  });

  const [listItems, setListItems] = useState<ListState>({});
  const [props, setProps] = useState<WidgetProps | null>(null);
  console.log(props, "PRPOS");

  useEffect(() => {
    if (ruPageId && kzPageId)
      getWidgetProps({ ruPageId, kzPageId, order }).then((data) => {
        setProps(data);
      });
  }, [ruPageId, kzPageId, order]);
  useEffect(() => {
    if (props) {
      const temp: ListState = {};
      const listItems = props.ruOptions.items;
      listItems.forEach((listItem: any, idx: number) => {
        temp[listItem.id] = {
          contentRu: listItem.content,
          contentKz: props.kzOptions.items[idx].content,
          file: listItem.file,
        };
      });
      setListItems(temp);
    }
  }, [props]);
  console.log(props, "PROPS", listItems, "LIST");

  const addNewListItem = () => {
    setListItems({
      ...listItems,
      [`${Date.now()}`]: {
        contentRu: "",
        contentKz: "",
        file: null,
      },
    });
  };
  const writeChanges = (id: string, field: string, value: string | File) => {
    if (!(id in listItems)) return;
    setListItems({ ...listItems, [id]: { ...listItems[id], [field]: value } });
  };

  const deleteListItem = (id: string) => {
    setListItems((prev) => {
      const temp = prev;
      delete temp[id];
      return { ...temp };
    });
  };
  const onSave = async () => {
    if (ruPageId && kzPageId) {
      const RuItems = await Promise.all(
        Object.keys(listItems).map(async (key) => {
          console.log(listItems[key].file);
          const file = await saveToServerAndGetUrl(listItems[key].file);
          return {
            id: key,
            content: listItems[key].contentRu,
            file,
          };
        }),
      );
      const KzItems = await Promise.all(
        Object.keys(listItems).map(async (key) => {
          const file = await saveToServerAndGetUrl(listItems[key].file);

          return {
            id: key,
            content: listItems[key].contentKz,
            file,
          };
        }),
      );
      createListWidget({
        widget_type: "List",
        order,
        options: JSON.stringify({
          items: RuItems,
          language_key: "ru",
          navigation_id: +ruPageId,
        }),
        language_key: "ru",
        navigation_id: +ruPageId,
      });
      createListWidget({
        widget_type: "List",
        order,
        options: JSON.stringify({
          items: KzItems,
          language_key: "kz",
          navigation_id: +kzPageId,
        }),
        language_key: "kz",
        navigation_id: +kzPageId,
      });
    }
  };
  const onEdit = async () => {
    if (props) {
      const RuItems = await Promise.all(
        Object.keys(listItems).map(async (key) => {
          const file = await saveToServerAndGetUrl(listItems[key].file);
          return {
            id: key,
            content: listItems[key].contentRu,
            file,
          };
        }),
      );
      const KzItems = await Promise.all(
        Object.keys(listItems).map(async (key) => {
          const file = await saveToServerAndGetUrl(listItems[key].file);

          return {
            id: key,
            content: listItems[key].contentKz,
            file,
          };
        }),
      );
      if (ruPageId && kzPageId) {
        editListWidget({
          id: props.ruWidgetId,
          navigation_id: ruPageId,
          body: {
            options: JSON.stringify({
              items: RuItems,
            }),
          },
        });
        editListWidget({
          id: props.kzWidgetId,
          navigation_id: kzPageId,
          body: {
            options: JSON.stringify({
              items: KzItems,
            }),
          },
        });
      }
    }
  };
  return (
    <>
      {/* <div className="flex gap-2 items-center"> */}
      {/*   <Label>List of Files</Label> */}
      {/*   <Checkbox */}
      {/*     onCheckedChange={() => { */}
      {/*       setIsFiles(!isFiles); */}
      {/*     }} */}
      {/*     checked={isFiles} */}
      {/*   /> */}
      {/* </div> */}
      {/* <div className="flex items-center gap-2"> */}
      {/*   <Checkbox */}
      {/*     id="template" */}
      {/*     checked={hasTemplate} */}
      {/*     onCheckedChange={() => */}
      {/*       setHasTemplate((prev) => { */}
      {/*         if (prev) { */}
      {/*           setTemplate(null); */}
      {/*         } */}
      {/*         return !prev; */}
      {/*       }) */}
      {/*     } */}
      {/*   /> */}
      {/*   <Label htmlFor="template" className="mt-1"> */}
      {/*     Есть темплейт */}
      {/*   </Label> */}
      {/* </div> */}
      {/* {hasTemplate && <TemplatesSelect onSelect={setTemplate} />} */}
      <Button className="w-full" onClick={() => addNewListItem()}>
        Add new List item
      </Button>
      <section className="h-[320px] overflow-y-scroll rounded-md border p-4">
        {Object.keys(listItems).map((key) => (
          <EditListItem
            id={key}
            key={key}
            writeChanges={writeChanges}
            deleteListItem={() => deleteListItem(key)}
            listItem={listItems[key]}
          />
        ))}
      </section>
      <Button
        loading={createIsPending || editIsPending}
        disabled={createIsPending || editIsPending}
        onClick={props ? onEdit : onSave}
      >
        Сохранить
      </Button>
    </>
  );
};
const EditListItem = ({
  id,
  listItem,
  deleteListItem,
  writeChanges,
  // templateWidgets,
}: {
  id: string;
  listItem: EditListItemProps;
  writeChanges: (id: string, field: string, value: string | File) => void;
  deleteListItem: () => void;
  // templateWidgets?: string[];
}) => {
  // const getTemplatesProps = (w: string) => {
  //   switch (w) {
  //     case "Cards":
  //       return <CardsEditModal />;
  //     case "Carousel":
  //       return <CarouselEditModal variant="dialog" />;
  //     case "List":
  //       return <ListEditModal variant="dialog" />;
  //     case "Text":
  //       return <TextEditModal />;
  //     default:
  //       return null;
  //   }
  // };
  console.log(listItem);

  return (
    <EditItem
      title={"List " + id}
      buttons={
        <>
          <Button onClick={deleteListItem} size={"sm"}>
            <DeleteIcon />
          </Button>
        </>
      }
    >
      <div className="flex gap-3">
        <Input
          label="Content RU"
          type="text"
          value={listItem.contentRu}
          onChange={(e) => writeChanges(id, "contentRu", e.target.value)}
        />
        <Input
          label="Content KZ"
          type="text"
          value={listItem.contentKz}
          onChange={(e) => writeChanges(id, "contentKz", e.target.value)}
        />
      </div>
      {listItem.file && (
        <a
          href={`${backendImageUrl}${listItem.file as string}`}
          target="_blank"
          className="text-lg"
        >
          Посмотреть прикрепленный файл
        </a>
      )}
      <Input
        type="file"
        label="Document"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            writeChanges(id, "file", file);
          }
        }}
      />
    </EditItem>
  );
};
