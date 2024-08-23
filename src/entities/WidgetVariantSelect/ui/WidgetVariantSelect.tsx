import React from 'react'
import { IWidgetVariantSelect } from '../model/WidgetVariantSelect.interface'
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui'

export const WidgetVariantSelect = ({ variant, writeFunction }: IWidgetVariantSelect) => {
    return (
        <div className="flex gap-2 items-center">
            <Label>Select card variant</Label>
            <Select
                value={variant}
                onValueChange={(value) => writeFunction("variant", value)}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Variant" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="base">Base</SelectItem>
                    <SelectItem value="horizontal">Horizontal</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
