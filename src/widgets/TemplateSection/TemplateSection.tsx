"use client"

import { fetchCreateNavigationItem } from "@/features/Modals/NavigationCreateModal/api"
import { backendUrl } from "@/shared/lib/constants"
import { Button } from "@/shared/ui"
import { useMutation, useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export const TemplateSection = ({ content_id }: { content_id: number }) => {
    const { locale, id: navigation_id } = useParams()



    const { mutate: fetchUpdateContent } = useMutation({
        mutationKey: ['contents', content_id],
        mutationFn: async (data: any) => {
            await fetch(`${backendUrl}/contents/${content_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }
    })

    const { mutate: fetchCreateNavigation } = useMutation({
        mutationKey: ['navigations'],
        mutationFn: fetchCreateNavigationItem,
        onSuccess: (data) => {
            fetchUpdateContent({
                content: {
                    link: data.slug,
                },
                options: {
                    template: true,
                    detail_slug: data.slug
                }
            })

            console.log(data)
        }
    })
    const handleCreateNavigation = async () => {
        const sendData = {
            title: {
                ru: ' ',
                kz: ' ',
                en: ' ',
            },
            navigation_type: 'detail',
            parent_id: +navigation_id,
            slug: String(new Date().getTime()),
        }

        fetchCreateNavigation(sendData)
    }

    const { data, isSuccess } = useQuery({
        queryKey: ['contents', content_id],
        queryFn: async () => {
            const response = await fetch(`${backendUrl}/contents/${content_id}`)
            const data = await response.json()
            return data
        }
    })

    console.log(data?.options)
    // const { mutate: handleDeleteById, error, isPending } = useMutation({
    //     mutationKey: [`navigations`],
    //     mutationFn: async ({ id }: { id: number }) => {
    //         await fetch(`${backendUrl}/navigations/${id}`, {
    //             method: 'DELETE',
    //         })
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({
    //             queryKey: ["navigations"]
    //         });
    //     },
    // });

    return (
        <section>
            {isSuccess && data.options.template ? (
                <div>
                    <Link href={`/${locale}/admin/pages/${data.id}`} >
                        Настроить страницу детальнее
                    </Link>
                </div>
            ) : (
                <Button onClick={handleCreateNavigation}>
                    Создать страницу детальнее
                </Button>
            )}
        </section >
    )
}