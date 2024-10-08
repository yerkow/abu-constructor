"use client"

import { IWidget } from '@/shared/types';
import React from 'react'

export const SideMenu = ({ widgets, locale }: { widgets: IWidget[], locale: string }) => {
    return (
        <ul className="hidden sm:flex sticky top-32  flex-col shadow-lg  max-h-fit  rounded-md">
            {
                widgets.map(({ options }, idx) => {
                    const { content } = options;

                    return content?.[locale]?.title ?
                        (
                            <li key={idx} className=" bg-white  rounded-md border-l-4 border-transparent hover:border-abu_primary hover:bg-slate-50 ">
                                <a href={`#widget-${idx}`} className="text-abu_primary font-bold hover:underline p-2 block" onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById(`widget-${idx}`);
                                    if (element) {
                                        element.scrollIntoView({ behavior: "smooth" });
                                    }
                                }}>
                                    {content?.[locale]?.title}
                                </a>
                            </li>
                        )
                        : null
                })
            }
        </ul >
    )
}
