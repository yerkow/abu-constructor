import { DragEvent } from "react";
import { INavigation } from "./model/Navigation.model";

export const NavigationItem = ({ item, onDragEnd }: { item: INavigation; onDragEnd: (e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>, draggedItem: INavigation, targetItem: INavigation) => void }) => {
    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, navItem: INavigation) => {
        e.stopPropagation();
        e.dataTransfer.setData("text/plain", JSON.stringify(navItem));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>, targetNavItem: INavigation) => {
        console.log(targetNavItem)
        e.stopPropagation();
        e.preventDefault();

        const draggedItem: INavigation = JSON.parse(e.dataTransfer.getData("text/plain"));
        onDragEnd(e, draggedItem, targetNavItem);
    };

    return (
        <li
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e: React.DragEvent<HTMLLIElement>) => handleDrop(e, item)}
            onDragOver={(e) => e.preventDefault()}
            className={"p-4 border border-gray-200 rounded-md"}
        >
            {item.title["kz"]}

            {item.children && item.children.length > 0 ? (
                <ul className="flex flex-col gap-3">
                    {item.children.map((child) => (
                        <NavigationItem key={child.id} item={child} onDragEnd={onDragEnd} />
                    ))}
                </ul>
            ) : (
                item.navigation_type === 'group' && (
                    <div
                        onDrop={(e: DragEvent<HTMLDivElement>) => handleDrop(e, item)}
                        onDragOver={(e) => e.preventDefault()}
                        className="p-4 mt-2 border border-dashed border-gray-300 rounded-md"
                    >
                        Drop here to add to group
                    </div>
                )
            )}
        </li>
    );
};