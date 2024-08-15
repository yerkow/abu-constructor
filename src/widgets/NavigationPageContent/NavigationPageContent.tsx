"use client";
import React, { useRef } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/client';
import { useTranslations } from 'next-intl';
import { widgetsList } from "@/widgets";
import { fetchWidgetCreate, fetchWidgetListByNavigationId, fetchWidgetOrderUpdate, fetchWidgetRemoveById } from './api';
import { IWidget, IWidgetCreateOptions, WidgetCreateFormProps } from './model';
import { DeleteIcon, Loader2, Settings } from 'lucide-react';
import { handleDragStart, handleDrop } from './lib';
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input } from '@/shared/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import { backendUrl } from '@/shared/lib/constants';


export const NavigationPageContent = ({ params: { id } }: { params: { id: string, locale: string } }) => {
    const t = useTranslations("pages.pageEditorContent");


    const { data: widgets, isFetching } = useQuery<IWidget[]>({
        queryKey: ["widgets"],
        queryFn: () => fetchWidgetListByNavigationId(id),
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
        <section className='flex gap-5 ' >
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
                                            className="flex justify-between items-center gap-2 rounded-sm px-5 py-3 bg-slate-100 cursor-grab"
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
                                                <EditWidgetModal widget_id={widget.id} />
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
                    <CreateWidgetByNavigationModal displayName={displayName} navigation_id={+id} />
                ))}
            </section>
        </section >
    )
}


const CreateWidgetByNavigationModal = ({ displayName, navigation_id }: { displayName: string, navigation_id: number }) => {
    const closeRef = useRef<HTMLButtonElement>(null);

    const {
        register,
        handleSubmit,
    } = useForm<WidgetCreateFormProps>({
        mode: "onBlur",
        defaultValues: {
            title: {
                ru: "",
                kz: "",
                en: ""
            }
        },
    });

    const { mutate: handleWidgetCreate, isPending } = useMutation<any, Error, IWidgetCreateOptions>({
        mutationFn: (data: IWidgetCreateOptions) => fetchWidgetCreate(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["widgets"],
            });
            closeRef.current?.click();
        },
    })

    const handleCreate: SubmitHandler<WidgetCreateFormProps> = (data) => {
        handleWidgetCreate({ options: data, navigation_id, widget_type: displayName });
    };

    return (
        <Dialog>
            <DialogTrigger asChild className='cursor-pointer px-10 py-3 rounded-sm text-center bg-slate-200'>
                <Button size={"sm"} className={"mb-3 text-black"}>
                    {displayName}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Создать виджет - {displayName}</DialogTitle>
                    <DialogDescription>Заполните все поля</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleCreate)}>
                    <Input
                        label="Заголовок на русском"
                        {...register("title.ru", { required: true })}
                    />
                    <Input
                        label="Заголовок на казахском"
                        {...register("title.kz", { required: true })}
                    />
                    <Input
                        label="Заголовок на английском"
                        {...register("title.en", { required: true })}
                    />
                    <Button type="submit" className='w-full' loading={isPending} disabled={isPending}>
                        Создать
                    </Button>
                </form>
                <DialogFooter className=" gap-2 sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            className="w-full"
                            ref={closeRef}
                            type="button"
                            variant="secondary"
                        >
                            Отмена
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const EditWidgetModal = ({ widget_id }: { widget_id: number }) => {
    console.log(widget_id)
    const { data: widget, isFetching } = useQuery<IWidget>({
        queryKey: ['widget'],
        queryFn: async (widget_id) => {
            const response = await fetch(`${backendUrl}/widgets/${widget_id}`);
            return response.json();
        }
    })



    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon">
                    <Settings />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать виджет - {widget?.widget_type}</DialogTitle>
                    <DialogDescription>Заполните все поля</DialogDescription>
                </DialogHeader>
                <DialogFooter className=''>
                    <DialogClose asChild className='w-full'>
                        <Button variant='secondary'>Отмена</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}