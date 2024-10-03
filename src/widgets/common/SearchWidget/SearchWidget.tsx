"use client"
import React from 'react'
import { SearchBar } from '@/features/search-bar'
import { Button, Dialog, DialogTrigger, DialogContent } from '@/shared/ui'
import { DialogTitle } from '@radix-ui/react-dialog'
import { SearchIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

export const SearchWidget = () => {

    const t = useTranslations("search");

    return (
        <Dialog>
            <DialogTrigger >
                <Button>
                    <SearchIcon className='text-white w-10 cursor-pointer' />
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px] max-h-[95%] overflow-y-auto'>
                <DialogTitle>{t("title")}</DialogTitle>
                <SearchBar />
            </DialogContent>
        </Dialog>

    )
}
