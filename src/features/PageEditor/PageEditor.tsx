import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";
import { PageEditorContent } from "./PageEditorContent";

export const PageEditor = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>Контент страницы</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Содержание страницы</DialogTitle>
        </DialogHeader>
        <PageEditorContent />
        <DialogFooter className=" gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Отменить
            </Button>
          </DialogClose>

          <Button>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
