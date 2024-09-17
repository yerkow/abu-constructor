"use client"
import { backendUrl } from '@/shared/lib/constants'
import { cn } from '@/shared/lib/utils'
import { IWidgetProps } from '@/shared/types'
import { Button } from '@/shared/ui'
import { getWidgetByName } from '@/widgets'
import { useQuery } from '@tanstack/react-query'
import { useParams, usePathname } from 'next/navigation'
import React, { useState } from 'react'

export function StepSwitcherClient({
    contents,
    options: { content },
    locale,
}: IWidgetProps): React.JSX.Element {

    const currentPath = usePathname()
    const currentSlug = currentPath.replace("/ru/", '')
    const [activeStep, setActiveStep] = useState(() => contents[0].content.link)

    const { data, isLoading, isSuccess } = useQuery(
        {
            queryKey: ['step-switcher', activeStep],
            queryFn: async () => {
                const response = await fetch(`${backendUrl}/navigations/find/by-slug?slug=${currentSlug}/${activeStep}`)
                return response.json()
            }
        }
    )

    console.log(!isLoading ? data.widgets : "")

    function viewWidgets(widget_type: string, widgetOptons: any) {
        return getWidgetByName(widget_type, widgetOptons);
    }
    return (
        <section>
            <h2 className="text-2xl font-bold">
                {content[locale]?.title.toLocaleUpperCase()}
            </h2>
            <section className='flex flex-col mt-5'>
                <section className='flex flex-col gap-3 '>
                    {contents.map(({ content }, idx) => {
                        return (
                            <button className={cn(
                                activeStep === content.link ? 'bg-[#640000] text-white' : 'bg-[#F2F2F2] text-[#640000]',
                                "p-4 rounded-lg text-left"
                            )} key={content[locale].title} onClick={() => setActiveStep(content.link)}>
                                <h3 className=''>{idx + 1}. {content[locale]?.title}</h3>
                            </button>
                        )
                    })}
                </section>
                <section className='mt-5 flex flex-col  gap-10'>
                    {
                        isSuccess
                            ? (
                                <>
                                    {data.widgets?.map(({ widget_type, options, contents }: any) => {
                                        const widgetOptons = { contents, options, locale: locale }
                                        return viewWidgets(widget_type, widgetOptons)
                                    })}
                                </>
                            )
                            : null
                    }

                </section>
            </section>
        </section >
    )
}


