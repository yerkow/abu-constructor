"use client";

import { fetchCreateNavigationItem } from "@/features/Modals/NavigationCreateModal/api";
import { queryClient } from "@/shared/lib/client";
import { backendUrl } from "@/shared/lib/constants";
import { Button } from "@/shared/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

export const TemplateSection = ({ content_id }: { content_id: number }) => {
    const { locale, id: navigation_id } = useParams();

    const { mutateAsync: fetchUpdateContent } = useMutation({
        mutationKey: ["contents", content_id],
        mutationFn: async (data: any) => {
            await fetch(`${backendUrl}/contents/${content_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["contents", content_id],
            });
        },
    });

    const { mutateAsync: fetchCreateNavigation } = useMutation({
        mutationKey: ["navigations"],
        mutationFn: fetchCreateNavigationItem,
        onSuccess: async (data) => {
            await fetchUpdateContent({
                content: {
                    link: data.slug,
                },
                options: {
                    template: true,
                    template_id: data.id, // Исправлено название поля
                    detail_slug: data.slug,
                },
            });

            console.log(data);
        },
    });

    const handleCreateNavigation = async () => {
        const sendData = {
            title: {
                ru: " ",
                kz: " ",
                en: " ",
            },
            navigation_type: "detail",
            parent_id: +navigation_id,
            slug: String(new Date().getTime()),
        };

        await fetchCreateNavigation(sendData);
    };

    const { data, isSuccess } = useQuery({
        queryKey: ["contents", content_id],
        queryFn: async () => {
            const response = await fetch(`${backendUrl}/contents/${content_id}`);
            const data = await response.json();
            return data;
        },
    });

    const {
        mutateAsync: handleDeleteById,
        error,
        isPending,
    } = useMutation({
        mutationKey: [`navigations`],
        mutationFn: async (id: number) => {
            if (!id) return;
            await fetch(`${backendUrl}/navigations/${id}`, {
                method: "DELETE",
            });
        },
        onSuccess: async () => {
            await fetchUpdateContent({
                content: {
                    link: null,
                },
                options: {
                    template: false,
                    template_id: null,
                    detail_slug: null,
                },
            });

            queryClient.invalidateQueries({
                queryKey: ["navigations"],
            });

            console.log(data);
        },
    });

    console.log(data);

    return (
        <section>
            {isSuccess && data.options?.template !== false ? (
                <div className="flex gap-6">
                    <Link
                        className="flex justify-center items-center grow bg-[#640000] rounded-e-md text-white"
                        href={`/${locale}/admin/pages/${data.options?.template_id}`}
                    >
                        Настроить страницу детальнее
                    </Link>
                    <Button
                        onClick={() => {
                            handleDeleteById(data.options?.template_id);
                        }}
                    >
                        Удалить страницу детальнее
                    </Button>
                </div>
            ) : (
                <Button onClick={handleCreateNavigation}>
                    Создать страницу детальнее
                </Button>
            )}
        </section>
    );
};
