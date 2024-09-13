'use client';
import { DragEvent } from "react";
import { INavigation } from "./model";
import { NavigationEditModal } from "@/features/Modals/NavigationEditModal/NavigationEditModal";
import { useParams } from "next/navigation";
import { DeletePageBtn, NavigationCreateModal } from "@/features";

export const NavigationItem = (
    {
        item,
        onDragEnd
    }: {
        item: INavigation;
        onDragEnd: (e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>,
            draggedItem: INavigation,
            targetItem: INavigation
        ) => void
    }) => {
    const locale = useParams().locale as string;

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, navItem: INavigation) => {
        e.stopPropagation();
        e.dataTransfer.setData("text/plain", JSON.stringify(navItem));
    };


    const handleDrop = (e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>, targetNavItem: INavigation) => {
        e.stopPropagation();
        e.preventDefault();

        const draggedItem: INavigation = JSON.parse(e.dataTransfer.getData("text/plain"));
        onDragEnd(e, draggedItem, targetNavItem);
    };

    if (item.navigation_type === 'detail') return


    return (
        <li
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e: React.DragEvent<HTMLLIElement>) => handleDrop(e, item)}
            onDragOver={(e) => e.preventDefault()}
            className={"p-4 border border-gray-200 rounded-md flex flex-col gap-2"}
        >
            <section className="flex items-center">
                <h3 className="grow">
                    {item.title[locale]}
                </h3>
                <div className="flex gap-2 ">
                    <NavigationEditModal navigationItem={item} />
                    {
                        (item.navigation_type === 'group-link' || item.navigation_type === 'group') && <NavigationCreateModal parent_id={item.id} />
                    }
                    <DeletePageBtn navigationId={item.id} name={item.title[locale]} />
                </div>
            </section>
            <section>

                {item.children && item.children.length > 0 ? (
                    <ul className="flex flex-col gap-3">
                        {item.children.map((child) => (
                            <NavigationItem key={child.id} item={child} onDragEnd={onDragEnd} />
                        ))}
                    </ul>
                ) : (
                    (item.navigation_type === 'group-link' || item.navigation_type === 'group') && (
                        <div
                            onDrop={(e: DragEvent<HTMLDivElement>) => handleDrop(e, item)}
                            onDragOver={(e) => e.preventDefault()}
                            className="p-4 mt-2 border border-dashed border-gray-300 rounded-md"
                        >
                            Перетащите сюда элемент, чтобы добавить
                        </div>
                    )
                )}
            </section>
        </li>
    );
};