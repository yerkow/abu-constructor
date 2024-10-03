"use client"
import React, { useState } from 'react'
import { useSearch } from '../model/useSearch'
import { useParams } from 'next/navigation'
import { Input } from '@/shared/ui'
import Link from 'next/link'
import { Badge } from '@/shared/ui/badge'
import { useTranslations } from 'next-intl'

export const SearchBar = () => {

    const [query, setQuery] = useState('')
    const locale = useParams().locale as string
    const t = useTranslations("search");

    const { data, isLoading } = useSearch(query, locale)


    return (
        <section>
            <Input placeholder="Напишите для поиска" className='w-48' label="" value={query} onChange={(e) => setQuery(e.target.value)} />
            {isLoading
                ? <p>Loading...</p>
                : (
                    <ul>
                        {
                            data?.map((item: any) => (

                                <li key={item.id} >
                                    <Link href={`/${locale}/${item.slug}`} className='flex items-center justify-between p-2 hover:bg-muted rounded-md'>
                                        <h3 className='quill-content ql-size-large' >{item.title}</h3>
                                        <Badge variant="outline">{t(item.type)}</Badge>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </section >
    )
}
