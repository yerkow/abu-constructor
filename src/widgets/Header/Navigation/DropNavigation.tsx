import { NavPage } from '@/shared/lib/types';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'


interface DropNavigationProps {
    item: NavPage;
    locale: string | string[];
    handleMouseLeave: () => void;
    scrolled: boolean;
}

export const DropNavigation = ({ handleMouseLeave, item, locale, scrolled }: DropNavigationProps) => {
    const path = usePathname();

    return (
        <section onMouseLeave={handleMouseLeave} className={clsx(
            "absolute left-0  pt-3 w-full bg-[#640000] h-[300px] ",
            scrolled ? "top-[94px]" : "top-[134px]"
        )}>
            <ul className="flex justify-center  gap-[60px] ">
                {item.children.map((child) => (
                    <li key={child.id}>
                        <h2 className="text-white font-bold text-[24px]">{child.title}</h2>
                        {
                            child.children.length > 0 && (
                                <ul className="mt-4 flex flex-col gap-3">
                                    {child.children.map((subChild) => (
                                        <li key={subChild.id}>
                                            <Link
                                                href={`/${locale}/${subChild.slug}`}
                                                className={clsx(
                                                    "text-center text-slate-200",
                                                    path == `/${locale}${subChild.slug}` && "font-bold",
                                                )}
                                            >
                                                {subChild.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )
                        }
                    </li>
                ))}
            </ul>
        </section>
    )
}
