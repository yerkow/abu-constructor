import { backendImageUrl } from '@/shared/lib/constants';
import { IWidgetProps } from '@/shared/types'
import React from 'react'
import { ProfileCard } from './ui/ProfileCard/ProfileCard';

function PersonProfiles({
    contents,
    options: { content },
    locale,
}: IWidgetProps) {
    return (
        <section className='flex flex-col gap-3'>
            <h2 className="text-2xl font-bold">
                {content?.[locale]?.title.toLocaleUpperCase()}
            </h2>
            <ul className='grid grid-cols-[repeat(auto-fill,_310px)] gap-5'>
                {
                    contents.map(({ content }, idx) => (
                        <ProfileCard key={idx} content={content} locale={locale} />
                    ))
                }
            </ul>
        </section>
    )
}

PersonProfiles.displayName = "PersonProfiles";
export default PersonProfiles;