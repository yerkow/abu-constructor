"use client";
import { queryClient } from "@/shared/lib/client";
import {
  Button,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogClose,
  Dialog,
  DialogDescription,
} from "@/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { DeleteIcon, Settings } from "lucide-react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { backendUrl } from "@/shared/lib/constants";
export const DeletePageBtn = ({
  navigationId,
  name
}: {
  name: string
  navigationId: number
}) => {
  const { mutate, error, isPending } = useMutation({
    mutationKey: [`navigations`],
    mutationFn: async ({ id }: { id: number }) => {
      await fetch(`${backendUrl}/navigations/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      if (closeRef.current) closeRef.current.click();
      queryClient.invalidateQueries({
        queryKey: ["navigations"]
      });
    },
  });
  const closeRef = useRef<HTMLButtonElement>(null);

  const t = useTranslations("pages.delete");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <DeleteIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {t("title")} - {name}
          </DialogTitle>
          <DialogDescription>{t("desc")}</DialogDescription>
        </DialogHeader>
        <DialogFooter className=" gap-2 sm:justify-center">
          <DialogClose asChild>
            <Button ref={closeRef} type="button" variant="secondary">
              {t("decline")}
            </Button>
          </DialogClose>
          <Button onClick={() => mutate({ id: navigationId })} loading={isPending} disabled={isPending}>
            {t("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
