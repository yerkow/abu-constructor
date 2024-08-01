import { editWidget, getWidgetHistory } from "@/shared/api/widgets";
import { queryClient } from "@/shared/lib/client";
import { BackedWidget } from "@/shared/lib/types";
import { formatDateToDDMMYYYY } from "@/shared/lib/utils";
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
  Dialog,
  DialogContent,
  DialogTrigger,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useToast,
} from "@/shared/ui";
import { getWidgetByName } from "@/widgets";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArchiveRestore, Eye, Loader2 } from "lucide-react";
interface HistoryContentProps {
  ids: {
    ruId: number;
    kzId: number;
    ruPageId: number;
    kzPageId: number;
  };
}
export const HistoryContent = ({ ids }: HistoryContentProps) => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["history"],
    queryFn: () => getWidgetHistory(ids),
  });
  if (!data) return <div>No history</div>;
  if (isFetching)
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="animate-spin w-10 h-10 align-middle" />
      </div>
    );
  return (
    <ScrollArea className="h-[calc(100svh-400px)] space-y-4 ">
      {data.map((item, idx) => (
        <ContentItem key={idx} pair={item} ids={ids} />
      ))}
    </ScrollArea>
  );
};
interface ContentItemProps {
  pair: { ru: BackedWidget; kz: BackedWidget };
  ids: {
    ruId: number;
    kzId: number;
    ruPageId: number;
    kzPageId: number;
  };
}
const ContentItem = ({ pair, ids }: ContentItemProps) => {
  return (
    <div className=" py-4 my-3 bg-slate-100 px-5 rounded-sm grid grid-cols-[1fr_auto]">
      <div>Изменено {formatDateToDDMMYYYY(pair.ru.create_date)}</div>
      <div className="flex gap-4">
        <ShowButton pair={pair} />
        <RestoreButton pair={pair} ids={ids} />
      </div>
    </div>
  );
};
const RestoreButton = ({ pair, ids }: ContentItemProps) => {
  const { toast } = useToast();
  const { mutateAsync: editWidgetMutation, isPending: editIsPending } =
    useMutation({
      mutationKey: ["historyRestore"],
      mutationFn: editWidget,
      onError: (error) => {
        console.log(error);
      },
    });
  const onRestore = () => {
    Promise.all([
      editWidgetMutation({
        id: pair.ru.idn,
        body: { options: pair.ru.options },
        navigation_id: ids.ruPageId,
      }),
      editWidgetMutation({
        id: pair.kz.idn,
        body: { options: pair.kz.options },
        navigation_id: ids.kzPageId,
      }),
    ])
      .then(() => {
        toast({
          title: "Виджет восстановлен.",
        });
        queryClient.invalidateQueries({ queryKey: ["pageEditWidgets"] });
      })
      .catch((e) => {
        toast({
          variant: "destructive",
          title: "Ошибка при восстановлении виджета.",
        });
      });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="px-3 py-2 rounded-md bg-black">
        <ArchiveRestore color="white" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы уверены, что хотите восстановить?
          </AlertDialogTitle>
          <AlertDialogDescription className="hidden">
            Кнопка восстановления
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction onClick={onRestore}>
            Восстановить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
const ShowButton = ({ pair }: Omit<ContentItemProps, "ids">) => {
  return (
    <Dialog>
      <DialogTrigger className="px-3 py-2 bg-black rounded-md">
        <Eye color="white" />
      </DialogTrigger>
      <DialogContent className="min-w-[100vw] h-[100svh] flex justify-center">
        <Tabs defaultValue="ru" className="w-full flex items-center flex-col">
          <TabsList>
            <TabsTrigger value="ru">На русском</TabsTrigger>
            <TabsTrigger value="kz">На казахском</TabsTrigger>
          </TabsList>
          <TabsContent value="ru" className="w-full">
            {getWidgetByName(pair.ru.widget_type, JSON.parse(pair.ru.options))}
          </TabsContent>
          <TabsContent value="kz" className="w-full">
            {getWidgetByName(pair.kz.widget_type, JSON.parse(pair.kz.options))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
