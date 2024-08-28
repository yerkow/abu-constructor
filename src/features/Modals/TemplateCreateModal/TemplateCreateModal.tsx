"use client";
import React, { useRef, useState } from 'react'
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label, Select, SelectContent, SelectItem, SelectTrigger } from '@/shared/ui'
import { useTranslations } from 'next-intl';
import { widgetsList } from '@/widgets';
import { backendUrl } from '@/shared/lib/constants';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/client';
import { fetchCreateTemplate } from './api';

export const TemplateCreateModal = () => {

    const t = useTranslations("pages");
    const closeRef = useRef<HTMLButtonElement>(null);
    const [title, setTitle] = useState("");
    const [widgets, setWidgets] = useState<Array<string>>([]);


    const { mutate: handleCreateTemplate } = useMutation({
        mutationFn: fetchCreateTemplate,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["templates"],
            });
            closeRef.current?.click();
        }
    });




    const handleDelete = (id: number) => {
        setWidgets((prev) => prev.filter((widget, idx) => idx !== id));
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"sm"} className={"mb-3"}>
                    Создать шаблон
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{t("create.title")}</DialogTitle>
                    <DialogDescription>{t("create.desc")}</DialogDescription>
                </DialogHeader>

                <Input
                    label="Название шаблона"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <section className="flex gap-3">
                    <section className='flex flex-col overflow-y-auto max-h-96'>
                        {widgetsList.map(({ displayName }, idx) => (
                            <Button key={idx} size={"sm"} className={"mb-3 text-white"} onClick={() => setWidgets((prev) => [...prev, displayName])}>
                                {displayName}
                            </Button>
                        ))}
                    </section>
                    <section className='flex-grow overflow-y-auto max-h-96'>
                        <h3>Выбранные виджеты</h3>
                        <ul className='flex flex-col gap-2'>
                            {widgets.map((widget, idx) => (
                                <li
                                    className={"p-4 border border-gray-200 rounded-md flex justify-between items-center"}
                                    key={idx}
                                >
                                    <p>
                                        {widget}
                                    </p>
                                    <Button onClick={() => { handleDelete(idx) }}>
                                        Удалить
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </section>
                </section>
                <Button
                    onClick={() => handleCreateTemplate({ title, widgets })}
                    type="submit">
                    Сохранить
                </Button>
                <DialogFooter className=" gap-2 sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            className="w-full"
                            ref={closeRef}
                            type="button"
                            variant="secondary"
                        >
                            {t("create.decline")}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
