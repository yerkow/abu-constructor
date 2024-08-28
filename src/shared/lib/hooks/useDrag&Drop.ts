import { UseMutateFunction, useMutation, QueryKey } from "@tanstack/react-query";
import { queryClient } from "../client";
import { backendUrl } from "../constants";


export interface ItemUpdateOrderOption {
    id: number;
    order: number;
}


interface DragAndDropProps {
    queryKey: QueryKey,
    key: string
}

export const useDragAndDrop = <Item extends { id: number; order: number }>(
    { queryKey, key }: DragAndDropProps
) => {

    const handleDragEnd = (
        e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>,
        draggedItem: Item,
        targetItem: Item,
        handler: UseMutateFunction<() => Promise<any>, Error, ItemUpdateOrderOption[], unknown>
    ) => {
        e.stopPropagation();

        if (draggedItem.id !== targetItem.id) {
            handler([
                { id: draggedItem.id, order: targetItem.order },
                { id: targetItem.id, order: draggedItem.order },
            ]);
        }
    };

    const handleDrop = (
        e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>,
        targetNavItem: Item,
        handler: UseMutateFunction<any, Error, ItemUpdateOrderOption[], unknown>
    ) => {
        e.stopPropagation();
        e.preventDefault();

        const draggedItem: Item = JSON.parse(e.dataTransfer.getData("text/plain"));
        handleDragEnd(e, draggedItem, targetNavItem, handler);
    };

    const handleDragStart = (
        e: React.DragEvent<HTMLLIElement>,
        navItem: Item
    ) => {
        e.stopPropagation();
        e.dataTransfer.setData("text/plain", JSON.stringify(navItem));
    };

    const fetchWidgetOrderUpdate = async (
        options: ItemUpdateOrderOption[]
    ) => {
        const response = await fetch(`${backendUrl}/${key}/v2/orders/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(options),
        });

        if (!response.ok) {
            throw new Error("Failed to update widget order");
        }

        return response.json();
    }

    const { mutate: handleItemUpdate } = useMutation<void, Error, ItemUpdateOrderOption[]>({
        mutationFn: fetchWidgetOrderUpdate,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey,
            });
        },
        onError: (error) => {
            console.error("Error updating widget order:", error);
        },
    })

    return {
        handleDragEnd,
        handleDrop,
        handleDragStart,
        handleItemUpdate
    }
}