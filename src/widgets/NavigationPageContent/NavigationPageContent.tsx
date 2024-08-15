"use client";
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { widgetsList } from "@/widgets";
import { useTranslations } from 'next-intl';
import { DeleteIcon, Loader2, Settings } from 'lucide-react';
import { queryClient } from '@/shared/lib/client';
import { IWidget } from './model';
import { fetchWidgetListByNavigationId, fetchWidgetOrderUpdate, fetchWidgetRemoveById } from './api';
import { handleDragStart, handleDrop } from './lib';
import { Button } from '@/shared/ui';


export const NavigationPageContent = ({ params }: { params: { id: string, locale: string } }) => {
    const [list, setList] = useState<any[]>([]);
    const t = useTranslations("pages.pageEditorContent");


    const { data: widgets, isFetching } = useQuery<IWidget[]>({
        queryKey: ["widgets"],
        queryFn: () => fetchWidgetListByNavigationId(params.id),
    })

    const { mutate: handleWidgetUpdate } = useMutation({
        mutationFn: fetchWidgetOrderUpdate,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["widgets"],
            });
        },
    })

    const { mutate: handleWidgetDelete } = useMutation({
        mutationFn: fetchWidgetRemoveById,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["widgets"],
            });
        },
    })



    return (
        <section className='flex gap-5 '>
            <section className='flex grow bg-slate-500 flex-col gap-3  p-3'>
                <h2 className="text-center mb-2 text-white font-bold">{t("rightTitle")}</h2>
                <section>
                    {
                        isFetching && (<div className="flex justify-center items-center">
                            <Loader2 className="animate-spin w-10 h-10 align-middle" />
                        </div>)
                    }
                    {
                        widgets?.length === 0
                            ? (
                                <section className='flex justify-center items-center'>
                                    <h1>В этой странице нет контента</h1>
                                </section>
                            )
                            : (
                                <ul className='flex flex-col gap-2'>
                                    {widgets?.map((widget) => (
                                        <li
                                            key={widget.id}
                                            className="flex justify-between items-center gap-2 rounded-sm px-5 py-3 bg-slate-100"
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, widget)}
                                            onDrop={(e: React.DragEvent<HTMLLIElement>) => handleDrop(e, widget, handleWidgetUpdate)}
                                            onDragOver={(e) => e.preventDefault()}
                                        >
                                            <span
                                            >
                                                {widget.widget_type}
                                            </span>
                                            <section className="flex gap-2">
                                                <Button size={"icon"} onClick={() => handleWidgetDelete(widget.id)}>
                                                    <DeleteIcon className='cursor-pointer' />
                                                </Button>
                                                <Button size={"icon"}>
                                                    <Settings />
                                                </Button>
                                            </section>
                                        </li>
                                    ))}
                                </ul>
                            )
                    }
                </section>
            </section>
            <section className="flex flex-col ">
                <h3>{t("leftTitle")}</h3>
                {widgetsList.map(({ displayName }) => (
                    <span
                        className=" cursor-pointer px-10 py-3 rounded-sm text-center bg-slate-200"
                        key={displayName}
                        onClick={() => {
                            if (!isFetching)
                                setList([
                                    ...list,
                                    { id: list.length + 1, name: displayName },
                                ]);
                        }}
                    >
                        {displayName}
                    </span>
                ))}
            </section>
        </section>
    )
}
