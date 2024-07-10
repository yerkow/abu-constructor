"use client";
import { PageEditor } from "@/features/PageEditor/PageEditor";
import {
  Button,
  Input,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogClose,
  Dialog,
} from "@/shared/ui";
import { DeleteIcon, Settings } from "lucide-react";
export const DeletePageBtn = ({ name, id }: { name: string; id: number }) => {
  console.log(id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <DeleteIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            Вы уверены, что хотите удалить страницу {name}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className=" gap-2 sm:justify-center">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Отменить
            </Button>
          </DialogClose>
          <Button onClick={() => {}}>Удалить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
