import React from 'react'
import { NavigationItem } from './NavigationItem';
import { INavigation } from '@/widgets/NavigationList/model/Navigation.model';


interface INavListProps {
    pages: INavigation[];
    locale: string;
    hoveredItem: number | null;
    setHoveredItem: (id: number | null) => void;

}

export const NavigationList = ({
    pages,
    locale,
    hoveredItem,
    setHoveredItem
}: INavListProps) => {

    const handleMouseEnter = (id: number) => {
        setHoveredItem(id);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    return (
        <ul onMouseLeave={handleMouseLeave} className="flex text-start gap-5 text-xl">
            {
                pages.map((mainPage) =>
                    <NavigationItem
                        key={mainPage.id}
                        item={mainPage}
                        locale={locale}
                        hoveredItem={hoveredItem}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                    />)
            }
        </ul>
    )
};