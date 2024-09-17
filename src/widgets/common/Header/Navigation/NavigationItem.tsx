import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import { DropNavigation } from "./DropNavigation";
import { useScroll } from "@/shared/lib/hooks/useScroll";
import { INavigation } from "@/shared/lib/types";

interface NavigationItemProps {
    item: INavigation;
    locale: string;
    hoveredItem: number | null;
    handleMouseEnter: (id: number) => void;
    handleMouseLeave: () => void;
}

export const NavigationItem = ({
    item,
    locale,
    hoveredItem,
    handleMouseEnter,
    handleMouseLeave,
}: NavigationItemProps) => {
    const path = usePathname();
    const isHoveredItem = hoveredItem === item.id;
    const [scrolled] = useScroll(40);
    const anchorRef = useRef<HTMLAnchorElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [dropdownPosition, setDropdownPosition] = useState<number | null>(null);

    useEffect(() => {
        if (isHoveredItem) {
            const rect = anchorRef.current?.getBoundingClientRect() || buttonRef.current?.getBoundingClientRect();
            if (rect) {
                setDropdownPosition(rect.bottom);
            }
        }
    }, [isHoveredItem]);

    return (
        <>
            {item.navigation_type === "link" || item.navigation_type === "group-link" ? (
                <Link
                    style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}
                    className={clsx(
                        "text-center h-[94px] rounded-md flex items-center font-semibold text-white",
                        path.startsWith(`/${locale}${item.slug}`) && "font-bold"
                    )}
                    href={`/${locale}/${item.slug}`}
                    key={item.id}
                    ref={anchorRef}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                >
                    {item.title[locale as string]}
                    {item.navigation_type === "group-link" && (
                        <ChevronRight
                            className={clsx("transition text-white", isHoveredItem ? "rotate-90" : "rotate-0")}
                        />
                    )}
                </Link>
            ) : (
                <button
                    className={clsx(
                        "text-center relative h-[94px] flex items-center font-semibold text-white",
                        path.split("/")[2] === item.slug.split("/")[1] && "font-bold"
                    )}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                    ref={buttonRef}
                    style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}
                >
                    {item.title[locale as string]}
                    <ChevronRight
                        className={clsx("transition text-white", isHoveredItem ? "rotate-90" : "rotate-0")}
                    />
                </button>
            )}
            {isHoveredItem && (
                <DropNavigation
                    item={item}
                    locale={locale}
                    scrolled={scrolled}
                    handleMouseLeave={handleMouseLeave}
                    dropdownPosition={dropdownPosition}
                />
            )}
        </>
    );
};
