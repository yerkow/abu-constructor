"use client"

import { IWidget } from '@/shared/types';
import React from 'react'

export const SideMenu = ({ widgets, locale }: { widgets: IWidget[], locale: string }) => {
    return (
        <ul className="hidden sm:flex sticky top-32  flex-col gap-2 bg-[#F2F2F2]  max-h-fit px-5 py-3 rounded-md">
            {
                widgets.map(({ options }, idx) => {
                    return (
                        <li key={idx}>
                            <a href={`#widget-${idx}`} className="text-abu_primary font-bold hover:underline" onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById(`widget-${idx}`);
                                if (element) {
                                    element.scrollIntoView({ behavior: "smooth" });
                                }
                            }}>
                                {options?.content?.[locale]?.title}
                            </a>
                        </li>
                    );
                })
            }
        </ul>
    )
}
