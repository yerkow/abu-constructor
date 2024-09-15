import { UseMutateFunction } from "@tanstack/react-query";

export type DragAndDropProps<Item> = (
  e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>,
  draggedItem: Item,
  targetItem: Item,
  handler: UseMutateFunction<() => Promise<any>, Error, any[], unknown>
) => void;

interface IDragAndDropReturnProps<Item> {
  handleDrop: (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>,
    targetNavItem: Item,
    handler: UseMutateFunction<() => Promise<any>, Error, any[], unknown>
  ) => void;
  handleDragStart: (e: React.DragEvent<HTMLLIElement>, navItem: Item) => void;
}

/**
 * @brief: Хук для реализации начальной функциональности drag & drop.
 *
 * @Подробное описание:
 * Хук реализует 2 события:
 * 1. Обработчик начала перетаскивания:
 * 	При начале перетаскивания в dataTransfer записывается JSON-строка с данными элемента.
 *
 * 2. Обработчик завершения перетаскивания:
 * 	При завершении перетаскивания из dataTransfer считывается JSON-строка с данными.
 * 	элемента и вызывается функция onDragEnd, которая обрабатывает перемещение элемента исходя из его исходного и конечного положения.
 */

export const useDragAndDrop = <Item>(
  onDragEnd: DragAndDropProps<Item>
): IDragAndDropReturnProps<Item> => {
  const handleDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    navItem: Item
  ) => {
    e.stopPropagation();
    e.dataTransfer.setData("text/plain", JSON.stringify(navItem));
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>,
    targetNavItem: Item,
    handler: UseMutateFunction<() => Promise<any>, Error, any[], unknown>
  ) => {
    e.stopPropagation();
    e.preventDefault();

    const draggedItem: Item = JSON.parse(e.dataTransfer.getData("text/plain"));
    onDragEnd(e, draggedItem, targetNavItem, handler);
  };

  return {
    handleDrop,
    handleDragStart,
  };
};
