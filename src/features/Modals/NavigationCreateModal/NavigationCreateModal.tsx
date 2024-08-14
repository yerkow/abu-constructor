"use client"
import React, { useRef, useState } from 'react'
import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui";
import { SubmitHandler, useForm } from 'react-hook-form';
import { INavigation } from '@/widgets/NavigationList/model/Navigation.model';
import { PageType } from '@/shared/lib';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/client';
import { useTranslations } from 'next-intl';
import { fetchCreateNavigationItem } from './api';

export const NavigationCreateModal = ({ parent_id = null }: { parent_id?: number | null }) => {
    const [pageType, setPageType] = useState<PageType>("content");
    const t = useTranslations("pages");
    const closeRef = useRef<HTMLButtonElement>(null);


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<INavigation>({
        mode: "onBlur", defaultValues: {
            title: {},
            slug: "",
        }
    });


    const { mutate, error, isPending } = useMutation({
        mutationKey: ["navigation"],
        mutationFn: fetchCreateNavigationItem,
        onSuccess: () => {
            reset();
            if (closeRef.current) closeRef.current.click();
            queryClient.invalidateQueries({
                queryKey: ["navigations"],
            });
        },
    });


    const handleCreate: SubmitHandler<Pick<INavigation, "slug" | "title" | "navigation_type" | "parent_id">> = (data) => {
        mutate({ ...data, navigation_type: pageType, parent_id: parent_id });
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"sm"} className={"mb-3"}>
                    {parent_id ? t("create.childBtn") : t("create.btn")}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{t("create.title")}</DialogTitle>
                    <DialogDescription>{t("create.desc")}</DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit(handleCreate)}>
                    <Input
                        label={t("form.nameRu")}
                        {...register("title.ru", { required: true })}
                        error={errors.title?.ru?.message}
                    />
                    <Input
                        label={t("form.nameKz")}
                        {...register("title.kz", { required: true })}
                        error={errors.title?.kz?.message}
                    />
                    <Input
                        label={t("form.nameEn")}
                        {...register("title.en", { required: true })}
                        error={errors.title?.kz?.message}
                    />
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="pageType">{t("form.select.placeholder")}</Label>
                        <Select
                            value={pageType}
                            onValueChange={(value) => setPageType(value as PageType)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={t("form.select.placeholder")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={"content"}>
                                    {t("form.select.content")}
                                </SelectItem>
                                <SelectItem value={"group"}>
                                    {t("form.select.group")}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Input
                        label={t("form.slug")}
                        {...register("slug", { required: true })}
                        error={errors.slug?.message}
                    />
                    <Button loading={isPending} disabled={isPending} type="submit">
                        {t("form.save")}
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
                            {t("create.decline")}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
