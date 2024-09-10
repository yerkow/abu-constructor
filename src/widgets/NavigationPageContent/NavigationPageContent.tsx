"use client";
import React, { useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/client";
import { useTranslations } from "next-intl";
import { widgetsList } from "@/widgets";
import {
  fetchWidgetCreate,
  fetchWidgetListByNavigationId,
  fetchWidgetOrderUpdate,
  fetchWidgetRemoveById,
} from "./api";
import { IWidget, IWidgetCreateOptions } from "./model";
import { DeleteIcon, Loader2, Settings } from "lucide-react";
import { handleDragStart, handleDrop } from "./lib";
import { Button } from "@/shared/ui";
import { SubmitHandler } from "react-hook-form";
import Link from "next/link";

export const NavigationPageContent = ({
  params: { id },
}: {
  params: { id: string; locale: string };
}) => {
  const t = useTranslations("pages.pageEditorContent");

  const { data: widgets, isFetching } = useQuery<IWidget[]>({
    queryKey: ["widgets"],
    queryFn: () => fetchWidgetListByNavigationId(id),
  });

  const { mutate: handleWidgetUpdate } = useMutation({
    mutationFn: fetchWidgetOrderUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["widgets"],
      });
    },
  });

  const { mutate: handleWidgetDelete } = useMutation({
    mutationFn: fetchWidgetRemoveById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["widgets"],
      });
    },
  });

  const { mutate: handleWidgetCreate, isPending } = useMutation<
    any,
    Error,
    IWidgetCreateOptions
  >({
    mutationFn: (data: IWidgetCreateOptions) => fetchWidgetCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["widgets"],
      });
    },
  });

  const handleCreate: SubmitHandler<{
    navigation_id: number;
    displayName: string;
  }> = ({ navigation_id, displayName }) => {
    handleWidgetCreate({
      navigation_id,
      widget_type: displayName,
      options: { created: true },
    });
  };

  return (
    <section className="flex gap-5">
      <section className="flex grow bg-slate-500 flex-col gap-3  p-3">
        <h2 className="text-center mb-2 text-white font-bold">
          {t("rightTitle")}
        </h2>
        <section>
          {isFetching && (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin w-10 h-10 align-middle" />
            </div>
          )}
          {widgets?.length === 0 ? (
            <section className="flex justify-center items-center">
              <h1>В этой странице нет контента</h1>
            </section>
          ) : (
            <ul className="flex flex-col gap-2">
              {widgets?.map((widget) => (
                <li
                  key={widget.id}
                  className="flex justify-between items-center gap-2 rounded-sm px-5 py-3 bg-slate-100 cursor-grab"
                  draggable
                  onDragStart={(e) => handleDragStart(e, widget)}
                  onDrop={(e: React.DragEvent<HTMLLIElement>) =>
                    handleDrop(e, widget, handleWidgetUpdate)
                  }
                  onDragOver={(e) => e.preventDefault()}
                >
                  <span>{widget.widget_type}</span>
                  <section className="flex gap-2">
                    <Button
                      size={"icon"}
                      onClick={() => handleWidgetDelete(widget.id)}
                    >
                      <DeleteIcon className="cursor-pointer" />
                    </Button>
                    <Link
                      className="bg-[#640000] text-white text-center rounded-md p-2"
                      href={{ pathname: `${id}/widget/${widget.id}` }}
                    >
                      <Settings />
                    </Link>
                  </section>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
      <section className="flex flex-col ">
        <h3>{t("leftTitle")}</h3>
        {widgetsList.map(({ displayName }) => (
          <Button
            onClick={() => handleCreate({ navigation_id: +id, displayName })}
            size={"sm"}
            className="mb-3 text-black cursor-pointer px-10 py-3 rounded-sm text-center bg-slate-200"
          >
            {displayName}
          </Button>
        ))}
      </section>
    </section>
  );
};
