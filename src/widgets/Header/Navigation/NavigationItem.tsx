import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react'
import { DropNavigation } from './DropNavigation';
import { useScroll } from '@/shared/lib/hooks/useScroll';
import { INavigation } from '@/widgets/NavigationList/model';

interface NavigationItemProps {
    item: INavigation;
    locale: string;
    hoveredItem: number | null;
    handleMouseEnter: (id: number) => void;
    handleMouseLeave: () => void;
}

export const NavigationItem = ({ item, locale, hoveredItem, handleMouseEnter, handleMouseLeave }: NavigationItemProps): ReactNode => {
    const path = usePathname();
    const isHoveredItem = hoveredItem === item.id;
    const isHovered = Boolean(hoveredItem);
    const [scrolled] = useScroll(40)

    if (item.children.length === 0 && item.navigation_type == "content") {
        return <Link
            style={{ fontSize: 'clamp(16px, 1.5vw, 20px)' }}
            className={clsx(
                "text-center h-[94px] rounded-md flex items-center font-semibold",
                isHovered ? "text-white" : "text-red-950",
                path == `/${locale}${item.slug}` && "font-bold",

            )}

            href={`/${locale}/${item.slug}`}
            key={item.id}
        >
            {item.title[locale as string]}
        </Link>
    } else {
        return (
            <>
                <button
                    className={clsx(
                        "text-center relative  h-[94px] flex items-center font-semibold",
                        isHovered ? "text-white" : "text-red-950",
                        path.split('/')[2] == item.slug.split('/')[1] && "font-bold",
                    )}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    key={item.id}
                    style={{ fontSize: 'clamp(16px, 1.5vw, 20px)' }}
                >
                    {item.title[locale as string]}
                    <ChevronRight
                        className={clsx("transitio",
                            isHovered ? "text-white" : "text-red-950",
                            isHoveredItem ? "rotate-90 text-red-950" : "rotate-0"
                        )}
                    />
                </button>
                {
                    isHoveredItem && <DropNavigation item={item} locale={locale} scrolled={scrolled} handleMouseLeave={handleMouseLeave} />
                }
            </>
        )
    }
}