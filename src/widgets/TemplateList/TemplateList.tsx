"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query';

export const TemplateList = () => {

    const { data } = useQuery({
        queryKey: ["templates"],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3003/api/template`);
            return response.json();
        }
    })

    return (
        <ul className="flex flex-col gap-3">
            {
                data?.map((template: any) => (
                    <li key={template.id} className="p-4 border border-gray-200 rounded-md flex flex-col gap-2">
                        {template.title}
                    </li>
                ))
            }
        </ul>
    )
}
