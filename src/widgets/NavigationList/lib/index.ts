import { UseMutateFunction } from "@tanstack/react-query";

import { INavigation } from "@/shared/lib/types";

export const handleDragEnd = (
  e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>,
  draggedItem: INavigation,
  targetItem: INavigation,
  handler: UseMutateFunction<() => Promise<any>, Error, any[], unknown>
) => {
  e.stopPropagation();

  // Оба элемента на одном уровне и targetItem - content
  if (draggedItem.parent_id === targetItem.parent_id) {
    handler([
      { id: draggedItem.id, order: targetItem.order },
      { id: targetItem.id, order: draggedItem.order },
    ]);
    return;
  }
  // Дроп за пределы текущего контейнера
  if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)) {
    handler([{ id: draggedItem.id, order: 1, parent_id: null }]);
    return;
  }
  // Дроп в группу
  if (
    targetItem.navigation_type === "group" &&
    draggedItem.parent_id !== targetItem.id
  ) {
    const newOrder = (targetItem.children ? targetItem.children.length : 0) + 1;
    handler([
      { id: draggedItem.id, order: newOrder, parent_id: targetItem.id },
    ]);
    return;
  }

  // Любое другое перемещение (между элементами разных родителей)
  handler([
    {
      id: draggedItem.id,
      order: targetItem.order,
      parent_id: targetItem.parent_id,
    },
  ]);
};
