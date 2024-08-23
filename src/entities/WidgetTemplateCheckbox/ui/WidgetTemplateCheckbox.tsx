import React from 'react'
import { IWidgetTemplateCheckboxProps } from '../model/WidgetTemplateCheckbox.interface'
import { TemplatesSelect } from '@/features';
import { Checkbox, Label } from '@/shared/ui';

export const WidgetTemplateCheckbox = ({
    modalVariant,
    savedTemplate,
    hasTemplate,
    setHasTemplate,
    setSelectedTemplate,
    templates,
    handleTemplate
}: IWidgetTemplateCheckboxProps) => {
    return (
        <>
            {modalVariant === "card" && (
                <>
                    {savedTemplate ? (
                        <span>Использованный шаблон {savedTemplate}</span>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="template"
                                checked={hasTemplate}
                                onCheckedChange={() => {
                                    setHasTemplate(!hasTemplate);
                                    setSelectedTemplate(null);
                                }}
                            />
                            <Label htmlFor="template" className="mt-1">
                                Есть темплейт
                            </Label>
                        </div>
                    )}
                    {hasTemplate && !savedTemplate && (
                        <TemplatesSelect
                            savedTemplate={savedTemplate}
                            templates={templates}
                            onSelect={handleTemplate}
                        />
                    )}
                </>
            )}
        </>
    )
}
