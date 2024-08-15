import { UseMutateFunction } from "@tanstack/react-query";
import { IWidget, IWidgetUpdateOrderOptions } from "../model";

export const handleDragEnd = (e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>, draggedItem: IWidget, targetItem: IWidget, handler: UseMutateFunction<() => Promise<any>, Error, IWidgetUpdateOrderOptions[], unknown>) => {
    e.stopPropagation();
    handler([
        { id: draggedItem.id, order: targetItem.order },
        { id: targetItem.id, order: draggedItem.order },
    ]);

};

export const handleDrop = (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>,
    targetNavItem: IWidget,
    handler: UseMutateFunction<() => Promise<any>, Error, IWidgetUpdateOrderOptions[], unknown>
) => {
    e.stopPropagation();
    e.preventDefault();

    const draggedItem: IWidget = JSON.parse(e.dataTransfer.getData("text/plain"));
    handleDragEnd(e, draggedItem, targetNavItem, handler);
};

export const handleDragStart = (e: React.DragEvent<HTMLLIElement>, navItem: IWidget) => {
    e.stopPropagation();
    e.dataTransfer.setData("text/plain", JSON.stringify(navItem));
};